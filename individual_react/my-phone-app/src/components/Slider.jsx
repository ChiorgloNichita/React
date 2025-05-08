import { useState, useEffect } from "react";
import "../styles/Slider.css"; // Подключаем стили

const slides = [
  "🔥 Скидка на iPhone 15 Pro!",
  "🎁 Бесплатная доставка от 4000 лей!",
  "📱 Новинка: Samsung Galaxy S24!"
];

/**
 * Слайдер акций для магазина телефонов.
 *
 * @component
 * @returns {JSX.Element}
 */
function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="slider">
      <button onClick={prevSlide} className="slider-btn">←</button>
      <span className="slider-text">{slides[currentSlide]}</span>
      <button onClick={nextSlide} className="slider-btn">→</button>
    </div>
  );
}

export default Slider;
