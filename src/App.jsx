import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'; 
import MapPage from './pages/MapPage';
import HomePage from './pages/HomePage';
import TimetablePage from './pages/TimetablePage';
import NoticePage from './pages/NoticePage';
import ContentSchedulePage from './pages/ContentSchedulePage.jsx';
import FeedbackPage from './pages/FeedbackPage';
import BoothListPage from './pages/BoothListPage';

// ... (다른 import)
function App() {
  useEffect(() => {
    console.log("✅ MapPage 컴포넌트가 마운트되었습니다. (최초 1번만 실행되어야 정상)");

    return () => {
      console.error("❌ MapPage 컴포넌트가 파괴(언마운트)되었습니다! 이것이 문제입니다!");
    };
  }, []);
  return (
    <div className="w-screen h-screen">
      <Routes>
        {/* Route 컴포넌트로 각 경로와 해당 경로에서 보여줄 컴포넌트를 지정*/}
        <Route path="/" element={<HomePage />} />
        <Route path="/map" element={<MapPage />} /> 
        <Route path="/booth-list" element={<BoothListPage/>} />
        <Route path="/content" element={<ContentSchedulePage />} />*/\
        <Route path="/timetable" element={<TimetablePage />} />
        <Route path="/notice" element={<NoticePage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
      </Routes>
    </div>
  );
}

export default App;