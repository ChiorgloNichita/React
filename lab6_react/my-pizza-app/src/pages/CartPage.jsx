// src/pages/CartPage.jsx
import { useDispatch, useSelector } from "react-redux";
import { selectCart } from "../store/cart/actions";
import { updateQuantity, removeFromCart } from "../store/cart/slice";

/**
 * Страница отображения корзины.
 * Позволяет изменять количество и удалять товары.
 *
 * @component
 */
function CartPage() {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);

  const handleUpdate = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleRemove = (id) => dispatch(removeFromCart(id));

  return (
    <div>
      <h2>Корзина</h2>
      {cart.items.length === 0 ? (
        <p>Корзина пуста.</p>
      ) : (
        <div>
          {cart.items.map((pizza) => (
            <div key={pizza.id}>
              <h3>{pizza.name}</h3>
              <p>{pizza.description}</p>
              <p>{pizza.price} лей</p>
              <div>
                <button onClick={() => handleUpdate(pizza.id, pizza.quantity - 1)}>-</button>
                <span style={{ margin: '0 10px' }}>{pizza.quantity}</span>
                <button onClick={() => handleUpdate(pizza.id, pizza.quantity + 1)}>+</button>
                <button onClick={() => handleRemove(pizza.id)}>Удалить</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CartPage;
