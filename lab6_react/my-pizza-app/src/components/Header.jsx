import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartItemsCount } from "../store/cart/actions";
import "../styles/Header.css";

/**
 * Компонент заголовка сайта.
 * Показывает название сайта и навигационные ссылки.
 * Также отображает количество товаров в корзине.
 *
 * @component
 * @returns {JSX.Element}
 */
function Header() {
  const count = useSelector(selectCartItemsCount);

  return (
    <header className="header">
      <h1 className="title">🍕 Онлайн-Пиццерия</h1>
      <nav className="nav">
        <Link to="/" className="link">Главная</Link>
        <Link to="/about" className="link">О нас</Link>
        <Link to="/cart" className="link">Корзина ({count})</Link>
      </nav>
    </header>
  );
}

export default Header;
