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