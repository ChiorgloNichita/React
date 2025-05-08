import { createSlice } from "@reduxjs/toolkit";

// Безопасное чтение данных из localStorage
const saved = JSON.parse(localStorage.getItem("cart"));
const initialState = {
  items: Array.isArray(saved) ? saved : [], // гарантировано массив
};

/**
 * Срез состояния корзины.
 * Хранит список товаров и синхронизирует с localStorage.
 */
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    /**
     * Добавляет товар в корзину, если он ещё не добавлен.
     */
    addToCart(state, action) {
      const exists = state.items.find(item => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },

    /**
     * Удаляет товар по ID.
     */
    removeFromCart(state, action) {
      state.items = state.items.filter(item => item.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    /**
     * Полная очистка корзины.
     */
    clearCart(state) {
      state.items = [];
      localStorage.removeItem("cart");
    }
  }
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
