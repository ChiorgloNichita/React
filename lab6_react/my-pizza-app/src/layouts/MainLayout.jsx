// src/layouts/MainLayout.jsx
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

/**
 * Общий Layout с хедером и футером
 */
function MainLayout() {
  return (
    <>
      <Header />
      <main className="container">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;
