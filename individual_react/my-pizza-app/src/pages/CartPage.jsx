import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../features/cartSlice";

/**
 * Страница корзины.
 */
function CartPage() {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const total = cart.reduce((sum, p) => sum + parseFloat(p.price), 0).toFixed(2);

  return (
    <div className="container">
      <h2>Корзина</h2>
      {cart.length === 0 ? (
        <p>
          Корзина пуста. <Link to="/">Перейти в меню</Link>
        </p>
      ) : (
        <div>
          {cart.map((pizza) => (
            <div key={pizza.id} className="pizza-card">
              <h3>{pizza.name}</h3>
              <p>{pizza.description}</p>
              <p>{pizza.price} лей</p>
              <button onClick={() => dispatch(removeFromCart(pizza.id))}>Удалить</button>
            </div>
          ))}
          <h3>Итого: {total} лей</h3>
        </div>
      )}
    </div>
  );
}

export default CartPage;
