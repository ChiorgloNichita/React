#  Лабораторная работа №6 — Глобальное состояние и Redux Toolkit

##  Цель работы

Изучить концепцию глобального состояния в React и реализовать корзину товаров с использованием Redux Toolkit. Научиться загружать товары с сервера, добавлять, изменять и удалять их, управлять состоянием корзины через `store`.

---

##  Установка и запуск

1. Клонируйте репозиторий:

```bash
git clone https://github.com/your-name/pizza-shop-react.git
cd my-pizza-app
```

2. Установите зависимости:

```bash
npm install
```

3. Запустите приложение:

```bash
npm run dev
```

4. Перейдите в браузер:

```
http://localhost:5173
```

---

##  Описание проекта

**Онлайн-Пиццерия** — это клиентская часть веб-приложения на React, где реализовано:

* отображение товаров с mockAPI;
* добавление, удаление, редактирование пицц;
* фильтрация, поиск, сортировка;
* корзина с увеличением/уменьшением количества;
* слайдер с акциями;
* глобальное состояние с Redux Toolkit;
* сохранение корзины в localStorage.

---

##  Основные функции и код

###  Хранилище `store.js`

```js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart/slice";
import productsReducer from "./products/slice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
  },
});
```

---

###  Корзина: `slice.js`

```js
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      const existing = state.items.find(i => i.id === item.id);
      if (existing) existing.quantity += 1;
      else state.items.push({ ...item, quantity: 1 });
      state.totalQuantity += 1;
      saveCart(state);
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.items.find(i => i.id === id);
      if (item) {
        state.totalQuantity += quantity - item.quantity;
        item.quantity = quantity;
        saveCart(state);
      }
    },
    removeFromCart(state, action) {
      const id = action.payload;
      const item = state.items.find(i => i.id === id);
      if (item) {
        state.totalQuantity -= item.quantity;
        state.items = state.items.filter(i => i.id !== id);
        saveCart(state);
      }
    }
  }
});
```

---

###  Селекторы: `actions.js`

```js
export const selectCart = (state) => state.cart || { items: [] };
export const selectCartItemsCount = (state) =>
  (state.cart?.items || []).reduce((total, item) => total + (item.quantity || 1), 0);
```

---

###  Компонент `CartPage.jsx`

```jsx
const cart = useSelector(selectCart);
const totalPrice = cart.items.reduce(
  (sum, item) => sum + item.price * item.quantity, 0
);
```

---

###  Асинхронная загрузка: `thunks.js`

```js
export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const res = await axios.get(API_URL);
  return res.data;
});
```

---

###  Пицца-карточка: `PizzaCard.jsx`

```jsx
const handleAddToCart = () => {
  dispatch(addToCart({ ...pizza, selectedSize }));
};
```

---

###  Форма добавления: `ProductForm.jsx`

```js
const handleSubmit = async (e) => {
  if (isEdit) {
    await axios.put(`${API_URL}/${id}`, form);
  } else {
    await axios.post(API_URL, form);
  }
  navigate("/");
};
```

---

###  Слайдер с акциями: `Slider.jsx`

```jsx
useEffect(() => {
  const timer = setInterval(nextSlide, 4000);
  return () => clearInterval(timer);
}, []);
```

---

###  Поиск по товарам: `Search.jsx`

```jsx
<input
  type="text"
  placeholder="Поиск по названию..."
  onChange={(e) => onSearch(e.target.value)}
/>
```

---

###  Фильтрация и сортировка: `PizzaList.jsx`

```js
const filteredPizzas = pizzas
  .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
  .sort((a, b) => a.price - b.price);
```

---

##  Использованные технологии

* React 18
* Redux Toolkit
* React Router
* Axios
* MockAPI
* CSS Modules
* JSDoc

---
# Контрольные вопросы

###  Что такое глобальное состояние и зачем оно нужно?

**Глобальное состояние** — это данные, которые хранятся в одном общем месте и доступны из разных компонентов приложения.
Примеры таких данных: содержимое корзины, авторизация пользователя, настройки темы.

**Зачем нужно:**

* Чтобы избежать дублирования состояния в разных компонентах;
* Чтобы компоненты могли обмениваться данными напрямую, без "проброса пропсов" на каждом уровне;
* Чтобы обновления данных были синхронизированы между всеми частями интерфейса.

---

###  Что такое Redux Toolkit и как он упрощает работу с глобальным состоянием?

**Redux Toolkit (RTK)** — это современная библиотека для управления состоянием, основанная на Redux, но с минимальной настройкой и шаблонным кодом.

**Как упрощает работу:**

* Автоматически создаёт `actions` и `reducers` через `createSlice`;
* Упрощает работу с асинхронными запросами через `createAsyncThunk`;
* Позволяет писать чистый и читаемый код;

---

###  Что такое слайсы (slices) и как они помогают организовать код?

**Slice (слайс)** — это часть глобального состояния приложения + функции, которые с этим состоянием работают. Создаётся с помощью `createSlice`.

**Зачем нужны:**

* Разделяют состояние по логике (например, `cartSlice`, `productsSlice`);
* Содержат и данные (`state`), и действия (`reducers`) вместе;
* Повышают модульность и читаемость кода;

