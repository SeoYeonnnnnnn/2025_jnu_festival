import React from "react";
import { Link } from "react-router-dom";

// 아이콘 SVG 컴포넌트들 (변동 없음)
const MapIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>
  </svg>
);
const ClockIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);
const LightbulbIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18h6v-2a4 4 0 0 0-4-4V8a4 0 0 0-4 4v2h2m0 6v2"></path><line x1="12" y1="2" x2="12" y2="4"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>
);
const StoreIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" /><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" /><path d="M2 7h20" /><path d="M22 7v3a2 2 0 0 1-2 2H4a2 0 0 1-2-2V7" />
  </svg>
);
const BullhornIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a4 4 0 0 0-4 4v2H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h4v2a4 4 0 0 0 8 0v-2h4a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2h-4V6a4 4 0 0 0-4-4z"/><path d="M8 18v2"/><path d="M16 18v2"/>
  </svg>
);

export default function HomePage() {
  const navButtons = [
    { title: "부스", Icon: StoreIcon, link: "/booth-list" },
    { title: "콘텐츠", Icon: LightbulbIcon, link: "/content" },
    { title: "지도", Icon: MapIcon, link: "/map" },
    { title: "타임테이블", Icon: ClockIcon, link: "/timetable" },
    { title: "공지사항", Icon: BullhornIcon, link: "/notice" },
  ];

  return (
    <div className="w-full h-screen relative overflow-hidden">
      {/* 1. 기존 배경 이미지로 변경 */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(/assets/배경.png)` }}
      />
      <div className="absolute inset-0 bg-black/30" />

      {/* 2. 텍스트 애니메이션을 위한 CSS 스타일 정의 */}
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
      `}</style>

      {/* 로고 및 콘텐츠 영역 */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 pb-32">
        <img
          src="/assets/로고.png"
          alt="용비봉무 로고"
          className="w-56 md:w-72 object-contain animate-fade-in-up"
          style={{ animationDelay: '0.2s' }}
        />
        <p 
          className="text-white text-3xl md:text-4xl mt-4 font-black tracking-tight animate-fade-in-up"
          style={{ animationDelay: '0.4s' }}
        >
          2025 전남대학교 대동제 PRASINO '龍飛鳳舞'
        </p>
          <p 
            className="text-white/80 text-lg mt-2 font-light animate-fade-in-up"
            style={{ animationDelay: '0.6s' }}
          >
          축제에 오신 것을 환영합니다!
        </p>
      </div>

      {/* 3. 개선된 하단 플로팅 네비게이션 바 */}
      <footer className="fixed bottom-0 left-0 right-0 z-20 h-24">
        {/* 네비게이션 바 뒤에 은은한 그림자 효과 추가 */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md h-28 bg-gradient-to-t from-black/20 to-transparent blur-lg"></div>
        
        <div className="relative max-w-md mx-auto h-full flex justify-around items-center px-4">
          {navButtons.map(({ title, Icon, link }, index) => {
            const isCenter = index === 2;

            if (isCenter) {
              // 가운데 큰 버튼 (지도) - 황금색/주황색 그라데이션으로 변경
              return (
                <Link
                  to={link}
                  key={title}
                  // 기존: from-purple-600 to-pink-500, shadow-purple-500/30, hover:shadow-purple-400/50
                  // 변경: from-yellow-500 to-orange-500, shadow-orange-500/30, hover:shadow-orange-400/50
                  className="relative -top-8 flex flex-col items-center justify-center w-20 h-20 bg-white/50 backdrop-blur-md rounded-full shadow-lg ring-4 ring-white/20 transition-all transform hover:scale-110"
                  aria-label={title}
                >
                  <Icon className="text-white text-3xl" />
                  <span className="text-white text-xs font-bold mt-1">{title}</span>
                </Link>
              );
            } else {
              // 양 옆의 작은 버튼들 (변동 없음)
              return (
                <Link
                  to={link}
                  key={title}
                  className="group flex flex-col items-center justify-center w-16 h-16 rounded-full transition-all transform hover:-translate-y-2"
                  aria-label={title}
                  style={{ marginTop: 'auto' }}
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-md rounded-full group-hover:bg-white/20 transition-colors">
                    <Icon className="text-white/80 text-2xl group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-white/80 text-xs mt-1 group-hover:text-white transition-colors">{title}</span>
                </Link>
              );
            }
          })}
        </div>
      </footer>
    </div>
  );
}