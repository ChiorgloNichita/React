import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import "../styles/MainLayout.css";

function MainLayout({ cartCount }) {
  return (
    <div className="page-wrapper">
      <Header cartCount={cartCount} />
      <main className="layout-container">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
