import React from 'react';

function SplashScreen() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center w-screen h-screen bg-black">
      {/* 배경 이미지 */}
      <div
        className="absolute inset-0 bg-cover bg-center animate-fade-in"
        style={{ 
          backgroundImage: `url(/assets/배경.png)`,
          animationDuration: '1s',
          animationDelay: '0.1s',
          animationFillMode: 'forwards',
          opacity: 0, /* 초기에는 투명하게 시작 */
        }}
      />
      {/* 배경 오버레이 */}
      <div className="absolute inset-0 bg-black/60 animate-fade-in"
        style={{ 
          animationDuration: '1s',
          animationDelay: '0.1s',
          animationFillMode: 'forwards',
          opacity: 0, /* 초기에는 투명하게 시작 */
        }}
      />

      {/* 로고 */}
      <img
        src="/assets/로고.png"
        alt="용비봉무 로고"
        className="relative z-10 w-48 md:w-64 object-contain animate-zoom-in-fade-in"
        style={{ animationDelay: '0.5s', animationFillMode: 'forwards', opacity: 0 }}
      />
      {/* 텍스트 */}
      <p 
        className="relative z-10 text-white text-xl md:text-2xl mt-4 font-black tracking-tight animate-fade-in-up"
        style={{ animationDelay: '1s', animationFillMode: 'forwards', opacity: 0 }}
      >
        2025 전남대학교 대동제 PRASINO '龍飛鳳舞'
      </p>

      {/* 애니메이션을 위한 CSS */}
      <style>
        {`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes zoom-in-fade-in {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
            animation: fade-in ease-out;
        }
        .animate-zoom-in-fade-in {
            animation: zoom-in-fade-in 0.8s ease-out;
        }
        .animate-fade-in-up {
            animation: fade-in-up 0.6s ease-out;
        }
        `}
      </style>
    </div>
  );
}

export default SplashScreen;