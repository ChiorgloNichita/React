import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "../styles/PizzaCard.css";

const API_URL = "https://67fbaba81f8b41c8168487dc.mockapi.io/products";

/**
 * Карточка одной пиццы.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.pizza - объект пиццы
 * @param {Function} props.onAdd - функция добавления в корзину
 * @returns {JSX.Element}
 */
function PizzaCard({ pizza, onAdd }) {
  const navigate = useNavigate();
  const defaultSizes = pizza.sizes || [25, 30, 35];
  const [selectedSize, setSelectedSize] = useState(defaultSizes[0]);

  const handleSizeChange = (size) => setSelectedSize(size);

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

  const handleEdit = () => {
    if (pizza.id) navigate(`/edit/${pizza.id}`);
  };

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
            onClick={() => handleSizeChange(size)}
            className={`size-btn ${selectedSize === size ? "selected" : ""}`}
          >
            {size} см
          </button>
        ))}
      </div>

      <div className="button-group">
        <button className="btn-primary" onClick={onAdd}>
          Добавить в корзину
        </button>
        <button className="btn-edit" onClick={handleEdit}>
          ✏️ Редактировать
        </button>
        <button className="btn-delete" onClick={handleDelete}>
          🗑 Удалить
        </button>
      </div>
    </div>
  );
}

export default PizzaCard;
