import React from "react";
import { Link } from "react-router-dom";

// 아이콘 SVG 컴포넌트들 (변동 없음)
const MapIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>
  </svg>
);
const ClockIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);
const LightbulbIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5C17.7 10.2 18 9 18 7.5a6 6 0 0 0-12 0c0 1.5.3 2.7 1.5 3.9.8.8 1.3 1.5 1.5 2.5"/>
    <path d="M9 18h6"/><path d="M10 22h4"/>
  </svg>
);
const StoreIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/><path d="M22 7v3a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7"/>
  </svg>
);
const BullhornIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(/assets/배경.png)` }}
      />
      <div className="absolute inset-0 bg-black/30" />

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
          2025. 09. 29. (월)~2025. 09. 30. (화)
        </p>
      </div>

      {/* 하단 플로팅 네비게이션 바 */}
      <footer className="fixed bottom-0 left-0 right-0 z-20 h-24">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md h-28 bg-gradient-to-t from-black/20 to-transparent blur-lg"></div>
        
        <div className="relative max-w-md mx-auto h-full flex justify-around items-center px-4">
          {navButtons.map(({ title, Icon, link }, index) => {
            const isCenter = index === 2;

            if (isCenter) {
              // 가운데 큰 버튼 (지도)
              return (
                <Link
                  to={link}
                  key={title}
                  className="relative -top-8 flex flex-col items-center justify-center w-20 h-20 bg-white/50 backdrop-blur-md rounded-full shadow-lg ring-4 ring-white/20 transition-all transform hover:scale-110"
                  aria-label={title}
                >
                  <Icon className="text-white text-3xl" />
                  <span className="text-white text-xs font-bold mt-1">{title}</span>
                </Link>
              );
            } else {
              // ✅ 수정된 양 옆의 작은 버튼들
              return (
                <Link
                  to={link}
                  key={title}
                  className="group"
                  aria-label={title}
                  style={{ marginTop: 'auto' }}
                >
                  <div className="flex flex-col items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-md rounded-full transition-all transform group-hover:-translate-y-2 group-hover:bg-white/20">
                    <Icon className="text-white/80 text-2xl group-hover:text-white transition-colors" />
                    <span className="text-white/80 text-xs mt-1 group-hover:text-white transition-colors">{title}</span>
                  </div>
                </Link>
              );
            }
          })}
        </div>
      </footer>
    </div>
  );
}