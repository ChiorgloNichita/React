import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import NotFoundPage from "./NotFoundPage";

const API_URL = "https://681d14d3f74de1d219aec0b5.mockapi.io/products";

/**
 * Страница отдельного телефона.
 * Загружает информацию по ID и отображает карточку товара.
 *
 * @component
 * @param {Object} props
 * @param {Function} [props.addToCart] - Функция добавления телефона в корзину
 * @returns {JSX.Element}
 */
function ProductPage({ addToCart }) {
  const { id } = useParams();
  const [phone, setPhone] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}/${id}`)
      .then((res) => setPhone(res.data))
      .catch(() => setPhone(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Загрузка...</p>;
  if (!phone) return <NotFoundPage />;

  return (
    <div>
      <h2>{phone.name}</h2>
      <img src={phone.image} alt={phone.name} style={{ width: "300px" }} />
      <p>{phone.description}</p>
      <p>Цена: {phone.price} лей</p>
      <button onClick={() => addToCart?.(phone)}>Добавить в корзину</button>
    </div>
  );
}

export default ProductPage;
