import React, { useEffect, useState } from "react";
import axios from "axios";
import PhoneCard from "./PhoneCard";
import Search from "./Search";
import debounce from "lodash.debounce";
import { Link } from "react-router-dom";
import "../styles/PhoneList.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";

const API_URL = "https://67fbaba81f8b41c8168487dc.mockapi.io/products";

/**
 * Компонент списка телефонов.
 * Отображает телефоны с возможностью поиска, фильтрации, сортировки и добавления в корзину.
 *
 * @component
 * @returns {JSX.Element} Список карточек телефонов и управляющих элементов
 */
function PhoneList() {
  const [phones, setPhones] = useState([]);
  const [filteredPhones, setFilteredPhones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("none");
  const [category, setCategory] = useState("all");

  const dispatch = useDispatch();

  // Загружает список телефонов с сервера
  useEffect(() => {
    fetchPhones();
  }, []);

  /**
   * Получает данные с API и сохраняет в состояние.
   */
  const fetchPhones = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setPhones(response.data);
      setFilteredPhones(response.data);
    } catch (error) {
      console.error("Ошибка при загрузке телефонов:", error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Обрабатывает поиск по названию и описанию телефона.
   *
   * @param {string} query Строка поиска
   */
  const handleSearch = debounce((query) => {
    const lower = query.toLowerCase();
    const filtered = phones.filter(
      (phone) =>
        phone.name.toLowerCase().includes(lower) ||
        phone.description.toLowerCase().includes(lower)
    );
    setFilteredPhones(filtered);
  }, 300);

  /**
   * Обрабатывает сортировку по цене или имени.
   *
   * @param {React.ChangeEvent<HTMLSelectElement>} e
   */
  const handleSort = (e) => {
    const option = e.target.value;
    setSortOption(option);
    let sorted = [...filteredPhones];
    if (option === "price") {
      sorted.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (option === "name") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    }
    setFilteredPhones(sorted);
  };

  /**
   * Фильтрует телефоны по категории.
   *
   * @param {React.ChangeEvent<HTMLSelectElement>} e
   */
  const handleFilter = (e) => {
    const selected = e.target.value;
    setCategory(selected);
    if (selected === "all") {
      setFilteredPhones(phones);
    } else {
      const filtered = phones.filter((p) => p.category === selected);
      setFilteredPhones(filtered);
    }
  };

  /**
   * Добавляет телефон в корзину.
   *
   * @param {Object} phone Объект телефона
   */
  const handleAddToCart = (phone) => {
    dispatch(addToCart(phone));
  };

  return (
    <div className="phone-list-wrapper">
      <h2>Наши телефоны</h2>

      <Link to="/add">
        <button style={{ marginBottom: "15px" }}>Добавить телефон</button>
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
          <option value="Флагман">Флагман</option>
          <option value="Бюджетный">Бюджетный</option>
          <option value="Складной">Складной</option>
        </select>
      </div>

      {loading ? (
        <p>Загрузка...</p>
      ) : filteredPhones.length === 0 ? (
        <p>Телефоны не найдены.</p>
      ) : (
        <div className="phone-list">
          {filteredPhones.map((phone) => (
            <PhoneCard key={phone.id} phone={phone} onAdd={() => handleAddToCart(phone)} />
          ))}
        </div>
      )}
    </div>
  );
}

export default PhoneList;
