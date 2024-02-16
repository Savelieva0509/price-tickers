import { createSlice } from "@reduxjs/toolkit";

export const tickerSlice = createSlice({
  name: "tickers",
  initialState: {
    tickers: [],
  },
  reducers: {
    updateTickers: (state, action) => {
      state.tickers = action.payload;
    },
  },
});

export const { updateTickers } = tickerSlice.actions;

export const selectTickers = (state) => state.tickers.tickers;

export default tickerSlice.reducer;
