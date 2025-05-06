import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Reviews.css";

const API_URL = "https://67fbaba81f8b41c8168487dc.mockapi.io/reviews";

/**
 * Страница отзывов клиентов с отправкой на сервер.
 *
 * @returns {JSX.Element}
 */
function ReviewsPage() {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState("5");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(API_URL);
      setReviews(res.data.reverse()); // новые сверху
    } catch (err) {
      console.error("Ошибка при загрузке отзывов:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !text.trim()) {
      alert("Пожалуйста, заполните все поля");
      return;
    }

    const newReview = {
      name,
      text,
      rating
    };

    try {
      await axios.post(API_URL, newReview);
      fetchReviews();
      setName("");
      setText("");
      setRating("5");
    } catch (err) {
      console.error("Ошибка при отправке отзыва:", err);
    }
  };

  return (
    <div className="reviews-page">
      <h2>Отзывы наших клиентов</h2>

      <form onSubmit={handleSubmit} className="review-form">
        <input
          type="text"
          placeholder="Ваше имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          placeholder="Ваш отзыв..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <select value={rating} onChange={(e) => setRating(e.target.value)}>
          <option value="5">5 ⭐</option>
          <option value="4">4 ⭐</option>
          <option value="3">3 ⭐</option>
          <option value="2">2 ⭐</option>
          <option value="1">1 ⭐</option>
        </select>

        <button type="submit">Оставить отзыв</button>
      </form>

      {reviews.length > 0 && (
        <div className="review-list">
          {reviews.map((r) => (
            <div key={r.id} className="review-card">
              <strong>{r.name}</strong> ({r.rating} ⭐)
              <p>{r.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ReviewsPage;
