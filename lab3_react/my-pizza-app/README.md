# Онлайн-Пиццерия

Это веб-приложение для онлайн-заказа пиццы, с возможностью просмотра меню, фильтрации пицц по названию, а также отображения актуальных акций с помощью слайдера.

## Описание

Онлайн-Пиццерия — это простое и удобное веб-приложение, которое позволяет пользователю просматривать меню пицц, фильтровать их по названию, а также видеть актуальные акции с помощью слайдера. Пользователи могут выбрать размер пиццы и добавить её в корзину для заказа. Проект реализован с использованием React.

### Основные особенности:
- **Слайдер** — отображает актуальные акции и скидки.
- **Поиск** — возможность искать пиццы по названию.
- **Меню пицц** — просмотр всех доступных пицц с информацией о названии, описании, цене, размерах и изображении.
- **Навигация** — переход по разделам сайта через меню в хедере.

## Технологии

Проект использует следующие технологии:
- **React** — для создания компонентного интерфейса.
- **CSS** — для стилизации интерфейса.
- **JSON** — для хранения данных о пиццах.
- **Hooks (useState, useEffect)** — для управления состоянием и эффектах в компонентах.

## Структура проекта

# Footer.jsx — Компонент для отображения копирайта и ссылки на репозиторий на GitHub.
Footer.jsx 
```jsx
/**
 * Компонент для отображения копирайта и ссылки на репозиторий на GitHub.
 *
 * @component
 * @example
 * return (
 *   <Footer />
 * )
 */
import "../styles/Footer.css"; 
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
  ```
# Header.jsx — Компонент для отображения заголовка и навигации на сайте.
Header.jsx
 ```jsx
/**
 * Компонент для отображения заголовка и навигации на сайте.
 *
 * @component
 * @example
 * return (
 *   <Header />
 * )
 */
import "../styles/Header.css";
function Header() {
    return (
      <header className="header">
        <h1 className="title">🍕 Онлайн-Пиццерия</h1>
        <nav className="nav">
          <a href="#" className="link">Главная</a>
          <a href="#menu" className="link">Меню</a>
          <a href="#contacts" className="link">Контакты</a>
        </nav>
      </header>
    );
  }
  
export default Header; 
 ```
# PizzaCard.jsx — Компонент для отображения информации о пицце.
  PizzaCard.jsx
  ```jsx
import { useState } from "react";

/**
 * Компонент для отображения информации о пицце.
 *
 * @param {Object} props - Свойства компонента.
 * @param {Object} props.pizza - Данные о пицце.
 * @param {string} props.pizza.name - Название пиццы.
 * @param {string} props.pizza.description - Описание пиццы.
 * @param {number} props.pizza.price - Цена пиццы.
 * @param {Array} props.pizza.sizes - Размеры пиццы.
 * @param {string} props.pizza.image - Изображение пиццы.
 *
 * @returns {JSX.Element} Разметка компонента PizzaCard.
 * @example
 * const pizza = { name: "Маргарита", description: "Соус, сыр, помидоры", price: 200, sizes: [30, 40, 50], image: "url" };
 * return <PizzaCard pizza={pizza} />;
 */
function PizzaCard({ pizza }) {
  const [selectedSize, setSelectedSize] = useState(pizza.sizes[0]);

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  return (
    <div className="pizza-card">
      <img src={pizza.image} alt={pizza.name} />
      <h2>{pizza.name}</h2>
      <p>{pizza.description}</p>
      <p>{pizza.price} лей</p>
      <div>
        {pizza.sizes.map((size) => (
          <button
            key={size}
            onClick={() => handleSizeChange(size)}
            style={{ backgroundColor: selectedSize === size ? "lightblue" : "" }}
          >
            {size} см
          </button>
        ))}
      </div>
      <button>Добавить в корзину</button>
    </div>
  );
}

export default PizzaCard;
 ```
 # PizzaList.jsx — Компонент для отображения списка пицц с фильтром по имени.
  ```jsx
PizzaList.jsx
import { useState, useEffect } from "react";
import pizzaData from "../data/pizza.json";
import PizzaCard from "./PizzaCard";
import Search from "./Search";
import "../styles/PizzaList.css"; 

/**
 * Компонент для отображения списка пицц с фильтром по имени.
 *
 * @component
 * @example
 * return (
 *   <PizzaList />
 * )
 */
function PizzaList() {
  const [pizzas, setPizzas] = useState([]);
  const [filteredPizzas, setFilteredPizzas] = useState([]);

  useEffect(() => {
    setPizzas(pizzaData);
    setFilteredPizzas(pizzaData);
  }, []);

  const handleSearch = (query) => {
    const lower = query.toLowerCase();
    const filtered = pizzas.filter((pizza) =>
      pizza.name.toLowerCase().includes(lower)
    );
    setFilteredPizzas(filtered);
  };

  return (
    <div>
      <Search onSearch={handleSearch} />
      <div className="pizza-list">
        {filteredPizzas.map((pizza) => (
          <PizzaCard key={pizza.id} pizza={pizza} />
        ))}
      </div>
    </div>
  );
}

export default PizzaList;
 ```
