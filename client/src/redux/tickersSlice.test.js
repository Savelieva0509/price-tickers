import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  tickerSlice,
  updateTickers,
  updateStatus,
  updateError,
} from "./tickersSlice.js";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("tickers reducer", () => {
  it("should handle updateTickers", () => {
    const initialState = {
      tickers: [],
      status: "idle",
      error: null,
    };
    const updatedTickers = [{ ticker: "AAPL", price: 150.0 }];
    const action = updateTickers(updatedTickers);

    expect(tickerSlice.reducer(initialState, action)).toEqual({
      ...initialState,
      tickers: updatedTickers,
    });
  });

  it("should handle updateStatus", () => {
    const initialState = {
      tickers: [],
      status: "idle",
      error: null,
    };
    const newStatus = "loading";
    const action = updateStatus(newStatus);

    expect(tickerSlice.reducer(initialState, action)).toEqual({
      ...initialState,
      status: newStatus,
    });
  });

  it("should handle updateError", () => {
    const initialState = {
      tickers: [],
      status: "idle",
      error: null,
    };
    const newError = "An error occurred";
    const action = updateError(newError);

    expect(tickerSlice.reducer(initialState, action)).toEqual({
      ...initialState,
      error: newError,
    });
  });
});
