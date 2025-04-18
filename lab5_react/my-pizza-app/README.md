```markdown
#  Онлайн-Пиццерия – React-приложение

##  Лабораторная работа №5 — Формы, валидация и работа с API

---

## Цель работы
Освоить создание форм в React, научиться управлять вводом пользователя и выполнять валидацию. Получить навыки взаимодействия с REST API: отправка и получение данных с сервера. Перейти от использования локальных данных к работе с внешним API.

## Условия
Продолжите разработку интернет-магазина из предыдущих лабораторных работ. На этом этапе данные о товарах должны загружаться с удалённого сервера (mockapi.io), а новые товары должны добавляться через форму и сохраняться на сервере. Локальное хранение товаров больше не используется.

---

## Функционал

- ✅ Получение списка пицц с API
- 🔍 Поиск по названию (с debounce)
- ➕ Добавление новой пиццы через форму
- ✏️ Редактирование существующих товаров
- 🗑️ Удаление товара
- 🛒 Добавление в корзину и просмотр
- 🔁 Загрузка данных с индикатором `Загрузка...`
- ⚠️ Обработка ошибок при работе с API
- ✅ Документированный код в JSDoc-стиле

---

## Структура проекта

```
src/
├── components/
│   ├── Footer.jsx
│   ├── Header.jsx
│   ├── PizzaCard.jsx
│   ├── PizzaList.jsx
│   ├── ProductForm.jsx
│   ├── Search.jsx
│   └── Slider.jsx
├── layouts/
│   └── MainLayout.jsx
├── pages/
│   ├── AboutPage.jsx
│   ├── CartPage.jsx
│   ├── MenuPage.jsx
│   ├── NotFoundPage.jsx
│   └── ProductPage.jsx
├── styles/
│   ├── App.css
│   ├── Footer.css
│   ├── Header.css
│   ├── PizzaCard.css
│   ├── PizzaList.css
│   ├── Search.css
├── App.jsx
└── index.jsx
```

---

###  Задание 1. Подключение MockAPI
 🔗 API
 Я зарегистрировался на [mockapi.io](https://mockapi.io) и создал ресурс `products`. Заполнил его начальными товарами. Скопировал базовый URL и использовал его в проекте:
Используется база данных `https://67fbaba81f8b41c8168487dc.mockapi.io/products`

Пример структуры объекта:

```json
[
  {
    "id": "1",
    "name": "Маргарита",
    "description": "Соус, сыр, помидоры",
    "price": 200,
    "image": "https://joinposter.com/upload/pos_cdb_359454/menu/product_1723216716_32_original.jpeg",
    "sizes": [
      30,
      40,
      50
    ]
  },
  {
    "id": "2",
    "name": "Пепперони",
    "description": "Соус, сыр, пепперони",
    "price": 250,
    "image": "https://joinposter.com/upload/pos_cdb_359454/menu/product_1723213701_38_original.jpeg",
    "sizes": [
      30,
      40,
      50
    ]
  },
  {
    "id": "3",
    "name": "Четыре сыра",
    "description": "Соус, сыр Моцарелла, Пармезан, Горгонзола, Чеддер",
    "price": 280,
    "image": "https://joinposter.com/upload/pos_cdb_359454/menu/product_1723225556_23_original.jpeg",
    "sizes": [
      30,
      40,
      50
    ]
  },
  {
    "id": "4",
    "name": "Гавайская",
    "description": "Соус, сыр, ананасы, курица",
    "price": 270,
    "image": "https://joinposter.com/upload/pos_cdb_359454/menu/product_1723231282_24_original.jpeg",
    "sizes": [
      30,
      40,
      50
    ]
  }
]
```
###  Задание 2. Загрузка данных с сервера

В компоненте `MenuPage.jsx` реализована загрузка товаров с API. Используется `useEffect`, чтобы при монтировании компонента загрузить данные:
```jsx
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
```
### Карточки товаров (`PizzaCard.jsx`)

- Отображают изображение, описание, цену и размеры пиццы;
- Позволяют удалить товар (DELETE-запрос);
- Позволяют перейти к редактированию.
```jsx
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "../styles/PizzaCard.css";

const API_URL = "https://67fbaba81f8b41c8168487dc.mockapi.io/products";

/**
 * Компонент карточки пиццы.
 * Отображает информацию, кнопки добавления в корзину, редактирования и удаления.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.pizza - Объект пиццы
 * @param {Function} [props.addToCart] - Функция добавления в корзину
 * @returns {JSX.Element}
 */
function PizzaCard({ pizza, addToCart }) {
  const navigate = useNavigate();
  const defaultSizes = pizza.sizes || [25, 30, 35];
  const [selectedSize, setSelectedSize] = useState(defaultSizes[0]);

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const handleAddToCart = () => {
    addToCart?.(pizza);
  };

  const handleDelete = async () => {
    if (window.confirm(`Удалить "${pizza.name}"?`)) {
      try {
        await axios.delete(`${API_URL}/${pizza.id}`);
        window.location.reload();
      } catch (error) {
        console.error("Ошибка при удалении:", error);
      }
    }
  };

  const handleEdit = () => {
    if (!pizza.id) return;
    navigate(`/edit/${pizza.id}`);
  };

  return (
    <div className="pizza-card">
      <Link to={`/product/${pizza.id}`}>
        <img className="pizza-img" src={pizza.image} alt={pizza.name} />
        <h2 className="pizza-title">{pizza.name}</h2>
      </Link>
      <p>{pizza.description}</p>
      <p>{pizza.price} лей</p>
      <div className="size-buttons">
        {defaultSizes.map((size) => (
          <button
            key={size}
            onClick={() => handleSizeChange(size)}
            className={`size-btn ${selectedSize === size ? "selected" : ""}`}
          >
            {size} см
          </button>
        ))}
      </div>
      <button onClick={handleAddToCart}>Добавить в корзину</button>
      <div>
        <button onClick={handleEdit}>✏️ Редактировать</button>
        <button onClick={handleDelete}>🗑️ Удалить</button>
      </div>
    </div>
  );
}

export default PizzaCard;
```

