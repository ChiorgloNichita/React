import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: JSON.parse(localStorage.getItem("cart")) || [],
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
     * Добавляет товар в корзину, если его ещё нет.
     * @param {Object} state - Текущее состояние корзины
     * @param {Object} action - Действие с payload (товар)
     */
    addToCart(state, action) {
      const exists = state.items.find(item => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },

    /**
     * Удаляет товар из корзины по ID.
     * @param {Object} state - Текущее состояние корзины
     * @param {Object} action - Действие с payload (ID товара)
     */
    removeFromCart(state, action) {
      state.items = state.items.filter(item => item.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    /**
     * Полностью очищает корзину и localStorage.
     * @param {Object} state - Текущее состояние корзины
     */
    clearCart(state) {
      state.items = [];
      localStorage.removeItem("cart");
    }
  }
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
