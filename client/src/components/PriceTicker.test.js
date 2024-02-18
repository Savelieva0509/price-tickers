import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import PriceTicker from "./PriceTicker.js"; 
import fetchTickers from "../redux/operations";

const mockStore = configureMockStore([thunk]);

describe("PriceTicker", () => {
  it("should render PriceTicker component", () => {
    const store = mockStore({
      tickers: {
        tickers: [],
        status: "idle",
        error: null,
      },
    });

    render(
      <Provider store={store}>
        <PriceTicker />
      </Provider>
    );
  });
});
