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
      <img src={pizza.image} alt={pizza.name} />
      <h2>{pizza.name}</h2>
      <p>{pizza.description}</p>
      <p>{pizza.price} лей</p>
      <div>
        {pizza.sizes.map((size) => (
          <button
            key={size}
            onClick={() => handleSizeChange(size)}
            style={{ backgroundColor: selectedSize === size ? "lightblue" : "" }}
          >
            {size} см
          </button>
        ))}
      </div>
      <button>Добавить в корзину</button>
    </div>
  );
}

export default PizzaCard;