# Search.jsx — Компонент для фильтрации списка пицц по названию.
Search.jsx
 ```jsx
 import '../styles/Search.css';
/**
 * Компонент поиска для фильтрации списка пицц по названию.
 *
 * @param {Object} props - Свойства компонента.
 * @param {Function} props.onSearch - Функция, которая вызывается при изменении значения поиска.
 *
 * @returns {JSX.Element} Разметка компонента Search.
 * @example
 * return <Search onSearch={handleSearch} />;
 */
function Search({ onSearch }) {
    const handleSearchChange = (e) => {
      onSearch(e.target.value);
    };
  
    return (
      <input
        type="text"
        placeholder="Поиск..."
        onChange={handleSearchChange}
      />
    );
  }
  
  export default Search;
   ```
# Slider.jsx — Компонент для отображения слайдера с актуальными акциями.
Slider.jsx
 ```jsx
import { useState, useEffect } from "react";

/**
 * Компонент Slider отображает слайды с актуальными акциями.
 * Каждые 3 секунды происходит автоматический переход к следующему слайду.
 * Также можно переключать слайды вручную с помощью кнопок "←" и "→".
 * 
 * @component
 * @example
 * return <Slider />
 */
const slides = [
  "🔥 Скидка на Пепперони!",
  "🎁 Бесплатная доставка от 400 лей!",
  "🧀 Новинка: Четыре сыра!"
];

/**
 * Компонент для отображения слайдера с акциями.
 * Использует хук состояния для управления текущим слайдом и хук эффекта для автопереключения слайдов.
 * 
 * @returns {JSX.Element} Разметка слайдера с кнопками для переключения слайдов.
 */
function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  /**
   * Функция для перехода к следующему слайду.
   * Переходит к следующему слайду, используя цикличность (возвращается к первому слайду после последнего).
   */
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  /**
   * Функция для перехода к предыдущему слайду.
   * Переходит к предыдущему слайду, используя цикличность (возвращается к последнему слайду после первого).
   */
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    // Автоматический переход к следующему слайду каждые 3 секунды
    const timer = setInterval(nextSlide, 3000);
    return () => clearInterval(timer); // Очистка интервала при размонтировании компонента
  }, []);

  return (
    <div className="slider">
      <button onClick={prevSlide}>←</button>
      <span>{slides[currentSlide]}</span>
      <button onClick={nextSlide}>→</button>
    </div>
  );
}

export default Slider;
 ```
 # Структура данных:
Данные о пиццах хранятся в файле src/data/pizza.json, который имеет следующий формат:
   ```jsx
[
    {
      "id": 1,
      "name": "Маргарита",
      "description": "Соус, сыр, помидоры",
      "price": 200,
      "image": "https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_960_720.jpg",
      "category": "Сырная",
      "sizes": [30, 40, 50]
    },
    {
      "id": 2,
      "name": "Пепперони",
      "description": "Соус, сыр, пепперони",
      "price": 250,
      "image": "https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_960_720.jpg",
      "category": "Мясная",
      "sizes": [30, 40, 50]
    }
  ]
   ```



