import React, { useMemo, useState, useEffect, useRef } from 'react';
import Header from '../components/Header.jsx';
import { FESTIVAL_DATA } from '../data/FestivalData.js';
import { CATEGORY_CONFIG } from '../config/CategoryConfig.js';

// ... (timeDisplay 객체는 그대로 유지)
const timeDisplay = {
  DAY: '주간 12:00-18:00',
  NIGHT: '야간 18:00-23:00',
  ALL: '주야간 12:00-23:00',
};

// 1. 필터 컴포넌트 스타일 수정
const Filter = ({ options, selectedKey, onSelect, stickyClass }) => {
  const containerRef = useRef(null);
  const [indicatorStyle, setIndicatorStyle] = useState({});

  useEffect(() => {
    const selectedButton = containerRef.current?.querySelector(`[data-key="${selectedKey}"]`);
    if (selectedButton) {
      setIndicatorStyle({
        left: selectedButton.offsetLeft,
        width: selectedButton.offsetWidth,
      });
    }
  }, [selectedKey, options]);

  return (
    <div ref={containerRef} className={`relative horizontal-scroll-container bg-gray-200/80 rounded-full p-1 z-20 backdrop-blur-sm ${stickyClass}`} style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
      <div 
        className="absolute top-1 bottom-1 bg-white rounded-full shadow-md transition-all duration-300 ease-in-out" 
        style={indicatorStyle}
      />
      {options.map(option => (
        <button
          key={option.key}
          data-key={option.key}
          type="button"
          onClick={() => onSelect(option.key)}
          className={`relative inline-block w-full sm:w-auto px-4 py-2 text-xs sm:text-sm font-bold rounded-full transition-colors duration-300 ${selectedKey === option.key ? 'text-gray-800' : 'text-gray-500'}`}
        >
          {option.name}
        </button>
      ))}
    </div>
  );
};

function BoothListPage() {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('ALL');
  const [activeLocationFilter, setActiveLocationFilter] = useState('전체');
  const [selectedBooth, setSelectedBooth] = useState(null);

  // ... (데이터 가공 로직은 그대로 유지)
  const boothCategoryFilters = useMemo(() => {
    const filters = Object.entries(CATEGORY_CONFIG)
      .filter(([, config]) => config.parent === 'BOOTH')
      .map(([key, config]) => ({ key, name: config.name }));
    return [{ key: 'ALL', name: '전체' }, ...filters];
  }, []);

  const locationFilterOptions = useMemo(() => 
    ['전체', '주간(5.18광장)', '야간(후문일대)'].map(name => ({ key: name, name })), 
  []);

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

  // --- 렌더링 함수 (스타일 수정) ---

  const renderBoothItem = (booth, index) => (
    <div 
      key={booth.id} 
      onClick={() => setSelectedBooth(booth)} 
      className="bg-white rounded-2xl p-4 flex items-center gap-4 cursor-pointer shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
      style={{ animationDelay: `${index * 50}ms`, opacity: 0, animation: 'fade-in-up 0.5s ease-out forwards' }}
    >
      <div className="flex-1 min-w-0">
        <h3 className="text-md font-bold text-gray-900 truncate">{booth.name}</h3>
        <p className="mt-1 text-sm text-gray-600 truncate">{booth.description}</p>
        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
          {booth.operationTime && (
            <span>🕒 {timeDisplay[booth.operationTime] || booth.operationTime}</span>
          )}
          {booth.location && <span>📍 {booth.location}</span>}
        </div>
      </div>
      {booth.image && (
        <img src={`/assets/${booth.image}`} alt={booth.name} className="w-20 h-20 rounded-lg object-cover bg-gray-200 flex-shrink-0" onError={(e) => { e.target.style.display = 'none'; }}/>
      )}
    </div>
  );
  
  const renderDetailView = () => (
    <div className="px-4" style={{ animation: 'fade-in-up 0.5s ease-out forwards', opacity: 0 }}>
      {selectedBooth.image && (
        <img src={`/assets/${selectedBooth.image}`} alt={selectedBooth.name} className="w-full h-auto max-h-80 rounded-xl object-cover bg-gray-200 mb-6 shadow-lg" />
      )}
      <h2 className="text-3xl font-extrabold text-gray-900">{selectedBooth.name}</h2>
      <p className="text-gray-700 mt-2 mb-4">{selectedBooth.description}</p>
       <div className="border-t border-gray-200 pt-4 flex flex-col gap-2 text-sm text-gray-600">
        <div className="flex items-center">
          <span className="mr-3 text-lg">🕒</span>
          <span>{timeDisplay[selectedBooth.operationTime] || selectedBooth.operationTime}</span>
        </div>
        <div className="flex items-center">
          <span className="mr-3 text-lg">📍</span>
          <span>{selectedBooth.location}</span>
        </div>
      </div>
    </div>
  );

  return (
    // 2. 배경색을 밝은 회색으로 변경
    <div className="w-full min-h-screen bg-gray-50">
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      
      <Header 
        title={selectedBooth ? selectedBooth.name : "부스 안내"} 
        onBackClick={selectedBooth ? () => setSelectedBooth(null) : undefined}
      />

      <div className="relative z-10 max-w-md mx-auto pb-10 pt-5">
        {selectedBooth ? renderDetailView() : (
          <div className="px-4">
            <div className="mb-4">
              <Filter 
                options={boothCategoryFilters}
                selectedKey={activeCategoryFilter}
                onSelect={setActiveCategoryFilter}
                stickyClass="sticky top-[64px]"
              />
            </div>
            
            {activeCategoryFilter === 'STUDENT_BOOTH' && (
              <div className="mb-6">
                <Filter 
                  options={locationFilterOptions}
                  selectedKey={activeLocationFilter}
                  onSelect={setActiveLocationFilter}
                  stickyClass="sticky top-[116px]"
                />
              </div>
            )}

            <div className="grid grid-cols-1 gap-4">
              {displayedBooths.length > 0 ? (
                activeCategoryFilter === 'STUDENT_BOOTH' ? (
                  studentBoothGroups.map((group, groupIndex) => (
                    <div key={group.title} style={{ animation: 'fade-in-up 0.5s ease-out forwards', animationDelay: `${groupIndex * 100}ms`, opacity: 0 }}>
                      <h2 className="text-xl font-bold text-gray-700 my-4">{group.title}</h2>
                      <div className="grid grid-cols-1 gap-4">
                        {group.booths.map((booth, boothIndex) => renderBoothItem(booth, boothIndex))}
                      </div>
                    </div>
                  ))
                ) : ( displayedBooths.map((booth, boothIndex) => renderBoothItem(booth, boothIndex)) )
              ) : ( 
                <p className="text-center text-gray-500 py-16">
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

export default BoothListPage;