import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. useNavigate import
// import Header from '../components/Header.jsx'; // 2. Header 컴포넌트 import 삭제
import { FESTIVAL_DATA } from '../data/FestivalData.js';
import { CATEGORY_CONFIG } from '../config/CategoryConfig.js';

// ... (timeDisplay 객체는 그대로 유지)
const timeDisplay = {
  DAY: '주간 12:00-18:00',
  NIGHT: '야간 18:00-23:00',
  ALL: '주야간 12:00-23:00',
};

function BoothListPage() {
  const navigate = useNavigate(); // 3. navigate 함수 사용 준비

  // 4. 뒤로가기 버튼을 위한 handleGoHome 함수 추가
  const handleGoHome = useCallback(() => {
    navigate(-1); // 이전 페이지로 이동
  }, [navigate]);

  const [activeCategoryFilter, setActiveCategoryFilter] = useState('ALL');
  const [activeLocationFilter, setActiveLocationFilter] = useState('전체');
  const [selectedBooth, setSelectedBooth] = useState(null);

  // ... (데이터 가공 로직은 모두 그대로 유지)
  const boothCategoryFilters = useMemo(() => {
    const filters = Object.entries(CATEGORY_CONFIG)
      .filter(([, config]) => config.parent === 'BOOTH')
      .map(([key, config]) => ({ key, name: config.name }));
    return [{ key: 'ALL', name: '전체' }, ...filters];
  }, []);

  const locationFilterOptions = ['전체', '주간(5.18광장)', '야간(후문일대)'];

  const displayedBooths = useMemo(() => {
    const actualBooths = FESTIVAL_DATA.filter(
      booth => booth.mainCategory === 'BOOTH' && !booth.description?.includes("목록 보러가기")
    );
    const categoryFilteredBooths = activeCategoryFilter !== 'ALL'
      ? actualBooths.filter(booth => booth.subCategory === activeCategoryFilter)
      : actualBooths;

    if (activeCategoryFilter === 'STUDENT_BOOTH') {
      if (activeLocationFilter === '전체') return categoryFilteredBooths;
      if (activeLocationFilter === '주간(5.18광장)') return categoryFilteredBooths.filter(booth => booth.location === '5.18광장(봉지)');
      if (activeLocationFilter === '야간(후문일대)') return categoryFilteredBooths.filter(booth => booth.location === '후문 일대(용지 앞)');
    }
    return categoryFilteredBooths;
  }, [activeCategoryFilter, activeLocationFilter]);
  
  const studentBoothGroups = useMemo(() => {
    if (activeCategoryFilter !== 'STUDENT_BOOTH') return [];
    const groups = displayedBooths.reduce((acc, booth) => {
      const type = booth.studentBoothType || '기타';
      if (!acc[type]) acc[type] = [];
      acc[type].push(booth);
      return acc;
    }, {});
    const groupOrder = ['음식', '소개팅', '기타'];
    return groupOrder.map(groupName => ({ title: groupName, booths: groups[groupName] || [] })).filter(group => group.booths.length > 0);
  }, [displayedBooths, activeCategoryFilter]);

  useEffect(() => {
    setActiveLocationFilter('전체');
  }, [activeCategoryFilter]);

  // --- 렌더링 함수 (그대로 유지) ---
  const renderBoothItem = (booth, index) => (
    <div 
      key={booth.id} 
      onClick={() => setSelectedBooth(booth)} 
      className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 flex items-center gap-4 cursor-pointer hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex-1">
        <h3 className="text-md font-bold text-white">{booth.name}</h3>
        <p className="mt-1 text-sm text-white/60 truncate">{booth.description}</p>
        <div className="flex items-center gap-4 mt-2 text-xs text-white/50">
          {booth.operationTime && (
            <span>🕒 {timeDisplay[booth.operationTime] || booth.operationTime}</span>
          )}
          {booth.location && <span>📍 {booth.location}</span>}
        </div>
      </div>
      {booth.image && (
        <img src={`/assets/${booth.image}`} alt={booth.name} className="w-20 h-20 rounded-lg object-cover bg-gray-700" onError={(e) => { e.target.style.display = 'none'; }}/>
      )}
    </div>
  );
  
  const renderDetailView = () => (
    <div className="px-4 animate-fade-in-up">
      {selectedBooth.image && (
        <img src={`/assets/${selectedBooth.image}`} alt={selectedBooth.name} className="w-full h-auto max-h-80 rounded-xl object-cover bg-gray-700 mb-6 shadow-lg" />
      )}
      <h2 className="text-3xl font-extrabold text-white">{selectedBooth.name}</h2>
      <p className="text-white/70 mt-2 mb-4">{selectedBooth.description}</p>
       <div className="border-t border-white/20 pt-4 flex flex-col gap-2 text-sm text-white/80">
        <div className="flex items-center">
          <span className="mr-3">🕒</span>
          <span>{timeDisplay[selectedBooth.operationTime] || selectedBooth.operationTime}</span>
        </div>
        <div className="flex items-center">
          <span className="mr-3">📍</span>
          <span>{selectedBooth.location}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-gray-900">
      {/* 배경 이미지 및 오버레이 */}
      <div
        className="fixed inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: `url(/assets/배경.png)` }}
      />
      <div className="fixed inset-0 bg-black/50" />
      
      {/* 애니메이션 CSS */}
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
      
      {/* 5. 직접 작성한 헤더 코드로 교체 */}
      <div style={styles.headerContainer}>
        <button type="button" onClick={handleGoHome} style={styles.backButton}>
          <svg width="24" height="24" viewBox="0 0 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        {/* 상세 뷰일 때와 아닐 때 제목을 다르게 표시 */}
        <h1 style={styles.headerTitle}>
          {selectedBooth ? selectedBooth.name : "부스 안내"}
        </h1>
      </div>
      
      <div className="relative z-10 max-w-md mx-auto pb-10 pt-20">
        {selectedBooth ? renderDetailView() : (
          <div className="px-4">
            {/* 카테고리 필터 */}
            <div className="horizontal-scroll-container bg-black/20 rounded-full p-1 mb-4 sticky top-[64px] z-20 backdrop-blur-sm" style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
              {boothCategoryFilters.map(filter => (
                <button
                  key={filter.key}
                  type="button"
                  onClick={() => setActiveCategoryFilter(filter.key)}
                  className={`inline-block px-4 py-2 text-sm font-bold rounded-full transition-colors duration-300 ${activeCategoryFilter === filter.key ? 'bg-green-500/80 text-white shadow-md' : 'bg-transparent text-white/70'}`}
                >
                  {filter.name}
                </button>
              ))}
            </div>

            {/* 학생부스 장소 필터 */}
            {activeCategoryFilter === 'STUDENT_BOOTH' && (
              <div className="flex justify-center bg-black/20 rounded-full p-1 mb-6 sticky top-[116px] z-10 backdrop-blur-sm">
                {locationFilterOptions.map(filter => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveLocationFilter(filter)}
                    className={`w-full py-2 text-xs font-bold rounded-full transition-colors duration-300 ${activeLocationFilter === filter ? 'bg-white/80 text-gray-900 shadow-md' : 'bg-transparent text-white/70'}`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            )}

            {/* 필터링된 부스 목록 */}
            <div className="grid grid-cols-1 gap-4">
              {displayedBooths.length > 0 ? (
                activeCategoryFilter === 'STUDENT_BOOTH' ? (
                  studentBoothGroups.map((group, groupIndex) => (
                    <div key={group.title} className="animate-fade-in-up" style={{ animationDelay: `${groupIndex * 100}ms` }}>
                      <h2 className="text-xl font-bold text-green-400 my-4">{group.title}</h2>
                      <div className="grid grid-cols-1 gap-4">
                        {group.booths.map((booth, boothIndex) => renderBoothItem(booth, boothIndex))}
                      </div>
                    </div>
                  ))
                ) : ( displayedBooths.map((booth, boothIndex) => renderBoothItem(booth, boothIndex)) )
              ) : ( 
                <p className="text-center text-white/50 py-16 animate-fade-in-up">
                  해당 카테고리의 부스가 없습니다.
                </p> 
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// 6. 헤더를 위한 styles 객체 추가
const styles = {
  headerContainer: {
    position: 'sticky',
    top: 0,
    left: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '56px',
    zIndex: 20,
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
  },
};

export default BoothListPage;