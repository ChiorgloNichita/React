import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/ProductForm.css"; // Добавим стили сюда

const API_URL = "https://681d14d3f74de1d219aec0b5.mockapi.io/products";

function ProductForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isEdit) {
      axios.get(`${API_URL}/${id}`)
        .then((res) => setForm(res.data))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        await axios.put(`${API_URL}/${id}`, form);
        alert("Товар обновлён");
      } else {
        await axios.post(API_URL, form);
        alert("Товар добавлен");
      }

      navigate("/");
    } catch (error) {
      console.error("Ошибка при сохранении:", error);
    }
  };

  if (loading) return <p className="loading">Загрузка...</p>;

  return (
    <div className="form-wrapper">
      <h2>{isEdit ? "Редактировать телефон" : "Добавить телефон"}</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <input
          name="name"
          placeholder="Название"
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="description"
          placeholder="Описание"
          value={form.description}
          onChange={handleChange}
        />
        <input
          name="price"
          placeholder="Цена"
          type="number"
          value={form.price}
          onChange={handleChange}
        />
        <input
          name="image"
          placeholder="URL изображения"
          value={form.image}
          onChange={handleChange}
        />
        <button type="submit">
          {isEdit ? "Сохранить изменения" : "Добавить"}
        </button>
      </form>
    </div>
  );
}

export default ProductForm;
