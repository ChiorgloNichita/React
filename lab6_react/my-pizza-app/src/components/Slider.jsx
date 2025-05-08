import { useState, useEffect } from "react";
import "../styles/Slider.css";

/**
 * Слайды с акциями.
 */
const slides = [
  "🔥 Скидка на Пепперони!",
  "🎁 Бесплатная доставка от 400 лей!",
  "🧀 Новинка: Четыре сыра!"
];

/**
 * Компонент слайдера акций.
 *
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
    const timer = setInterval(nextSlide, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="slider">
      <button className="slider-btn" onClick={prevSlide}>←</button>
      <span className="slider-text">{slides[currentSlide]}</span>
      <button className="slider-btn" onClick={nextSlide}>→</button>
    </div>
  );
}

export default Slider;
