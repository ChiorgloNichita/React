import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../features/cartSlice";

/**
 * Компонент страницы корзины.
 *
 * Отображает список добавленных в корзину товаров (телефонов),
 * позволяет удалить товар из корзины и отображает общую сумму.
 *
 * @returns {JSX.Element} Страница корзины
 */
function CartPage() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart?.items || []); // ✅ защита от undefined

  const total = cart.reduce(
    (sum, phone) => sum + parseFloat(phone.price || 0),
    0
  ).toFixed(2);

  return (
    <div className="container">
      <h2>Корзина</h2>
      {cart.length === 0 ? (
        <p>
          Корзина пуста. <Link to="/">Перейти в каталог</Link>
        </p>
      ) : (
        <div className="cart-list">
          {cart.map((phone) => (
            <div key={phone.id} className="phone-card" style={{ marginBottom: "20px" }}>
              <img
                src={phone.image}
                alt={phone.name}
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  marginBottom: "10px",
                  objectFit: "contain",
                  height: "200px",
                }}
              />
              <h3>{phone.name}</h3>
              <p>{phone.description}</p>
              <p>Цена: {phone.price} лей</p>
              <button
                className="btn-delete"
                onClick={() => dispatch(removeFromCart(phone.id))}
              >
                Удалить
              </button>
            </div>
          ))}
          <h3 style={{ marginTop: "30px" }}>Итого: {total} лей</h3>
        </div>
      )}
    </div>
  );
}

export default CartPage;
