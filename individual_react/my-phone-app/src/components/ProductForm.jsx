import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/ProductForm.css";

const API_URL = "https://67fbaba81f8b41c8168487dc.mockapi.io/products";

/**
 * Компонент формы добавления или редактирования пиццы.
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
    sizes: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isEditMode) {
      axios
        .get(`${API_URL}/${id}`)
        .then((res) =>
          setForm({
            ...res.data,
            sizes: res.data.sizes.join(", "),
          })
        )
        .catch((err) => console.error("Ошибка при получении товара:", err))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [id, isEditMode]);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Введите название";
    if (!form.description.trim()) newErrors.description = "Введите описание";
    if (!form.price || isNaN(form.price)) newErrors.price = "Введите корректную цену";
    if (!form.image.trim()) newErrors.image = "Введите URL изображения";
    if (!form.sizes.trim()) newErrors.sizes = "Введите размеры через запятую";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const payload = {
        ...form,
        sizes: form.sizes.split(",").map((s) => parseInt(s.trim())),
      };

      if (isEditMode) {
        await axios.put(`${API_URL}/${id}`, payload);
        alert("Товар успешно обновлён");
      } else {
        await axios.post(API_URL, payload);
        alert("Товар добавлен");
      }

      navigate("/");
    } catch (err) {
      console.error("Ошибка при сохранении товара:", err);
      alert("Произошла ошибка при сохранении");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Удалить этот товар?")) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      alert("Товар удалён");
      navigate("/");
    } catch (err) {
      console.error("Ошибка при удалении товара:", err);
      alert("Не удалось удалить товар");
    }
  };

  if (loading) return <p className="container">Загрузка...</p>;

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="product-form">
        <h2>{isEditMode ? "Редактировать телефон" : "Добавить телефон"}</h2>

        <input
          type="text"
          name="name"
          placeholder="Название"
          value={form.name}
          onChange={handleChange}
        />
        {errors.name && <p className="error">{errors.name}</p>}

        <textarea
          name="description"
          placeholder="Описание"
          value={form.description}
          onChange={handleChange}
        />
        {errors.description && <p className="error">{errors.description}</p>}

        <input
          type="text"
          name="price"
          placeholder="Цена"
          value={form.price}
          onChange={handleChange}
        />
        {errors.price && <p className="error">{errors.price}</p>}

        <input
          type="text"
          name="image"
          placeholder="URL изображения"
          value={form.image}
          onChange={handleChange}
        />
        {errors.image && <p className="error">{errors.image}</p>}

        <input
          type="text"
          name="sizes"
          placeholder="Размеры (напр. 30, 40, 50)"
          value={form.sizes}
          onChange={handleChange}
        />
        {errors.sizes && <p className="error">{errors.sizes}</p>}

        <button type="submit">Сохранить</button>
        {isEditMode && (
          <button type="button" onClick={handleDelete} className="btn-delete">
            Удалить
          </button>
        )}
      </form>
    </div>
  );
}

export default ProductForm;
