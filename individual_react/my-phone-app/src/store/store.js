import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cartSlice";

/**
 * Redux-хранилище приложения.
 * Содержит один редьюсер: cart (корзина).
 */
export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
