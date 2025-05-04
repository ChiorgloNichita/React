/**
 * Страница корзины.
 * Отображает список пицц, добавленных в корзину, с возможностью удаления.
 *
 * @component
 * @param {Object} props
 * @param {Array} props.cart - Список пицц в корзине
 * @param {Function} props.removeFromCart - Удаляет пиццу из корзины по ID
 * @returns {JSX.Element}
 */
function CartPage({ cart, removeFromCart }) {
  return (
    <div>
      <h2>Корзина</h2>
      {cart.length === 0 ? (
        <p>Корзина пуста.</p>
      ) : (
        <div>
          {cart.map((pizza) => (
            <div key={pizza.id}>
              <h3>{pizza.name}</h3>
              <p>{pizza.description}</p>
              <p>{pizza.price} лей</p>
              <button onClick={() => removeFromCart(pizza.id)}>Удалить</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CartPage;
