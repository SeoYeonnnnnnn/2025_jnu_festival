import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MapPage from './pages/MapPage.jsx';
import HomePage from './pages/HomePage.jsx';
import TimetablePage from './pages/TimetablePage.jsx';
import NoticePage from './pages/NoticePage.jsx';
import ContentSchedulePage from './pages/ContentSchedulePage.jsx';
import FeedbackPage from './pages/FeedbackPage.jsx';

function App() {
  // MapPage의 생명주기를 확인하는 useEffect는 MapPage.jsx 안에 있어야 합니다.
  // 이 곳에서는 App 컴포넌트의 생명주기를 추적하게 됩니다.

  return (
    // BrowserRouter를 최상단에 추가하여 라우팅 기능을 활성화합니다.
    <BrowserRouter>
      <div className="w-screen h-screen">
        <Routes>
          {/* key 속성 없이, 각 경로에 맞는 컴포넌트를 렌더링합니다. */}
          <Route path="/" element={<HomePage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/content" element={<ContentSchedulePage />} />
          <Route path="/timetable" element={<TimetablePage />} />
          <Route path="/notice" element={<NoticePage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/contentdetailpage" element={<ContentDetailPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

