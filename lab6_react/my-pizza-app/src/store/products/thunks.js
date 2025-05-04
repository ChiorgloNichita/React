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
