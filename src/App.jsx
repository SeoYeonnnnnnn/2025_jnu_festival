import React, { useState, useEffect } from 'react';
// 1. BrowserRouter를 다시 가져옵니다.
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MapPage from './pages/MapPage';
import BoothListPage from './pages/BoothListPage';
import ContentSchedulePage from './pages/ContentSchedulePage';
import TimeTablePage from './pages/TimetablePage';
import NoticePage from './pages/NoticePage';
import SplashScreen from './components/SplashScreen';
import ContentDetailPage from './pages/ContentDetailPage';
// 2. Vercel Analytics 컴포넌트를 가져옵니다.
import { Analytics } from '@vercel/analytics/react';

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
    // 3. BrowserRouter로 앱 전체를 감싸줍니다.
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/booth-list" element={<BoothListPage />} />
        <Route path="/content/:eventId" element={<ContentDetailPage />} />
        <Route path="/content" element={<ContentSchedulePage />} />
        <Route path="/timetable" element={<TimeTablePage />} />
        <Route path="/notice" element={<NoticePage />} />
      </Routes>
      
      {/* 4. Analytics 컴포넌트를 BrowserRouter 안에 추가합니다. */}
      <Analytics />
    </BrowserRouter>
  );
}

export default App;
