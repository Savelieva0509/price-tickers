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
        dispatch(updateError(error.message));
        dispatch(updateStatus("failed"));
      }
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from the server.");
      const error = new Error("Disconnected from the server.");
      dispatch(updateError(error.message));
      dispatch(updateStatus("failed"));
    });

    socket.on("connect", () => {
      console.log("Connection to the server is established.");
    });

    socket.on("reconnect", () => {
      console.log("Reconnecting to the server.");
    });
  }
};

export default fetchTickers;
