import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../store/products/thunks";
import PizzaCard from "./PizzaCard";
import Search from "./Search";
import Slider from "./Slider"; // не забудь файл Slider.css
import "../styles/PizzaList.css";

/**
 * Компонент списка пицц.
 */
function PizzaList() {
  const dispatch = useDispatch();
  const { items: pizzas, loading, error } = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredPizzas = pizzas.filter((pizza) =>
    pizza.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pizza-list-container">
      <Slider /> {/* ← вот здесь отображается слайдер */}
      <h2 className="pizza-list-title">Каталог пиццы</h2>

      <Search onSearch={setSearchTerm} />

      {loading && <p className="pizza-loading">Загрузка...</p>}
      {error && <p className="pizza-error">Ошибка: {error}</p>}

      {!loading && !error && (
        <div className="pizza-list">
          {filteredPizzas.length > 0 ? (
            filteredPizzas.map((pizza) => (
              <PizzaCard key={pizza.id} pizza={pizza} />
            ))
          ) : (
            <p className="pizza-empty">Пиццы не найдены</p>
          )}
        </div>
      )}
    </div>
  );
}

export default PizzaList;
