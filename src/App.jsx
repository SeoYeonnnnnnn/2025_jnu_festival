// src/App.jsx

import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'; // 👈 BrowserRouter를 import하지 않음
import HomePage from './pages/HomePage';
import MapPage from './pages/MapPage';
import BoothListPage from './pages/BoothListPage';
import ContentSchedulePage from './pages/ContentSchedulePage';
import TimeTablePage from './pages/TimeTablePage';
import NoticePage from './pages/NoticePage';
import SplashScreen from './components/SplashScreen';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    // 👇 BrowserRouter가 제거된 것을 확인하세요.
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/map" element={<MapPage />} />
      <Route path="/booth-list" element={<BoothListPage />} />
      <Route path="/content" element={<ContentSchedulePage />} />
      <Route path="/timetable" element={<TimeTablePage />} />
      <Route path="/notice" element={<NoticePage />} />
    </Routes>
  );
}

export default App;