"use strict";
const express = require("express");
const http = require("http");
const io = require("socket.io");
const cors = require("cors");

const FETCH_INTERVAL = 5000;
const PORT = process.env.PORT || 4000;

const tickers = [
  "AAPL", // Apple
  "GOOGL", // Alphabet
  "MSFT", // Microsoft
  "AMZN", // Amazon
  "FB", // Facebook
  "TSLA", // Tesla
];

const connectedClients = {};

function randomValue(min = 0, max = 1, precision = 0) {
  const random = Math.random() * (max - min) + min;
  return random.toFixed(precision);
}

function utcDate() {
  const now = new Date();
  return new Date(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    now.getUTCHours(),
    now.getUTCMinutes(),
    now.getUTCSeconds()
  );
}

function getQuotes(socket, subscribedTickers) {
  const quotes = subscribedTickers.map((ticker) => ({
    ticker,
    exchange: "NASDAQ",
    price: randomValue(100, 300, 2),
    change: randomValue(0, 200, 2),
    change_percent: randomValue(0, 2, 2),
    dividend: randomValue(0, 1, 2),
    yield: randomValue(0, 2, 2),
    last_trade_time: utcDate(),
  }));

  socket.emit("ticker", quotes);
}

function trackTickers(socket) {
  const clientId = socket.id;
  const client = connectedClients[clientId];

  if (!client) {
    return;
  }

  // run the first time immediately
  getQuotes(socket, client.tickers);

  // every N seconds
  const timer = setInterval(function () {
    getQuotes(socket, client.tickers);
  }, FETCH_INTERVAL);

  socket.on("disconnect", function () {
    clearInterval(timer);
  });
}

const app = express();
app.use(cors());
const server = http.createServer(app);

const socketServer = io(server, {
  cors: {
    origin: "*",
  },
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

socketServer.on("connection", (socket) => {
  socket.on("start", () => {
    connectedClients[socket.id] = {
      socket: socket,
      tickers: tickers.slice(), // Копирование массива тикеров
    };
    trackTickers(socket);
  });

  socket.on("delete", (ticker) => {
    console.log(`Received delete request for ticker: ${ticker}`);
    if (connectedClients[socket.id]) {
      const index = connectedClients[socket.id].tickers.indexOf(ticker);
      if (index !== -1) {
        connectedClients[socket.id].tickers.splice(index, 1);
        // Отправляем сообщение всем клиентам, чтобы они прекратили обновление тикера
        socketServer.emit("tickerDeleted", ticker);
        console.log(`Ticker ${ticker} deleted`);
      }
    }
  });

  socket.on("disconnect", () => {
    delete connectedClients[socket.id];
  });
});

server.listen(PORT, () => {
  console.log(`Streaming service is running on http://localhost:${PORT}`);
});
