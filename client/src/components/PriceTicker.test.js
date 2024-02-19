import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import PriceTicker from "./PriceTicker.js";
import fetchTickers from "../redux/operations";

const mockStore = configureMockStore([thunk]);

describe("PriceTicker", () => {
  it("should render PriceTicker component", () => {
    const mockTickers = [
      {
        ticker: "AAPL",
        price: "279.29",
        change: "64.52",
        change_percent: "0.84",
      },
    ];

    const store = mockStore({
      tickers: {
        tickers: mockTickers,
        status: "idle",
        error: null,
      },
    });

    render(
      <Provider store={store}>
        <PriceTicker />
      </Provider>
    );

    const checkElementExists = async (text) => {
      await waitFor(() => {
        const element = screen.getByText(text);
        expect(element).toBeInTheDocument();
      });
    };

    mockTickers.forEach((ticker) => {
      checkElementExists(ticker.ticker);
      checkElementExists(ticker.price);
      checkElementExists(ticker.change);
      checkElementExists(ticker.change_percent);
      expect(parseFloat(ticker.price)).not.toBeNaN();
      expect(parseFloat(ticker.change)).not.toBeNaN();
      expect(parseFloat(ticker.change_percent)).not.toBeNaN();
    });

    mockTickers.forEach((ticker) => {
      const deleteButton = screen.getByText("Delete");
      expect(deleteButton).toBeInTheDocument();
    });

    mockTickers.forEach((ticker) => {
      const deleteButton = screen.getByText("Delete");
      fireEvent.click(deleteButton);
    });
  });
});
