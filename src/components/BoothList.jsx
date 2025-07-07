import React, { useState, useEffect } from 'react';
// ✅ updateBooth import 제거
import { fetchBooths } from '../services/api';

const BoothList = ({ isVisible, onClose }) => {
  const [booths, setBooths] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // isVisible 상태가 true가 될 때만 데이터를 불러옵니다.
  useEffect(() => {
    if (isVisible) {
      setIsLoading(true);
      fetchBooths().then(data => {
        setBooths(data);
        setIsLoading(false);
      });
    }
  }, [isVisible]);

  // ✅ handleUpdate 함수 제거

  return (
    <div
      className={`
        fixed bottom-0 left-0 right-0 z-20 bg-white rounded-t-2xl shadow-2xl
        transition-transform duration-500 ease-in-out
        ${isVisible ? 'translate-y-0' : 'translate-y-[calc(100%-80px)]'}
      `}
    >
      <div className="p-4 flex justify-between items-center border-b cursor-pointer" onClick={isVisible ? onClose : null}>
        <h2 className="text-lg font-bold">부스 목록</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-800" aria-label="목록 닫기">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="p-4 max-h-[60vh] overflow-y-auto">
        {isLoading ? (
          <p className="text-center text-gray-500">목록을 불러오는 중입니다...</p>
        ) : booths.length > 0 ? (
          <div className="space-y-3">
            {booths.map((booth) => (
              <div key={booth.id} className="p-4 border rounded-lg hover:bg-gray-50">
                <p className="font-bold text-md text-blue-600">{booth.name}</p>
                <p className="text-sm text-gray-700 mt-1">{booth.description}</p>
                <p className="text-xs text-gray-500 mt-2">위치: {booth.location}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">등록된 부스가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default BoothList;
