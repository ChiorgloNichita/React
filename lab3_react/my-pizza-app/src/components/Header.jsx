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
          <a href="#" className="link">Главная</a>
          <a href="#menu" className="link">Меню</a>
          <a href="#contacts" className="link">Контакты</a>
        </nav>
      </header>
    );
  }
  
  export default Header;
  