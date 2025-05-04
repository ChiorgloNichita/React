import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts, createProduct } from "./thunks";

/**
 * Слайс состояния для продуктов.
 * Управляет загрузкой, добавлением и хранением списка пицц.
 *
 * @constant
 */
const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export default productsSlice.reducer;
