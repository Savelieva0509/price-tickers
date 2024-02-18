import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import tickersReducer from "./tickersSlice";
import socketMiddleware from "./socketMiddleware";

// Включаем redux-thunk в middleware только для тестов
const middleware =
  process.env.NODE_ENV === "test"
    ? [...getDefaultMiddleware(), thunk, socketMiddleware()]
    : [...getDefaultMiddleware(), socketMiddleware()];

export const store = configureStore({
  reducer: {
    tickers: tickersReducer,
  },
  middleware,
});
