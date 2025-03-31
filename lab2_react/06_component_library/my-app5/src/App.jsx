// src/App.js
import React from 'react';
import { Button, Typography } from '@mui/material'; // Импортируем компоненты из Material-UI

function App() {
  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>
        Приложение с Material-UI
      </Typography>
      <Button variant="contained" color="primary">
        Нажми меня
      </Button>
    </div>
  );
}

export default App;