###  Форма добавления и редактирования (`ProductForm.jsx`)

- Поддерживает два режима: создание и редактирование;
- Реализована валидация данных;
- Используются `axios.post` и `axios.put`.

```jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = "https://67fbaba81f8b41c8168487dc.mockapi.io/products";

/**
 * Компонент формы добавления или редактирования пиццы.
 * Реализует валидацию и отправку данных на mockapi.
 *
 * @component
 * @returns {JSX.Element}
 */
function ProductForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    sizes: [30, 40, 50],
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true); // показываем загрузку изначально

  useEffect(() => {
    if (isEditMode && id) {
      // Для редактирования — задержка и загрузка данных
      setTimeout(() => {
        axios
          .get(`${API_URL}/${id}`)
          .then((res) => setForm(res.data))
          .catch((err) => console.error("Ошибка при получении товара:", err))
          .finally(() => setLoading(false));
      }, 1000);
    } else {
      // Для добавления — просто задержка 1 секунда
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [id]);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Введите название";
    if (!form.description.trim()) newErrors.description = "Введите описание";
    if (!form.price || isNaN(form.price)) newErrors.price = "Укажите цену числом";
    if (!form.image.trim()) newErrors.image = "Введите URL изображения";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      if (isEditMode) {
        await axios.put(`${API_URL}/${id}`, form);
      } else {
        await axios.post(API_URL, form);
      }
      navigate("/");
    } catch (error) {
      console.error("Ошибка при сохранении:", error);
    }
  };

  return (
    <div>
      <h2>{isEditMode ? "Редактировать пиццу" : "Добавить новую пиццу"}</h2>

      {loading ? (
        <p style={{ color: "blue", fontWeight: "bold", fontSize: "20px" }}>Загрузка...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Название"
            value={form.name}
            onChange={handleChange}
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}

          <input
            name="description"
            placeholder="Описание"
            value={form.description}
            onChange={handleChange}
          />
          {errors.description && <p style={{ color: "red" }}>{errors.description}</p>}

          <input
            name="price"
            placeholder="Цена"
            value={form.price}
            onChange={handleChange}
          />
          {errors.price && <p style={{ color: "red" }}>{errors.price}</p>}

          <input
            name="image"
            placeholder="URL изображения"
            value={form.image}
            onChange={handleChange}
          />
          {errors.image && <p style={{ color: "red" }}>{errors.image}</p>}

          <button type="submit" style={{ marginTop: "15px" }}>
            {isEditMode ? "Сохранить изменения" : "Добавить пиццу"}
          </button>
        </form>
      )}
    </div>
  );
}

export default ProductForm;
```

##  Как запустить проект

```bash
npm install
npm run dev
```

### Контрольные вопросы

###  Что такое клиентская валидация и какова её роль в веб-приложениях?

**Клиентская валидация** — это проверка введённых пользователем данных на стороне клиента (в браузере), до отправки на сервер.

 **Роль:**
- Предотвращает отправку некорректных данных.
- Улучшает пользовательский опыт (UX), так как ошибки показываются сразу.

###  Что такое API и как он работает?

API (Application Programming Interface) — это интерфейс взаимодействия между приложениями, позволяющий одной программе “общаться” с другой.

 **Как работает:**
- Клиент (например, React-приложение) отправляет запрос к API.
- API обрабатывает запрос (например, получает данные из базы).
- API возвращает клиенту ответ в формате JSON или XML.


**Пример:**  
Приложение отправляет GET-запрос на `https://api.example.com/users` и получает список пользователей.


###  Что такое REST API? В чём разница между API и REST API?

**REST API** — это тип API, построенный по принципам архитектуры REST (Representational State Transfer).

 Основные принципы REST API:
- Использует стандартные HTTP-методы:  
  `GET` (получить), `POST` (добавить), `PUT` (обновить), `DELETE` (удалить)
- Структура URL понятна и описывает ресурсы:  
  например, `/products/5` — получить товар с id = 5

 **Разница:**
- `API` — это общее понятие интерфейса.
- `REST API` — это конкретная реализация API с использованием HTTP и определённых правил.


###  Как организовать загрузку данных с сервера при монтировании компонента?

В React для этого используется хук **`useEffect`**. Он срабатывает после первого рендера.

🔹 Шаги:

1. Используем `useEffect`:
```jsx
useEffect(() => {
  axios.get("https://api.example.com/products")
    .then((res) => setProducts(res.data));
}, []);
```

2. Пустой массив зависимостей `[]` означает: выполнить один раз при монтировании.

3. Полученные данные сохраняются в `useState` и выводятся в интерфейсе.

 Часто используется `axios` или `fetch` для выполнения HTTP-запросов.




