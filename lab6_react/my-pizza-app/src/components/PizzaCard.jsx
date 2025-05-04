// ✅ PizzaCard.jsx (обновлённый)
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cart/slice";
import "../styles/PizzaCard.css";

const API_URL = "https://67fbaba81f8b41c8168487dc.mockapi.io/products";

function PizzaCard({ pizza }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const defaultSizes = pizza.sizes || [25, 30, 35];
  const [selectedSize, setSelectedSize] = useState(defaultSizes[0]);

  const handleAddToCart = () => {
    dispatch(addToCart(pizza));
  };

  const handleDelete = async () => {
    if (window.confirm(`Удалить "${pizza.name}"?`)) {
      try {
        await axios.delete(`${API_URL}/${pizza.id}`);
        window.location.reload();
      } catch (error) {
        console.error("Ошибка при удалении:", error);
      }
    }
  };

  const handleEdit = () => navigate(`/edit/${pizza.id}`);

  return (
    <div className="pizza-card">
      <Link to={`/product/${pizza.id}`}>
        <img className="pizza-img" src={pizza.image} alt={pizza.name} />
        <h2 className="pizza-title">{pizza.name}</h2>
      </Link>
      <p>{pizza.description}</p>
      <p>{pizza.price} лей</p>
      <div className="size-buttons">
        {defaultSizes.map((size) => (
          <button
            key={size}
            onClick={() => setSelectedSize(size)}
            className={`size-btn ${selectedSize === size ? "selected" : ""}`}
          >
            {size} см
          </button>
        ))}
      </div>
      <button onClick={handleAddToCart}>Добавить в корзину</button>
      <div>
        <button onClick={handleEdit}>✏️ Редактировать</button>
        <button onClick={handleDelete}>🗑️ Удалить</button>
      </div>
    </div>
  );
}

export default PizzaCard;