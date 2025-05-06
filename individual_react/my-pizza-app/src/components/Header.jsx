import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "../styles/Header.css";

/**
 * Компонент шапки сайта с навигацией и счётчиком корзины.
 *
 * @returns {JSX.Element}
 */
function Header() {
  const cartCount = useSelector((state) => state.cart.items.length);

  return (
    <header className="header">
      <div className="header-container">
        <h1 className="title">
          <span role="img" aria-label="pizza" style={{ fontSize: "1.8rem" }}>🍕</span>
          Онлайн-Пиццерия
        </h1>
        <nav className="nav">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          >
            Главная
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          >
            О нас
          </NavLink>
          <NavLink
            to="/reviews"
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          >
            Отзывы
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          >
            Корзина ({cartCount})
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
