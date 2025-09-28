import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// 1. 타임테이블 데이터를 구조화하여 정리합니다.
const timetableData = [
  {
    day: 1,
    title: '1일차',
    events: [
      { time: '15:30', title: '입장 시작' },
      { 
        time: '16:20-19:00', 
        title: '동아리 공연',
        performers: ['미올', '메이플', '바이슨', '새벽울림', '하이코드', '숨']
      },
      { time: '19:00-19:30', title: '개막식' },
      { time: '19:30-20:00', title: `'솔로는 시시해, 우리 CC하자!'` },
      { time: '20:00-22:00', title: '아티스트 공연' }
    ]
  },
  {
    day: 2,
    title: '2일차',
    events: [
      { time: '15:00', title: '입장 시작' },
      { 
        time: '16:10-18:30', 
        title: '동아리 및 CUB 대학가요제 공연',
        performers: ['맥킨토쉬', '알케미', '뉴에라']
      },
      { time: '18:30-22:00', title: '아티스트 공연' }
    ]
  }
];

function TimetablePage() {
  const navigate = useNavigate();
  const [activeDay, setActiveDay] = useState(1); // 1일차를 기본으로 표시

  // 뒤로가기 핸들러
  const handleBackClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);
  
  // 선택된 날짜에 맞는 이벤트 목록을 필터링
  const displayedEvents = useMemo(() => {
    return timetableData.find(data => data.day === activeDay)?.events || [];
  }, [activeDay]);

  return (
    <div className="w-full min-h-screen bg-gray-900">
      {/* BoothListPage와 동일한 배경 및 스타일 적용 */}
      <div className="fixed inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: `url(/assets/배경.png)` }}/>
      <div className="fixed inset-0 bg-black/50" />
      <style>{`@keyframes fade-in-up {from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); }}.animate-fade-in-up {animation: fade-in-up 0.5s ease-out forwards;opacity: 0;}`}</style>
      
      {/* 헤더 */}
      <div style={styles.headerContainer}>
        <button type="button" onClick={handleBackClick} style={styles.backButton}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h1 style={styles.headerTitle}>타임테이블</h1>
      </div>
      
      {/* 메인 컨텐츠 */}
      <div className="relative z-10 max-w-md mx-auto pb-10 pt-20">
        <div className="px-4">
          
          {/* 날짜 선택 필터 (글래스모피즘 적용) */}
          <div className="flex justify-center bg-black/20 rounded-full p-1 my-4 sticky top-[64px] z-20 backdrop-blur-sm">
            {[1, 2].map(day => (
              <button 
                key={day} 
                type="button" 
                onClick={() => setActiveDay(day)} 
                className={`w-full py-2 text-sm font-bold rounded-full transition-colors duration-300 ${activeDay === day ? 'bg-green-500/80 text-white shadow-md' : 'bg-transparent text-white/70'}`}
              >
                {day}일차
              </button>
            ))}
          </div>

          {/* 타임테이블 목록 */}
          <div className="grid grid-cols-1 gap-4 mt-6">
            {displayedEvents.map((event, index) => (
              <div
                key={`${event.time}-${index}`}
                className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 flex gap-4 animate-fade-in-up"
                style={{ animationDelay: `${index * 70}ms` }}
              >
                {/* 시간 표시 */}
                <div className="w-24 flex-shrink-0 text-center">
                  <p className="text-base font-bold text-green-400">{event.time}</p>
                </div>
                
                {/* 이벤트 내용 */}
                <div className="flex-1 min-w-0 border-l border-white/20 pl-4">
                  <h3 className="text-md font-bold text-white">{event.title}</h3>
                  {event.performers && (
                    <div className="mt-2 text-sm text-white/60 space-y-1">
                      {event.performers.map(performer => (
                        <p key={performer}>- {performer}</p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// BoothListPage에서 사용된 헤더 스타일 재사용
const styles = {
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '56px',
    zIndex: 30, 
    backgroundColor: 'transparent',
  },
  backButton: {
    position: 'absolute',
    left: '16px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
  },
  headerTitle: {
    margin: 0,
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadow: '0 1px 3px rgba(0,0,0,0.5)',
  },
};

export default TimetablePage;