import { createSlice } from "@reduxjs/toolkit";

export const tickerSlice = createSlice({
  name: "tickers",
  initialState: {
    tickers: [],
    status: "idle",
    error: null,
  },
  reducers: {
    updateTickers: (state, action) => {
      state.tickers = action.payload;
      },
    updateStatus: (state, action) => {
      state.status = action.payload;
    },
    updateError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { updateTickers, updateError, updateStatus } = tickerSlice.actions;

export default tickerSlice.reducer;
