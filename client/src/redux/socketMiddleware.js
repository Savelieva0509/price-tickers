import io from "socket.io-client";
import { updateTickers } from "./tickersSlice";

const socketMiddleware = () => {
  const socket = io("http://localhost:4000");

  return (store) => (next) => (action) => {
    if (action.type === "socket/connect") {
      socket.on("ticker", (data) => {
        store.dispatch(updateTickers(data));
      });
    }

    return next(action);
  };
};

export default socketMiddleware;
