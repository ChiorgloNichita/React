import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import NotFoundPage from "./NotFoundPage";

const API_URL = "https://67fbaba81f8b41c8168487dc.mockapi.io/products";

/**
 * Страница отдельной пиццы.
 * Загружает информацию по ID и отображает карточку товара.
 *
 * @component
 * @param {Object} props
 * @param {Function} [props.addToCart] - Функция добавления пиццы в корзину
 * @returns {JSX.Element}
 */
function ProductPage({ addToCart }) {
  const { id } = useParams();
  const [pizza, setPizza] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}/${id}`)
      .then((res) => setPizza(res.data))
      .catch(() => setPizza(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Загрузка...</p>;
  if (!pizza) return <NotFoundPage />;

  return (
    <div>
      <h2>{pizza.name}</h2>
      <img src={pizza.image} alt={pizza.name} style={{ width: "300px" }} />
      <p>{pizza.description}</p>
      <p>Цена: {pizza.price} лей</p>
      <button onClick={() => addToCart?.(pizza)}>Добавить в корзину</button>
    </div>
  );
}

export default ProductPage;
