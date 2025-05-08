// src/components/Footer.jsx
import "../styles/Footer.css";

/**
 * Компонент подвала сайта.
 * Отображает информацию о копирайте и ссылку на GitHub.
 *
 * @component
 * @returns {JSX.Element} Элемент футера
 */
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>© 2025 Онлайн-Пиццерия</p>
        <a
          href="https://github.com/ChiorgloNichita/React"
          target="_blank"
          rel="noopener noreferrer"
        >
          Репозиторий на GitHub
        </a>
      </div>
    </footer>
  );
}

export default Footer;
