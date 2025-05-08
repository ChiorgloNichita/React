import { useDispatch, useSelector } from "react-redux";
import { selectCart } from "../store/cart/actions";
import { updateQuantity, removeFromCart } from "../store/cart/slice";
import "../styles/CartPage.css"; // Не забудь создать этот файл

/**
 * Страница отображения корзины.
 * Позволяет изменять количество и удалять товары.
 *
 * @component
 * @returns {JSX.Element}
 */
function CartPage() {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);

  const handleUpdate = (id, quantity) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const handleRemove = (id) => dispatch(removeFromCart(id));

  const totalPrice = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container">
      <h2 className="cart-title">Корзина</h2>
      {cart.items.length === 0 ? (
        <p className="empty-cart">Корзина пуста.</p>
      ) : (
        <div className="cart-list">
          {cart.items.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-image" />

              <div className="cart-info">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p>
                  {item.price} лей × {item.quantity} ={" "}
                  <strong>{item.price * item.quantity} лей</strong>
                </p>
                <div className="cart-controls">
                  <button onClick={() => handleUpdate(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleUpdate(item.id, item.quantity + 1)}>+</button>
                  <button onClick={() => handleRemove(item.id)}>Удалить</button>
                </div>
              </div>
            </div>
          ))}
          <h3 className="total">Итого: <strong>{totalPrice} лей</strong></h3>
        </div>
      )}
    </div>
  );
}

export default CartPage;
