import { useState, useEffect } from "react";

/**
 * Компонент Slider отображает слайды с актуальными акциями.
 * Каждые 3 секунды происходит автоматический переход к следующему слайду.
 * Также можно переключать слайды вручную с помощью кнопок "←" и "→".
 * 
 * @component
 * @example
 * return <Slider />
 */
const slides = [
  " Скидка на Пепперони!",
  " Бесплатная доставка от 400 лей!",
  " Новинка: Четыре сыра!"
];

/**
 * Компонент для отображения слайдера с акциями.
 * Использует хук состояния для управления текущим слайдом и хук эффекта для автопереключения слайдов.
 * 
 * @returns {JSX.Element} Разметка слайдера с кнопками для переключения слайдов.
 */
function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  /**
   * Функция для перехода к следующему слайду.
   * Переходит к следующему слайду, используя цикличность (возвращается к первому слайду после последнего).
   */
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  /**
   * Функция для перехода к предыдущему слайду.
   * Переходит к предыдущему слайду, используя цикличность (возвращается к последнему слайду после первого).
   */
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    // Автоматический переход к следующему слайду каждые 3 секунды
    const timer = setInterval(nextSlide, 3000);
    return () => clearInterval(timer); // Очистка интервала при размонтировании компонента
  }, []);

  return (
    <div className="slider">
      <button onClick={prevSlide}>←</button>
      <span>{slides[currentSlide]}</span>
      <button onClick={nextSlide}>→</button>
    </div>
  );
}

export default Slider;
