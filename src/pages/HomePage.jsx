import React from 'react';
import { Link } from 'react-router-dom'; // 1. Link 컴포넌트를 import 합니다.


function HomePage() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800">2025년도 전남대학교 대동제</h1>
        <p className="text-lg text-gray-600 mt-4">
          D-203942934
          <br />
          이서연과 함께 개쩌는 축제를 
        </p>
      </div>

      <div className="mt-12">
        {/* 2. button 대신 Link 컴포넌트를 사용하고, to 속성으로 이동할 경로를 지정합니다. */}
        <Link
          to="/map"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300"
        >
          지도보러가기
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
