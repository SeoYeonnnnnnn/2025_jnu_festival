import React, { useMemo } from 'react';
import { Link } from "react-router-dom";
import Header from '../components/Header'; // 재사용 가능한 헤더 컴포넌트
import { contentData } from "../data/contentData"; // 데이터 가져오기

// 아이콘을 직접 SVG로 정의하여 일관성을 높입니다.
const ClockIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);
const MapMarkerIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>
  </svg>
);

function ContentSchedulePage() {
  // 1. subCategory를 기준으로 콘텐츠를 그룹화합니다.
  //    (contentData에 subCategory 필드가 없다면 이 로직을 수정하거나 제거해야 합니다.)
  const groupedContents = useMemo(() => {
    const groups = contentData.reduce((acc, content) => {
      const key = content.subCategory || '콘텐츠'; // subCategory가 없으면 '기타'로 분류
      if (!acc[key]) {
        acc[key] = { title: key, items: [] };
      }
      acc[key].items.push(content);
      return acc;
    }, {});
    
    // 원하는 순서가 있다면 여기에 정의할 수 있습니다. 예: ['메인 이벤트', '상시 이벤트', '기타']
    return Object.values(groups);
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-900">
      {/* 배경 이미지 및 오버레이 */}
      <div
        className="fixed inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: `url(/assets/배경.png)` }}
      />
      <div className="fixed inset-0 bg-black/50" />
      
      {/* 2. 페이지에 생동감을 더하는 애니메이션 CSS */}
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
      
      {/* 3. 투명 배경의 Header 컴포넌트 사용 */}
      <Header title="콘텐츠" />

      {/* 메인 콘텐츠 */}
      <main className="relative z-10">
        <div className="max-w-xl mx-auto px-4 pb-20 pt-20">
          <div className="text-center mb-12 animate-fade-in-up">
            <h1 className="text-4xl font-extrabold text-white tracking-tight">
              용봉대동풀이 콘텐츠
            </h1>
            <p className="mt-3 text-lg text-white/70">
              다채로운 즐거움이 가득한 축제에 여러분을 초대합니다.
            </p>
          </div>
          
          {/* 4. 그룹화된 콘텐츠 목록 렌더링 */}
          <div className="grid grid-cols-1 gap-12">
            {groupedContents.map((group, groupIndex) => (
              <div key={group.title}>
                <h2 className="text-2xl font-bold text-green-400 mb-5 animate-fade-in-up" style={{ animationDelay: `${groupIndex * 0.2}s` }}>
                  {group.title}
                </h2>
                <div className="grid grid-cols-1 gap-6">
                  {group.items.map((event, itemIndex) => (
                    <Link
                      key={event.id}
                      to={`/content/${event.id}`}
                      className="group block bg-white/5 backdrop-blur-xl rounded-2xl shadow-lg hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up"
                      style={{ animationDelay: `${groupIndex * 0.2 + itemIndex * 0.1 + 0.2}s` }}
                    >
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-white truncate">{event.title}</h3>
                        <p className="text-white/60 mt-2 mb-4 h-10 overflow-hidden">{event.summary}</p>
                        <div className="border-t border-white/20 pt-4 flex flex-col gap-2 text-sm text-white/80">
                          <div className="flex items-center">
                            <ClockIcon className="mr-2.5 text-white/50 w-4 h-4" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center">
                            <MapMarkerIcon className="mr-2.5 text-white/50 w-4 h-4" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default ContentSchedulePage;