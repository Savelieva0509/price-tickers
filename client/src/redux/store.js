import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import tickersReducer from './tickersSlice';
import socketMiddleware from "./socketMiddleware";

export const store = configureStore({
  reducer: {
    tickers: tickersReducer,
  },
  middleware: [...getDefaultMiddleware(), socketMiddleware()],
});
