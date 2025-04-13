import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import PizzaList from "./components/PizzaList";
import AboutPage from "./pages/AboutPage";
import CartPage from "./pages/CartPage";
import ProductPage from "./pages/ProductPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProductForm from "./components/ProductForm";
import { useState } from "react";

/**
 * Основной компонент приложения с маршрутизацией.
 * Управляет добавлением и удалением товаров из корзины.
 *
 * @component
 * @returns {JSX.Element}
 */
function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (pizza) => {
    setCart((prevCart) => [...prevCart, pizza]);
  };

  const removeFromCart = (pizzaId) => {
    setCart((prevCart) => prevCart.filter((pizza) => pizza.id !== pizzaId));
  };

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<PizzaList addToCart={addToCart} />} />
        <Route path="cart" element={<CartPage cart={cart} removeFromCart={removeFromCart} />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="product/:id" element={<ProductPage addToCart={addToCart} />} />
        <Route path="add" element={<ProductForm />} />
        <Route path="edit/:id" element={<ProductForm />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
