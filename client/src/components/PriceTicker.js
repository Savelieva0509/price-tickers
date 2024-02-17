// src/components/PriceTicker.js

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTickers } from "../redux/tickersSlice";
import { selectTickers } from "../redux/selectors";
import io from "socket.io-client";

const PriceTicker = () => {
  const dispatch = useDispatch();
  const tickers = useSelector(selectTickers);

  useEffect(() => {
    const socket = io("http://localhost:4000"); // Убедитесь, что это соответствует вашему серверу и порту

    // Установка соединения при монтировании компонента
    socket.emit("start");

    // Слушание события "ticker" для обновления данных
    socket.on("ticker", (data) => {
      dispatch(updateTickers(data));
    });

    // Отписка от события при размонтировании компонента
    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  return (
    <div>
      <h2>Price Tickers</h2>
      <ul>
        {tickers.map((ticker) => (
          <li key={ticker.ticker}>
            {ticker.ticker}: ${ticker.price} ({ticker.change_percent}%)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PriceTicker;
