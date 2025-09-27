// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // 👈 BrowserRouter import
import App from './App.jsx';
import './styles/index.css'; // main.jsx에서 css를 import하는 것을 권장합니다.

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 👇 앱 전체를 여기서 딱 한 번만 감싸줍니다. */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);