/**
 * Селектор для получения состояния корзины.
 * @param {Object} state
 * @returns {Object} Корзина с товарами
 */
export const selectCart = (state) => state.cart || { items: [] };

/**
 * Селектор для подсчета общего количества товаров.
 * @param {Object} state
 * @returns {number} Общее количество товаров в корзине
 */
export const selectCartItemsCount = (state) =>
  (state.cart?.items || []).reduce((total, item) => total + (item.quantity || 1), 0);
