/**
 * Компонент для отображения копирайта и ссылки на репозиторий на GitHub.
 *
 * @component
 * @example
 * return (
 *   <Footer />
 * )
 */
import "../styles/Footer.css"; 
function Footer() {
    return (
      <footer className="footer">
        <p className="text">© 2025 Онлайн-Пиццерия</p>
        <a
          href="https://github.com/ChiorgloNichita/React"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          Репозиторий на GitHub
        </a>
      </footer>
    );
  }
  
  export default Footer;
  