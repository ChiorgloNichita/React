import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import "../styles/MainLayout.css";

/**
 * Основной layout-компонент приложения.
 * Включает в себя шапку, футер и основной контент (через Outlet).
 *
 * @component
 * @param {Object} props
 * @param {number} props.cartCount - Количество товаров в корзине
 * @returns {JSX.Element}
 */
function MainLayout({ cartCount }) {
  return (
    <div className="page-wrapper"> {/* ← исправлено classNameч → className */}
      <Header cartCount={cartCount} />
      <main className="layout-container">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
