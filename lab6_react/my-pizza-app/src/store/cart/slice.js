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