import React, { useEffect, useState } from "react";
import axios from "axios";
import PizzaCard from "./PizzaCard";
import Search from "./Search";
import debounce from "lodash.debounce";
import { Link } from "react-router-dom";
import "../styles/PizzaList.css";

const API_URL = "https://67fbaba81f8b41c8168487dc.mockapi.io/products";

/**
 * Компонент списка пицц с загрузкой с сервера.
 * Отображает пиццы и реализует поиск по имени и описанию.
 *
 * @component
 * @param {Object} props
 * @param {Function} props.addToCart - Функция добавления пиццы в корзину
 * @returns {JSX.Element}
 */
function PizzaList({ addToCart }) {
  const [pizzas, setPizzas] = useState([]);
  const [filteredPizzas, setFilteredPizzas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPizzas();
  }, []);

  const fetchPizzas = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setPizzas(response.data);
      setFilteredPizzas(response.data);
    } catch (error) {
      console.error("Ошибка при загрузке пицц:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = debounce((query) => {
    const lower = query.toLowerCase();
    const filtered = pizzas.filter((pizza) =>
      pizza.name.toLowerCase().includes(lower) ||
      pizza.description.toLowerCase().includes(lower)
    );
    setFilteredPizzas(filtered);
  }, 300);

  return (
    <div>
      <h2>Наши пиццы</h2>
      <Link to="/add">
        <button style={{ marginBottom: "15px" }}>Добавить пиццу</button>
      </Link>
      <Search onSearch={handleSearch} />
      {loading ? (
        <p>Загрузка...</p>
      ) : (
        <div className="pizza-list">
          {filteredPizzas.map((pizza) => (
            <PizzaCard key={pizza.id} pizza={pizza} addToCart={addToCart} />
          ))}
        </div>
      )}
    </div>
  );
}

export default PizzaList;
