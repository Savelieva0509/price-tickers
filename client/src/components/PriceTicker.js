import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import fetchTickers from "../redux/operations";
import { selectTickers, selectStatus, selectError } from "../redux/selectors";

const PriceTicker = () => {
  const dispatch = useDispatch();
  const tickers = useSelector(selectTickers);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchTickers());
  }, [dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return (
      <div>
        <p>Error: {error}</p>
        {error === "Disconnected from the server." && (
          <p>The server is currently offline. Please try again later.</p>
        )}
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Price Tickers</h2>
      <table class="table table-bordered border-dark">
        <thead class="table-dark">
          <tr>
            <th>Ticker</th>
            <th>Price</th>
            <th>Change Percent</th>
            <th>Change</th>
          </tr>
        </thead>
        <tbody>
          {tickers.map((ticker) => (
            <tr key={ticker.ticker}>
              <td>{ticker.ticker}</td>
              <td>${ticker.price}</td>
              <td>
                {ticker.change_percent > 0.99 ? (
                  <span style={{ color: "green" }}>
                    <FaArrowUp /> {ticker.change_percent}%
                  </span>
                ) : (
                  <span style={{ color: "red" }}>
                    <FaArrowDown /> {ticker.change_percent}%
                  </span>
                )}
              </td>
              <td
                style={{
                  color: ticker.change_percent > 0.99 ? "green" : "red",
                }}
              >
                {ticker.change}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PriceTicker;
