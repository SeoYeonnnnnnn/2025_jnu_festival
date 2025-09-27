import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FESTIVAL_DATA } from '../data/FestivalData.js';
import { CATEGORY_CONFIG } from '../config/CategoryConfig.js';

// operationTime 키 값을 사용자에게 보여줄 텍스트로 변환하는 객체
const timeDisplay = {
  DAY: '주간 12:00-18:00',
  NIGHT: '야간 18:00-23:00',
  ALL: '주야간 12:00-23:00',
};

function BoothListPage() {
  // --- 상태 관리 ---
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('ALL');
  const [activeLocationFilter, setActiveLocationFilter] = useState('전체');
  const [selectedBooth, setSelectedBooth] = useState(null); // 개별 부스 상세 뷰 상태
  const [selectedStudentGroup, setSelectedStudentGroup] = useState(null); // 학생부스 하위 그룹 선택 상태

  // --- 데이터 가공 ---
  const boothCategoryFilters = useMemo(() => {
    const filters = Object.entries(CATEGORY_CONFIG)
      .filter(([key, config]) => config.parent === 'BOOTH')
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
      if (!acc[type]) acc[type] = { title: type, booths: [] };
      acc[type].booths.push(booth);
      return acc;
    }, {});
    const groupOrder = ['음식', '소개팅', '기타'];
    return groupOrder.map(groupName => groups[groupName]).filter(Boolean);
  }, [displayedBooths, activeCategoryFilter]);

  // 카테고리 필터가 변경되면 하위 상태들을 모두 초기화합니다.
  useEffect(() => {
    setActiveLocationFilter('전체');
    setSelectedStudentGroup(null);
    setSelectedBooth(null);
  }, [activeCategoryFilter]);

  // 뒤로가기 버튼 핸들러
  const handleBack = () => {
    if (selectedBooth) {
      setSelectedBooth(null); // 상세 뷰 -> 목록 뷰
    } else if (selectedStudentGroup) {
      setSelectedStudentGroup(null); // 학생부스 목록 -> 학생부스 그룹 목록
    }
  };

  // --- 렌더링 함수들 ---
  const renderBoothItem = (booth) => (
    <div key={booth.id} onClick={() => setSelectedBooth(booth)} className="bg-white rounded-xl shadow p-4 flex items-center gap-4 cursor-pointer hover:shadow-lg transition-shadow">
      <div className="flex-1 min-w-0">
        <h3 className="text-md font-bold text-gray-900 truncate">{booth.name}</h3>
        <p className="mt-1 text-sm text-gray-600 truncate">{booth.description}</p>
        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
          {booth.operationTime && (
            <span>🕒 {timeDisplay[booth.operationTime] || booth.operationTime}</span>
          )}
          {booth.location && <span className="truncate">📍 {booth.location}</span>}
        </div>
      </div>
      {booth.image && (
        <img src={`/assets/${booth.image}`} alt={booth.name} className="w-16 h-16 rounded-lg object-cover bg-gray-200 flex-shrink-0" onError={(e) => { e.target.style.display = 'none'; }}/>
      )}
    </div>
  );
  
  const renderDetailView = () => (
    <div className="pt-5">
      {selectedBooth.image && <img src={`/assets/${selectedBooth.image}`} alt={selectedBooth.name} className="w-full h-48 rounded-lg object-cover bg-gray-200 mb-4" />}
      <h2 className="text-2xl font-extrabold text-gray-800">{selectedBooth.name}</h2>
      <div className="flex items-center gap-4 my-2 text-sm text-gray-600">
        {selectedBooth.operationTime && <span>🕒 {timeDisplay[selectedBooth.operationTime] || selectedBooth.operationTime}</span>}
        {selectedBooth.location && <span>📍 {selectedBooth.location}</span>}
      </div>
      <p className="mt-4 text-base text-gray-700 leading-relaxed">{selectedBooth.description}</p>
    </div>
  );

  return (
    <div className="w-full min-h-screen relative bg-gray-50">
      <Header 
        title={selectedBooth ? selectedBooth.name : (selectedStudentGroup || CATEGORY_CONFIG[activeCategoryFilter]?.name || "부스 안내")} 
        onBackClick={(selectedBooth || selectedStudentGroup) ? handleBack : null}
      />
      <div className="relative z-10 max-w-md mx-auto px-5 pb-10 pt-5">
        {selectedBooth ? renderDetailView() : (
          <>
            {/* 상단 카테고리 필터 */}
            <div className="horizontal-scroll-container bg-gray-100 rounded-full p-1 mb-4 sticky top-[66px] z-20 backdrop-blur-sm bg-opacity-80" style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
              {boothCategoryFilters.map(filter => (
                <button key={filter.key} type="button" onClick={() => setActiveCategoryFilter(filter.key)}
                  className={`inline-block px-4 py-2 text-sm font-bold rounded-full transition-colors duration-300 ${activeCategoryFilter === filter.key ? 'bg-white text-gray-800 shadow' : 'bg-transparent text-gray-500'}`}>
                  {filter.name}
                </button>
              ))}
            </div>

            {/* 학생부스 선택 시, 장소 필터 또는 그룹 목록 표시 */}
            {activeCategoryFilter === 'STUDENT_BOOTH' && (
              <>
                <div className="flex justify-center bg-gray-200 rounded-full p-1 mb-6 sticky top-[118px] z-10 backdrop-blur-sm bg-opacity-80">
                  {locationFilterOptions.map(filter => (
                    <button key={filter} type="button" onClick={() => setActiveLocationFilter(filter)}
                      className={`w-full py-2 text-xs font-bold rounded-full transition-colors duration-300 ${activeLocationFilter === filter ? 'bg-white text-gray-800 shadow' : 'bg-transparent text-gray-500'}`}>
                      {filter}
                    </button>
                  ))}
                </div>
                {/* 학생부스 그룹 목록 또는 개별 부스 목록 렌더링 */}
                <div className="grid grid-cols-1 gap-4">
                  {selectedStudentGroup
                    ? studentBoothGroups.find(g => g.title === selectedStudentGroup)?.booths.map(renderBoothItem)
                    : studentBoothGroups.map(group => (
                        <div key={group.title} className="mb-2">
                          <h2 className="text-xl font-bold text-gray-700 mb-3">{group.title}</h2>
                          <div className="grid grid-cols-1 gap-3">
                            {group.booths.map(renderBoothItem)}
                          </div>
                        </div>
                      ))
                  }
                </div>
              </>
            )}

            {/* 학생부스가 아닌 다른 카테고리 목록 */}
            {activeCategoryFilter !== 'STUDENT_BOOTH' && (
              <div className="grid grid-cols-1 gap-3">
                {displayedBooths.length > 0
                  ? displayedBooths.map(renderBoothItem)
                  : <p className="text-center text-gray-500 py-10">해당 카테고리의 부스가 없습니다.</p>
                }
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default BoothListPage;

