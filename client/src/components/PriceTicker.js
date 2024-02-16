import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTickers } from "../redux/tickersSlice";

const PriceTicker = () => {
  const dispatch = useDispatch();
  const tickers = useSelector(selectTickers);

  useEffect(() => {
    dispatch({ type: "socket/connect" });
  }, [dispatch]);

  return (
    <div>
      <h2>Price Tickers</h2>
      <ul>
        {tickers.map((ticker) => (
          <li key={ticker.ticker}>
            {ticker.ticker}: ${ticker.price} ({ticker.change_percent}%)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PriceTicker;
