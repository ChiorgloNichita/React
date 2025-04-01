import { useState } from "react";

/**
 * Компонент для отображения информации о пицце.
 *
 * @param {Object} props - Свойства компонента.
 * @param {Object} props.pizza - Данные о пицце.
 * @param {string} props.pizza.name - Название пиццы.
 * @param {string} props.pizza.description - Описание пиццы.
 * @param {number} props.pizza.price - Цена пиццы.
 * @param {Array} props.pizza.sizes - Размеры пиццы.
 * @param {string} props.pizza.image - Изображение пиццы.
 *
 * @returns {JSX.Element} Разметка компонента PizzaCard.
 * @example
 * const pizza = { name: "Маргарита", description: "Соус, сыр, помидоры", price: 200, sizes: [30, 40, 50], image: "url" };
 * return <PizzaCard pizza={pizza} />;
 */
function PizzaCard({ pizza }) {
  const [selectedSize, setSelectedSize] = useState(pizza.sizes[0]);

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  return (
    <div className="pizza-card">
      <img className="pizza-img" src={pizza.image} alt={pizza.name} />
      <h2 className="pizza-title">{pizza.name}</h2>
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
      <button className="add-to-cart-btn">Добавить в корзину</button>
    </div>
  );
}

export default PizzaCard;
