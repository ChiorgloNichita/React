import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout"; // путь у тебя правильный
import PizzaList from "./components/PizzaList";
import AboutPage from "./pages/AboutPage";
import CartPage from "./pages/CartPage";
import ProductPage from "./pages/ProductPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProductForm from "./components/ProductForm";
import ReviewsPage from "./pages/ReviewsPage";

/**
 * Основной компонент приложения с маршрутизацией.
 * Корзина реализована через Redux Toolkit.
 */
function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<PizzaList />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="product/:id" element={<ProductPage />} />
        <Route path="add" element={<ProductForm />} />
        <Route path="edit/:id" element={<ProductForm />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="reviews" element={<ReviewsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
