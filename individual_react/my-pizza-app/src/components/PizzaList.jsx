import React, { useEffect, useState } from "react";
import axios from "axios";
import PizzaCard from "./PizzaCard";
import Search from "./Search";
import debounce from "lodash.debounce";
import { Link } from "react-router-dom";
import "../styles/PizzaList.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";

const API_URL = "https://67fbaba81f8b41c8168487dc.mockapi.io/products";

function PizzaList() {
  const [pizzas, setPizzas] = useState([]);
  const [filteredPizzas, setFilteredPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("none");
  const [category, setCategory] = useState("all");

  const dispatch = useDispatch();

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
    const filtered = pizzas.filter(
      (pizza) =>
        pizza.name.toLowerCase().includes(lower) ||
        pizza.description.toLowerCase().includes(lower)
    );
    setFilteredPizzas(filtered);
  }, 300);

  const handleSort = (e) => {
    const option = e.target.value;
    setSortOption(option);
    let sorted = [...filteredPizzas];
    if (option === "price") {
      sorted.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (option === "name") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    }
    setFilteredPizzas(sorted);
  };

  const handleFilter = (e) => {
    const selected = e.target.value;
    setCategory(selected);
    if (selected === "all") {
      setFilteredPizzas(pizzas);
    } else {
      const filtered = pizzas.filter((p) => p.category === selected);
      setFilteredPizzas(filtered);
    }
  };

  const handleAddToCart = (pizza) => {
    dispatch(addToCart(pizza));
  };

  return (
    <div className="pizza-list-wrapper">
      <h2>Наши пиццы</h2>

      <Link to="/add">
        <button style={{ marginBottom: "15px" }}>Добавить пиццу</button>
      </Link>

      <Search onSearch={handleSearch} />

      <div style={{ display: "flex", gap: "15px", marginBottom: "15px" }}>
        <select value={sortOption} onChange={handleSort}>
          <option value="none">Без сортировки</option>
          <option value="price">Сначала дешёвые</option>
          <option value="name">По алфавиту</option>
        </select>

        <select value={category} onChange={handleFilter}>
          <option value="all">Все категории</option>
          <option value="Мясная">Мясная</option>
          <option value="Вегетарианская">Вегетарианская</option>
          <option value="Сырная">Сырная</option>
        </select>
      </div>

      {loading ? (
        <p>Загрузка...</p>
      ) : filteredPizzas.length === 0 ? (
        <p>Пиццы не найдены.</p>
      ) : (
        <div className="pizza-list">
          {filteredPizzas.map((pizza) => (
            <PizzaCard key={pizza.id} pizza={pizza} onAdd={() => handleAddToCart(pizza)} />
          ))}
        </div>
      )}
    </div>
  );
}

export default PizzaList;
