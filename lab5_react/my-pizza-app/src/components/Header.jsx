// src/components/Header.jsx
import { Link } from "react-router-dom"; // Импортируем Link для навигации

/**
 * Компонент для отображения заголовка и навигации на сайте.
 *
 * @component
 * @example
 * return (
 *   <Header />
 * )
 */
import "../styles/Header.css";
function Header() {
    return (
      <header className="header">
        <h1 className="title">🍕 Онлайн-Пиццерия</h1>
        <nav className="nav">
          <Link to="/" className="link">Главная</Link> {/* Используем Link для главной */}
          <Link to="/about" className="link">О нас</Link> {/* Используем Link для страницы о нас */}
          <Link to="/cart" className="link">Корзина</Link> {/* Используем Link для корзины */}
        </nav>
      </header>
    );
}

export default Header;
