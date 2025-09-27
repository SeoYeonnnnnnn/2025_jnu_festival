import React, { useState, useEffect, useMemo } from 'react';

// 운영 시간 필터 옵션
const timeFilters = {
  TOTAL: '전체',
  DAY: '주간',
  NIGHT: '야간',
  ALL: '주야간',
};

// 운영 시간 표시 텍스트
const timeDisplay = {
  DAY: '주간 12:00-18:00',
  NIGHT: '야간 18:00-23:00',
  ALL: '주야간 12:00-23:00',
};

// 재사용 가능한 시간 필터 컴포넌트
const TimeFilter = ({ onSelect, selectedKey }) => {
  return (
    <div className="flex w-full gap-2 py-3">
      {Object.entries(timeFilters).map(([key, name]) => (
        <button
          key={key}
          type="button"
          onClick={() => onSelect(key)}
          className={`flex-1 px-2 py-2 text-xs font-bold rounded-lg transition-all duration-200 ${
            selectedKey === key 
            ? 'bg-blue-600 text-white shadow-lg' 
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {name}
        </button>
      ))}
    </div>
  );
};

// Chevron Right 아이콘
const ChevronIcon = () => (
  <svg className="w-6 h-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);


function BoothList({
  isVisible, onClose, onOpen, booths,
  categoryConfig, selectedMainCategory,
}) {
  const [detailViewKey, setDetailViewKey] = useState(null);
  const [drillDownCategory, setDrillDownCategory] = useState(null);
  const [activeTimeFilter, setActiveTimeFilter] = useState('TOTAL');

  useEffect(() => {
    setDetailViewKey(null);
    setDrillDownCategory(null);
    setActiveTimeFilter('TOTAL');
  }, [selectedMainCategory]);
  
  useEffect(() => {
    if (detailViewKey) {
      setActiveTimeFilter('TOTAL');
    }
  }, [detailViewKey]);

  const handleBack = () => {
    if (detailViewKey) setDetailViewKey(null);
    else if (drillDownCategory) setDrillDownCategory(null);
  };

  const summaryItems = useMemo(() => {
    if (!booths) return [];
    if (selectedMainCategory === 'ALL' && !drillDownCategory) {
      return Object.values(categoryConfig).filter(config => !config.parent);
    }
    const targetMainCategory = drillDownCategory || selectedMainCategory;
    const relevantBooths = booths.filter(b => b.mainCategory === targetMainCategory);
    const groups = relevantBooths.reduce((acc, booth) => {
      if (!booth.subCategory) return acc;
      if (!acc[booth.subCategory]) {
        acc[booth.subCategory] = {
          key: booth.subCategory,
          name: categoryConfig[booth.subCategory]?.name || booth.subCategory,
        };
      }
      return acc;
    }, {});
    return Object.values(groups);
  }, [booths, categoryConfig, selectedMainCategory, drillDownCategory]);

  const detailBooths = useMemo(() => {
    if (!detailViewKey) return [];
    const allInCategory = booths.filter(booth => booth.subCategory === detailViewKey);
    const categoryFiltered = allInCategory.filter(b => !b.description?.includes("목록 보러가기"));
    const parentCategory = categoryConfig[detailViewKey]?.parent;

    if (parentCategory !== 'BOOTH') return categoryFiltered;

    switch (activeTimeFilter) {
      case 'DAY': return categoryFiltered.filter(b => b.operationTime === 'DAY' || b.operationTime === 'ALL');
      case 'NIGHT': return categoryFiltered.filter(b => b.operationTime === 'NIGHT' || b.operationTime === 'ALL');
      case 'ALL': return categoryFiltered.filter(b => b.operationTime === 'ALL');
      default: return categoryFiltered;
    }
  }, [booths, detailViewKey, activeTimeFilter, categoryConfig]);

  const renderContent = () => {
    if (detailViewKey) {
      const parentCategory = categoryConfig[detailViewKey]?.parent;
      return (
        <div className="px-1">
          {parentCategory === 'BOOTH' && <TimeFilter onSelect={setActiveTimeFilter} selectedKey={activeTimeFilter} />}
          {detailBooths.length > 0 ? (
            <div className="space-y-2">
            {detailBooths.map(booth => (
              <div key={booth.id} className="bg-white rounded-lg p-4 shadow">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h3 className="font-bold text-gray-800 text-md">{booth.name}</h3>
                  {booth.mainCategory === 'BOOTH' && booth.operationTime && (
                    <span className={`px-2 py-0.5 text-[11px] font-bold rounded-full text-white ${
                      booth.operationTime === 'DAY' ? 'bg-blue-500' :
                      booth.operationTime === 'NIGHT' ? 'bg-purple-600' : 'bg-green-600'
                    }`}>
                      {timeDisplay[booth.operationTime].split(' ')[0]}
                    </span>
                  )}
                  {booth.mainCategory !== 'BOOTH' && booth.scheduleText && (
                    <span className="px-2 py-0.5 text-[11px] font-bold rounded-full text-white bg-gray-500">
                      {booth.scheduleText}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600">{booth.description || '내용 없음'}</p>
              </div>
            ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 pt-16">선택한 조건에 맞는 부스가 없습니다.</p>
          )}
        </div>
      );
    }

    if (summaryItems.length === 0) {
      return <p className="text-center text-gray-500 pt-16">표시할 부스가 없습니다.</p>;
    }

    return (
      <div className="space-y-2 px-1">
        {summaryItems.map(item => (
          <div 
            key={item.key} 
            onClick={() => {
              if (selectedMainCategory === 'ALL' && !drillDownCategory) setDrillDownCategory(item.key);
              else setDetailViewKey(item.key);
            }} 
            className="bg-white p-4 rounded-lg shadow cursor-pointer flex justify-between items-center hover:bg-gray-50 active:scale-[0.98] transition-all"
          >
            <h3 className="font-bold text-gray-800 text-md">{item.name}</h3>
            <ChevronIcon />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 h-[65%] max-h-[600px] bg-gray-50 rounded-t-2xl shadow-[0_-8px_30px_rgba(0,0,0,0.15)] transition-transform duration-300 ease-in-out z-20 ${
        isVisible ? 'translate-y-0' : 'translate-y-[calc(100%-70px)]'
      }`}
      onClick={() => !isVisible && onOpen()}
    >
      <div
        onClick={(e) => { if (isVisible && !detailViewKey && !drillDownCategory) { e.stopPropagation(); onClose(); } }}
        className={`w-full h-[70px] p-3 box-border flex items-center justify-center relative ${
          (detailViewKey || drillDownCategory) ? '' : 'cursor-grab active:cursor-grabbing'
        }`}
      >
        {(detailViewKey || drillDownCategory) && (
          // ✅ 수정된 뒤로가기 버튼 SVG와 스타일
          <button type="button" onClick={handleBack} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-none border-none text-gray-700 cursor-pointer flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
        <div className={`w-10 h-1 bg-gray-300 rounded-full absolute top-3 left-1/2 -translate-x-1/2 ${
          (detailViewKey || drillDownCategory) ? 'hidden' : 'block'
        }`} />
        <p className="m-0 font-extrabold text-lg text-gray-700 pt-3">
          {detailViewKey
            ? categoryConfig[detailViewKey]?.name
            : drillDownCategory
            ? categoryConfig[drillDownCategory]?.name
            : categoryConfig[selectedMainCategory]?.name || "전체 목록"}
        </p>
      </div>
      <div className="overflow-y-auto h-[calc(100%-70px)] px-4 pb-4">
        {renderContent()}
      </div>
    </div>
  );
}

export default BoothList;