src/Styles/Footer.css
 ```jsx
/**
 * Стили для футера (нижней части страницы).
 * Используется фоновый цвет, отступы, выравнивание текста и добавление тени.
 *
 * @class .footer
 */
 .footer {
  background-color: hsl(48, 100%, 50%); /* Основной цвет фона */
  padding: 20px; /* Отступы вокруг содержимого */
  text-align: center; /* Выравнивание текста по центру */
  margin-top: 50px; /* Отступ сверху */
  border-top: 2px solid #ccc; /* Верхняя граница для разделения */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Тень для футера */
}

/**
 * Стили для текста в футере.
 * Отступ снизу.
 *
 * @class .text
 */
.text {
  margin: 0 0 5px 0; /* Отступ снизу */
}

/**
 * Стили для ссылки в футере.
 * Добавляется стилизация для ссылок с плавным переходом.
 *
 * @class .footer-link
 */
.footer-link {
  text-decoration: none; /* Убирает подчеркивание с ссылки */
  color: #0077cc; /* Цвет ссылки */
  font-weight: bold; /* Жирный шрифт для ссылки */
  transition: color 0.3s; /* Плавное изменение цвета */
}

/**
 * Стили для состояния наведения на ссылку в футере.
 * Меняется цвет на более темный оттенок синего при наведении.
 *
 * @class .footer-link:hover
 */
.footer-link:hover {
  color: #005fa3; /* Темный синий при наведении */
}

   ```

src/styles/Header.css
 ```jsx
/**
 * Стили для шапки сайта (header).
 * Используются фоновый цвет, отступы, выравнивание элементов и тень.
 *
 * @class .header
 */
.header {
  background-color: hsl(48, 100%, 50%); /* Основной цвет фона */
  padding: 20px; /* Отступы вокруг содержимого */
  display: flex; /* Используется flexbox для выравнивания элементов */
  justify-content: space-between; /* Распределение элементов по краям */
  align-items: center; /* Вертикальное выравнивание по центру */
  border-bottom: 4px solid #e89b00; /* Нижняя граница для разделения */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Тень для шапки */
  width: 100%;  /* Ширина шапки теперь будет 100% */
  margin: 0;  /* Убираем любые внешние отступы */
}

/**
 * Стили для заголовка на шапке (title).
 * Устанавливаются отступы, размер шрифта, вес шрифта и цвет текста.
 *
 * @class .title
 */
.title {
  margin: 0; /* Убираются отступы вокруг заголовка */
  font-size: 1.8rem; /* Размер шрифта заголовка */
  font-weight: bold; /* Жирный шрифт */
  color: #333; /* Цвет текста */
}

/**
 * Стили для навигационного меню.
 * Элементы меню распределяются с использованием flexbox.
 *
 * @class .nav
 */
.nav {
  display: flex; /* Используется flexbox для размещения элементов */
  gap: 20px; /* Пробел между элементами */
}

/**
 * Стили для ссылок в навигации.
 * Убирается подчеркивание, задаются цвет и жирный шрифт.
 * Плавное изменение цвета при наведении.
 *
 * @class .link
 */
.link {
  text-decoration: none; /* Убирает подчеркивание с ссылок */
  color: #333; /* Цвет ссылок */
  font-weight: bold; /* Жирный шрифт для ссылок */
  transition: color 0.3s; /* Плавное изменение цвета при наведении */
}

/**
 * Стили для состояния наведения на ссылку.
 * Цвет ссылки меняется на оранжевый при наведении.
 *
 * @class .link:hover
 */
.link:hover {
  color: #ff6600; /* Оранжевый цвет при наведении */
}

src/styles/PizzaList.css
src/styles/PizzaCard.css
src/styles/Search.css

В них также я стилизовал для удобного интерфейса


App.jsx

```jsx
import Header from "./components/Header";
import Footer from "./components/Footer";
import Slider from "./components/Slider";
import PizzaList from "./components/PizzaList";

function App() {
  return (
    <>
      <Header />
      <Slider />
      <PizzaList />
      <Footer />
    </>
  );
}

export default App;
```

main.jsx
 ```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
 ```

 # Контрольные вопросы

### 1. Как использовать `useState` для управления состоянием?

`useState` используется для создания состояния в функциональных компонентах. Он принимает начальное значение и возвращает массив с текущим состоянием и функцией для его обновления. Вызывая эту функцию, можно обновить состояние.

### 2. Как работает `useEffect`?

`useEffect` позволяет выполнять побочные эффекты в компонентах. Это может быть запрос данных, настройка подписки, изменение DOM и другие операции, которые не связаны с рендером компонента. Он выполняется после рендера компонента. Можно указать зависимости, чтобы эффект выполнялся только при их изменении.

### 3. С помощью какого метода можно рендерить списки элементов в React?

Для рендеринга списка используется метод `.map()`. Этот метод перебирает элементы массива и возвращает новый массив с компонентами, которые можно отобразить.
