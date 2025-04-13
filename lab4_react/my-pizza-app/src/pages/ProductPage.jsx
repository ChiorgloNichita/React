// src/pages/ProductPage.jsx
import { useParams } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";
import pizzaData from "../data/pizza.json";

/**
 * Страница конкретной пиццы по id
 */
function ProductPage() {
  const { id } = useParams();
  const productId = parseInt(id);

  if (isNaN(productId)) {
    return <NotFoundPage />;
  }

  const pizza = pizzaData.find((p) => p.id === productId);

  if (!pizza) {
    return <NotFoundPage />;
  }

  return (
    <div>
      <h2>{pizza.name}</h2>
      <img src={pizza.image} alt={pizza.name} style={{ width: "300px" }} />
      <p>{pizza.description}</p>
      <p>Цена: {pizza.price}₽</p>
    </div>
  );
}

export default ProductPage;
