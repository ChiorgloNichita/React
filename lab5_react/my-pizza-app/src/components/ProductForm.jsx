import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = "https://67fbaba81f8b41c8168487dc.mockapi.io/products";

/**
 * Компонент формы добавления или редактирования пиццы.
 * Реализует валидацию и отправку данных на mockapi.
 *
 * @component
 * @returns {JSX.Element}
 */
function ProductForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    sizes: [30, 40, 50],
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true); // показываем загрузку изначально

  useEffect(() => {
    if (isEditMode && id) {
      // Для редактирования — задержка и загрузка данных
      setTimeout(() => {
        axios
          .get(`${API_URL}/${id}`)
          .then((res) => setForm(res.data))
          .catch((err) => console.error("Ошибка при получении товара:", err))
          .finally(() => setLoading(false));
      }, 1000);
    } else {
      // Для добавления — просто задержка 1 секунда
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [id]);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Введите название";
    if (!form.description.trim()) newErrors.description = "Введите описание";
    if (!form.price || isNaN(form.price)) newErrors.price = "Укажите цену числом";
    if (!form.image.trim()) newErrors.image = "Введите URL изображения";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      if (isEditMode) {
        await axios.put(`${API_URL}/${id}`, form);
      } else {
        await axios.post(API_URL, form);
      }
      navigate("/");
    } catch (error) {
      console.error("Ошибка при сохранении:", error);
    }
  };

  return (
    <div>
      <h2>{isEditMode ? "Редактировать пиццу" : "Добавить новую пиццу"}</h2>

      {loading ? (
        <p style={{ color: "blue", fontWeight: "bold", fontSize: "20px" }}>Загрузка...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Название"
            value={form.name}
            onChange={handleChange}
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}

          <input
            name="description"
            placeholder="Описание"
            value={form.description}
            onChange={handleChange}
          />
          {errors.description && <p style={{ color: "red" }}>{errors.description}</p>}

          <input
            name="price"
            placeholder="Цена"
            value={form.price}
            onChange={handleChange}
          />
          {errors.price && <p style={{ color: "red" }}>{errors.price}</p>}

          <input
            name="image"
            placeholder="URL изображения"
            value={form.image}
            onChange={handleChange}
          />
          {errors.image && <p style={{ color: "red" }}>{errors.image}</p>}

          <button type="submit" style={{ marginTop: "15px" }}>
            {isEditMode ? "Сохранить изменения" : "Добавить пиццу"}
          </button>
        </form>
      )}
    </div>
  );
}

export default ProductForm;
