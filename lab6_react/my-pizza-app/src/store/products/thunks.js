import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://681d14d3f74de1d219aec0b5.mockapi.io/products";

/**
 * Загружает список телефонов с сервера.
 */
export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const res = await axios.get(API_URL);
  return res.data;
});

/**
 * Отправляет новый телефон на сервер.
 * @param {Object} product - Объект телефона
 */
export const createProduct = createAsyncThunk("products/create", async (product) => {
  const res = await axios.post(API_URL, product);
  return res.data;
});
