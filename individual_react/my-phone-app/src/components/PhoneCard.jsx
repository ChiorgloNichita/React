import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "../styles/PhoneCard.css"; // можно переименовать в PhoneCard.css позже

const API_URL = "https://67fbaba81f8b41c8168487dc.mockapi.io/products";

/**
 * Карточка одного телефона.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.phone - объект телефона
 * @param {Function} props.onAdd - функция добавления в корзину
 * @returns {JSX.Element}
 */
function PhoneCard({ phone, onAdd }) {
  const navigate = useNavigate();
  const defaultSizes = phone.sizes || ["64 ГБ", "128 ГБ", "256 ГБ"];
  const [selectedSize, setSelectedSize] = useState(defaultSizes[0]);

  const handleSizeChange = (size) => setSelectedSize(size);

  const handleDelete = async () => {
    if (window.confirm(`Удалить "${phone.name}"?`)) {
      try {
        await axios.delete(`${API_URL}/${phone.id}`);
        window.location.reload();
      } catch (error) {
        console.error("Ошибка при удалении:", error);
      }
    }
  };

  const handleEdit = () => {
    if (phone.id) navigate(`/edit/${phone.id}`);
  };

  return (
    <div className="phone-card">
      <Link to={`/product/${phone.id}`}>
        <img className="phone-img" src={phone.image} alt={phone.name} />
        <h2 className="phone-title">{phone.name}</h2>
      </Link>
      <p>{phone.description}</p>
      <p>{phone.price} лей</p>

      <div className="size-buttons">
        {defaultSizes.map((size) => (
          <button
            key={size}
            onClick={() => handleSizeChange(size)}
            className={`size-btn ${selectedSize === size ? "selected" : ""}`}
          >
            {size}
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

export default PhoneCard;
