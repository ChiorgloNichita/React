import "../styles/Footer.css";

/**
 * Компонент футера с копирайтом и ссылкой на репозиторий.
 *
 * @component
 * @returns {JSX.Element}
 */
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
