import { Link } from "react-router-dom";
import { useState } from "react";

/**
 * Компонент для отображения информации о пицце.
 */
function PizzaCard({ pizza, addToCart }) {
  const [selectedSize, setSelectedSize] = useState(pizza.sizes[0]);

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const handleAddToCart = () => {
    console.log("Добавлено в корзину:", pizza); // Логируем добавляемую пиццу
    addToCart(pizza); // Добавляем пиццу в корзину
  };

  return (
    <div className="pizza-card">
      <Link to={`/product/${pizza.id}`}>
        <img className="pizza-img" src={pizza.image} alt={pizza.name} />
        <h2 className="pizza-title">{pizza.name}</h2>
      </Link>
      <p className="pizza-description">{pizza.description}</p>
      <p className="pizza-price">{pizza.price} лей</p>
      <div className="size-buttons">
        {pizza.sizes.map((size) => (
          <button
            key={size}
            onClick={() => handleSizeChange(size)}
            className={`size-btn ${selectedSize === size ? "selected" : ""}`}
          >
            {size} см
          </button>
        ))}
      </div>
      <button className="add-to-cart-btn" onClick={handleAddToCart}>
        Добавить в корзину
      </button>
    </div>
  );
}

export default PizzaCard;
