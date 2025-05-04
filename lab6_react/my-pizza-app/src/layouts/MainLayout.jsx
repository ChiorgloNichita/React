import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

/**
 * Общий Layout с хедером и футером.
 * Контент вставляется в Outlet между Header и Footer.
 *
 * @component
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
