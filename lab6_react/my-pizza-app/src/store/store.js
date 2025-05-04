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
