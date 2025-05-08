// src/main.jsx

/**
 * Точка входа в React-приложение.
 * Оборачивает приложение в BrowserRouter и Redux Provider.
 */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";           // Подключение Redux
import { store } from "./store/store";            // Redux store
import "./index.css";

// Рендеринг приложения в корневой элемент #root
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>                      {/* Redux Provider */}
      <BrowserRouter>                             {/* React Router */}
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
