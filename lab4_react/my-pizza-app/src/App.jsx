import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import PizzaList from "./components/PizzaList";
import AboutPage from "./pages/AboutPage";
import CartPage from "./pages/CartPage";
import ProductPage from "./pages/ProductPage";
import NotFoundPage from "./pages/NotFoundPage";
import { useState } from "react";

function App() {
  const [cart, setCart] = useState([]); // Состояние корзины

  // Функция для добавления товара в корзину
  const addToCart = (pizza) => {
    setCart((prevCart) => [...prevCart, pizza]); // Добавляем товар в корзину
  };

  // Функция для удаления товара из корзины
  const removeFromCart = (pizzaId) => {
    setCart((prevCart) => prevCart.filter((pizza) => pizza.id !== pizzaId)); // Удаляем товар по id
  };

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<PizzaList addToCart={addToCart} />} />
        <Route path="cart" element={<CartPage cart={cart} removeFromCart={removeFromCart} />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="product/:id" element={<ProductPage addToCart={addToCart} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
