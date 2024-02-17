import socket from ".././helpers/socket";
import { updateStatus, updateError, updateTickers } from "./tickersSlice";

const fetchTickers = () => (dispatch) => {
  dispatch(updateStatus("loading"));

  if (!socket.connected) {
    dispatch(updateError("Disconnected from the server."));
    dispatch(updateStatus("failed"));
    
    socket.connect();

    socket.on("ticker", (data) => {
      if (data) {
        dispatch(updateTickers(data));
        dispatch(updateStatus("succeeded"));
      } else {
        const error = new Error("fail");
        dispatch(updateError(error.message)); // Используем message свойство ошибки
        dispatch(updateStatus("failed"));
      }
    });

    // Обработка события "disconnect"
    socket.on("disconnect", () => {
      console.log("Disconnected from the server.");
      const error = new Error("Disconnected from the server.");
      dispatch(updateError(error.message)); // Используем message свойство ошибки
      dispatch(updateStatus("failed"));
    });

    // В примере сокет посылает событие "start" при подключении
    // Это может быть изменено в зависимости от вашей серверной логики
    socket.on("connect", () => {
      console.log("Connection to the server is established.");
    });

    // Попробовать повторное подключение с сообщением "reconnecting to the server"
    socket.on("reconnect", () => {
      console.log("Reconnecting to the server.");
    });
  }
};

export default fetchTickers;
