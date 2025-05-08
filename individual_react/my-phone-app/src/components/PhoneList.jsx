import React, { useEffect, useState } from "react";
import axios from "axios";
import PhoneCard from "./PhoneCard";
import Search from "./Search";
import debounce from "lodash.debounce";
import { Link } from "react-router-dom";
import "../styles/PhoneList.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";
import Slider from "./Slider"; // Слайдер акций

const API_URL = "https://67fbaba81f8b41c8168487dc.mockapi.io/products";

/**
 * Компонент списка телефонов.
 * Позволяет отображать, фильтровать, сортировать и добавлять телефоны в корзину.
 *
 * @component
 * @returns {JSX.Element}
 */
function PhoneList() {
  const [phones, setPhones] = useState([]); // Все телефоны
  const [filteredPhones, setFilteredPhones] = useState([]); // Отфильтрованные телефоны
  const [loading, setLoading] = useState(true); // Состояние загрузки
  const [sortOption, setSortOption] = useState("none"); // Выбранная сортировка
  const [category, setCategory] = useState("all"); // Выбранная категория

  const dispatch = useDispatch();

  /**
   * Загружает список телефонов при монтировании компонента.
   */
  useEffect(() => {
    fetchPhones();
  }, []);

  /**
   * Получает список телефонов с сервера.
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
   * Выполняет поиск по имени или описанию телефона.
   *
   * @param {string} query - строка поиска
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
   * Обрабатывает сортировку телефонов.
   *
   * @param {React.ChangeEvent<HTMLSelectElement>} e - событие изменения select
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
   * @param {React.ChangeEvent<HTMLSelectElement>} e - выбранная категория
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
   * Добавляет товар в корзину.
   *
   * @param {Object} phone - объект телефона
   */
  const handleAddToCart = (phone) => {
    dispatch(addToCart(phone));
  };

  return (
    <div className="phone-list-wrapper">
      <Slider />

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
