#  Лабораторная работа №6 — Глобальное состояние и Redux Toolkit

##  Цель работы

Познакомиться с концепцией глобального состояния в React и научиться использовать Redux Toolkit для управления общими данными между компонентами. Научиться добавлять, изменять и удалять товары в корзине с использованием глобального хранилища.

---

##  Выполненные задания

###  Задание 1. Установка и настройка Redux Toolkit

**Выполнено:** Установлены зависимости и создан Redux Store.

**Код:**

```bash
npm install @reduxjs/toolkit react-redux
```

```js
// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart/slice";
import productsReducer from "./products/slice";

/**
 * Конфигурация Redux Store.
 * Включает два редьюсера: корзина и список продуктов.
 *
 * @constant
 */
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
  },
});

```

**В main.jsx:**

```jsx
<Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</Provider>
```

---

###  Задание 2. Реализация корзины

**Выполнено:** Создан слайс, реализованы действия: `addToCart`, `removeFromCart`, `updateQuantity`.

**Код:**

```js
// src/store/cart/slice.js
import { createSlice } from "@reduxjs/toolkit";

/**
 * Загружает состояние корзины из localStorage.
 * @returns {{items: Array, totalQuantity: number}}
 */
const loadCart = () => {
  try {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : { items: [], totalQuantity: 0 };
  } catch {
    return { items: [], totalQuantity: 0 };
  }
};

/**
 * Сохраняет состояние корзины в localStorage.
 * @param {Object} state - Состояние корзины
 */
const saveCart = (state) => {
  localStorage.setItem("cart", JSON.stringify(state));
};

const initialState = loadCart();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    /**
     * Добавляет товар в корзину или увеличивает количество.
     * @param {Object} state
     * @param {Object} action
     */
    addToCart(state, action) {
      const item = action.payload;
      const existing = state.items.find((i) => i.id === item.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
      state.totalQuantity += 1;
      saveCart(state);
    },

    /**
     * Удаляет товар из корзины по ID.
     * @param {Object} state
     * @param {Object} action
     */
    removeFromCart(state, action) {
      const id = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) {
        state.totalQuantity -= item.quantity;
        state.items = state.items.filter((i) => i.id !== id);
        saveCart(state);
      }
    },

    /**
     * Обновляет количество товара в корзине.
     * @param {Object} state
     * @param {Object} action
     */
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item && quantity > 0) {
        state.totalQuantity += quantity - item.quantity;
        item.quantity = quantity;
        saveCart(state);
      }
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
```

**Использование в компоненте PizzaCard:**

```js
const dispatch = useDispatch();
dispatch(addToCart(pizza));
```

---

###  Задание 3. Количество товаров в Header

**Выполнено:**
Используется селектор `selectCartItemsCount` для отображения количества в шапке.

**Код:**

```js
// src/store/cart/actions.js
export const selectCartItemsCount = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);
```

```jsx
// Header.jsx
const count = useSelector(selectCartItemsCount);
<Link to="/cart">Корзина ({count})</Link>
```

---

###  Задание 4. Вынос действий в actions.js

**Выполнено:**
Создан отдельный файл `actions.js`, откуда экспортируются селекторы.

**Код:**

```js
// src/store/cart/actions.js
/**
 * Селектор для получения состояния корзины.
 * @param {Object} state
 * @returns {Object}
 */
export const selectCart = (state) => state.cart;

/**
 * Селектор для подсчета общего количества товаров.
 * @param {Object} state
 * @returns {number}
 */
export const selectCartItemsCount = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);
```

---

###  Задание 5. Сохранение в localStorage

**Выполнено:**
Состояние корзины сохраняется и загружается из localStorage.

**Код:**

```js
const loadCart = () => {
  const saved = localStorage.getItem('cart');
  return saved ? JSON.parse(saved) : { items: [], totalQuantity: 0 };
};

const saveCart = (state) => {
  localStorage.setItem('cart', JSON.stringify(state));
};

// Внутри редьюсеров вызывается saveCart(state);
```

---

###  Задание 6. Асинхронная загрузка товаров (createAsyncThunk)

**Выполнено:**
Данные загружаются и отправляются через `createAsyncThunk`.

**Код:**

```js
// src/store/products/thunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://67fbaba81f8b41c8168487dc.mockapi.io/products";

/**
 * Загружает список товаров с сервера.
 */
export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const res = await axios.get(API_URL);
  return res.data;
});

/**
 * Отправляет новый товар на сервер.
 * @param {Object} product - Объект пиццы
 */
export const createProduct = createAsyncThunk("products/create", async (product) => {
  const res = await axios.post(API_URL, product);
  return res.data;
});

```

**В компоненте:**

```js
useEffect(() => {
  dispatch(fetchProducts());
}, []);
```

#  Контрольные вопросы

### 1. Что такое глобальное состояние и зачем оно нужно?

Глобальное состояние — это единое хранилище данных, доступное для разных компонентов. Нужно для синхронизации, например: корзина, авторизация.

### 2. Что такое Redux Toolkit и как он упрощает работу с глобальным состоянием??

Redux Toolkit — современная обёртка над Redux, упрощает создание слайсов, действий, асинхронной логики и уменьшает шаблонный код.

###  Как он помогает с глобальным состоянием?

Глобальное состояние — это единый источник данных (например, корзина, пользователь, список товаров), доступный **из любого компонента**.

С RTK:

* создаёшь `slice.js` с `initialState` и функциями (редьюсерами);
* в `store.js` подключаешь слайсы;
* используешь `useSelector()` и `useDispatch()` для доступа и обновления.

### 3. Что такое слайсы и как они помогают организовать код??

Слайс — часть состояния + логика работы с ним (actions + reducers). Организуют код по фичам.

###  Как слайсы помогают организовать код?

1. **Модульность** — каждый слайс отвечает за отдельную часть логики (например, `cart`, `products`).
2. **Упрощение** — не нужно вручную писать `action creators` и `switch-case` редьюсеры.
3. **Читаемость и поддержка** — код становится проще в понимании и доработке.


##  Вывод

В рамках работы была реализована полноценная корзина с глобальным состоянием, локальным хранением и асинхронной загрузкой товаров. Все задания и дополнения выполнены.



