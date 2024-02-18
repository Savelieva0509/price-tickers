import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import fetchTickers from "../redux/operations";
import { selectTickers, selectStatus, selectError } from "../redux/selectors";
import socket from "../helpers/socket";

const PriceTicker = () => {
  const dispatch = useDispatch();
  const tickers = useSelector(selectTickers);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);

  const [isDeleting, setIsDeleting] = useState({});

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
          <p className="alert alert-warning" role="alert">
            The server is currently offline. Please try again later.
          </p>
        )}
      </div>
    );
  }

  const handleDeleteTicker = (ticker) => {
    // Обновляем состояние для отображения процесса удаления для конкретного тикера
    setIsDeleting((prevIsDeleting) => ({
      ...prevIsDeleting,
      [ticker.ticker]: true,
    }));

    // Отправляем запрос на сервер для удаления тикера из списка обновляемых
    socket.deleteTicker(ticker.ticker);
  };

  const handleShowAll = () => {
    socket.showAll();
    setIsDeleting({});
  };

  return (
    <div className="container pt-4">
      <table className="table table-bordered border-dark">
        <thead className="table-dark">
          <tr>
            <th>
              <button
                onClick={handleShowAll}
                type="button"
                className="btn btn-light"
              >
                Show all
              </button>
            </th>
            <th>Ticker</th>
            <th>Price</th>
            <th>Change Percent</th>
            <th>Change</th>
          </tr>
        </thead>
        <tbody>
          {tickers.map((ticker) => (
            <tr key={ticker.ticker}>
              <td>
                <button
                  type="button"
                  className={`btn ${
                    isDeleting[ticker.ticker] ? "btn-secondary" : "btn-dark"
                  }`}
                  onClick={() => handleDeleteTicker(ticker)}
                  disabled={isDeleting[ticker.ticker]}
                >
                  {isDeleting[ticker.ticker] ? "Deleting..." : "Delete"}
                </button>
              </td>
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
