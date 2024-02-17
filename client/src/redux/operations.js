import { updateTickers, updateStatus, updateError } from "./tickersSlice";

export const fetchTickers = () => async (dispatch) => {
  try {
    // Устанавливаем статус загрузки
    dispatch(updateStatus("loading"));

    // Выполняем асинхронный запрос к серверу (вам нужно имплементировать fetch)
    const response = await fetch("http://localhost:4000/");
    const data = await response.json();

    // Обновляем состояние тикеров
    dispatch(updateTickers(data));

    // Устанавливаем статус "завершено"
    dispatch(updateStatus("succeeded"));
  } catch (error) {
    // Обрабатываем ошибки
    dispatch(updateError(error.message));
    dispatch(updateStatus("failed"));
  }
};
