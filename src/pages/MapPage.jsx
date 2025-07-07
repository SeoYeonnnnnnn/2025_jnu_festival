import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MapComponent from '../components/MapComponent';
import BoothList from '../components/BoothList'; // BoothList 컴포넌트 import

function MapPage() {
  // 부스 목록 패널의 보이기/숨기기 상태를 관리합니다.
  const [isListVisible, setIsListVisible] = useState(false);

  return (
    <div className="py-4 md:py-8 h-full bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-lg h-full flex flex-col w-full">
        <header className="mb-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">축제 지도</h1>
            <p className="text-gray-500 mt-1">지도에서 부스 위치와 주요 시설을 확인하세요.</p>
          </div>
          <Link
            to="/"
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            홈으로
          </Link>
        </header>
        {/* 이 div가 지도와 버튼의 위치 기준점이 됩니다. */}
        <div className="flex-grow rounded-xl overflow-hidden relative w-full h-full">
          <MapComponent />

          {/* 목록이 숨겨져 있을 때만 '목록 보기' 버튼을 표시합니다. */}
          {!isListVisible && (
            <button
              onClick={() => setIsListVisible(true)}
              className="absolute bottom-[88px] left-1/2 -translate-x-1/2 z-30 px-6 py-3 bg-blue-500 text-white font-bold rounded-full shadow-lg hover:bg-blue-600 transition-all animate-pulse"
            >
              부스 목록 보기
            </button>
          )}
        </div>
      </div>

      {/* 부스 목록 패널 컴포넌트 */}
      <BoothList 
        isVisible={isListVisible} 
        onClose={() => setIsListVisible(false)} 
      />
    </div>
  );
}

export default MapPage;
