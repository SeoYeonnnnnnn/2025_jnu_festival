import React, { useState, useEffect, useMemo, useCallback } from 'react';

// 운영 시간 필터 옵션
const timeFilters = {
  TOTAL: '전체',
  DAY: '주간 12:00-18:00',
  NIGHT: '야간 18:00-23:00',
  ALL: '주야간 12:00-23:00',
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

// --- 이미지 갤러리 모달 컴포넌트 (전체 화면을 덮음) ---
const ImageModal = ({ images, initialIndex, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    const nextImage = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    }, [images.length]);

    const prevImage = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    }, [images.length]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') onClose();
            else if (event.key === 'ArrowRight') nextImage();
            else if (event.key === 'ArrowLeft') prevImage();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose, nextImage, prevImage]);
    
    // 이미지 파일명 앞에 경로 접두사를 붙여야 합니다. (예: /public/assets)
    const imagePath = `/assets/${images[currentIndex]}`;

    return (
        <div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm" 
            onClick={onClose}
        >
            <div 
                className="relative w-full max-w-xl max-h-full" 
                onClick={(e) => e.stopPropagation()}
            >
                {/* 닫기 버튼 */}
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white text-3xl z-10 p-2 bg-black/50 rounded-full hover:bg-black/70 transition"
                >
                    &times;
                </button>

                {/* 메인 이미지 */}
                <img 
                    src={imagePath} 
                    alt={`Gallery ${currentIndex + 1}`} 
                    className="w-full max-h-[80vh] object-contain rounded-lg"
                    onError={(e) => { e.target.style.display = 'none'; e.target.parentNode.style.display = 'none'; }}
                />

                {/* 이전/다음 버튼 */}
                {images.length > 1 && (
                    <>
                        <button 
                            onClick={(e) => { e.stopPropagation(); prevImage(); }}
                            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white text-3xl bg-black/50 rounded-full hover:bg-black/70 transition"
                        >
                            &lt;
                        </button>
                        <button 
                            onClick={(e) => { e.stopPropagation(); nextImage(); }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white text-3xl bg-black/50 rounded-full hover:bg-black/70 transition"
                        >
                            &gt;
                        </button>
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black/50 px-3 py-1 rounded-full text-sm font-semibold">
                            {currentIndex + 1} / {images.length}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
// ---------------------------------------------


function BoothList({
  isVisible, onClose, onOpen, booths,
  categoryConfig, selectedMainCategory,
}) {
  // 1. STATE 정의 (최상위)
  const [detailViewKey, setDetailViewKey] = useState(null);
  const [drillDownCategory, setDrillDownCategory] = useState(null);
  const [activeTimeFilter, setActiveTimeFilter] = useState('TOTAL');
  const [ultimateDetailBooth, setUltimateDetailBooth] = useState(null); 
  const [modalImageIndex, setModalImageIndex] = useState(null); 

  // 2. EFFECT 정의 (최상위)
  // ⭐️ selectedMainCategory(listActiveFilter)가 변경될 때만 목록 상태 초기화
  useEffect(() => {
    // listActiveFilter가 ALL이 아닌 경우만 초기화 (ALL일 경우 isSheetOpen=false이므로 의미 없음)
    if (selectedMainCategory !== 'ALL') {
        setDetailViewKey(null);
        setDrillDownCategory(null);
        setUltimateDetailBooth(null);
        setActiveTimeFilter('TOTAL');
    }
  }, [selectedMainCategory]);
  
  useEffect(() => {
    if (detailViewKey) {
      setUltimateDetailBooth(null);
      setActiveTimeFilter('TOTAL');
    }
  }, [detailViewKey]);
  
  // 뒤로가기 로직
  const handleBack = () => {
    if (ultimateDetailBooth) setUltimateDetailBooth(null);
    else if (detailViewKey) setDetailViewKey(null);
    else if (drillDownCategory) setDrillDownCategory(null);
  };

  // 3. MEMOIZED 값 정의 (최상위 - Hooks 규칙 준수)
    
  // SummaryItems 계산
  const summaryItems = useMemo(() => {
    if (!booths) return [];
    
    // ALL 필터일 경우 메인 카테고리 목록 표시
    if (selectedMainCategory === 'ALL' && !drillDownCategory) {
      return Object.values(categoryConfig).filter(config => !config.parent && config.key !== 'SUPPORT');
    }
    
    // 선택된 메인 카테고리의 서브 카테고리 목록 표시
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


  // DetailBooths 계산
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

  // Ultimate Detail ImageList 계산
  const memoizedImageList = useMemo(() => {
    if (!ultimateDetailBooth) return [];
    
    const booth = ultimateDetailBooth;
    if (booth.images && Array.isArray(booth.images)) return booth.images;
    if (booth.image && typeof booth.image === 'string') return [booth.image];
    return [];
  }, [ultimateDetailBooth]);

  // HeaderTitle 계산
  const headerTitle = useMemo(() => {
    if (ultimateDetailBooth) return ultimateDetailBooth.name;
    
    // ⭐️ 이제 selectedMainCategory는 listActiveFilter이므로, SUPPORT가 될 일이 없습니다.
    // 기존의 SUPPORT 관련 제목 로직은 제거합니다.

    if (detailViewKey) return categoryConfig[detailViewKey]?.name;
    if (drillDownCategory) return categoryConfig[drillDownCategory]?.name;
    return categoryConfig[selectedMainCategory]?.name || "전체 목록";
  }, [ultimateDetailBooth, detailViewKey, drillDownCategory, selectedMainCategory, categoryConfig]);


  // Ultimate Detail View 렌더링 함수 (레이아웃 수정)
  const renderUltimateDetail = () => {
    if (!ultimateDetailBooth) return null;
    
    const booth = ultimateDetailBooth;
    const imageList = memoizedImageList; 
    
    // 갤러리 렌더링 함수
    const renderGallery = () => {
        if (imageList.length === 0) return null;
        
        return (
            // 이미지 영역
            <div className="pt-4 pb-2 border-t border-gray-100">
                {/* 썸네일 가로 스크롤 영역 */}
                <div className="flex overflow-x-auto space-x-3 pb-2 custom-scrollbar"> 
                    {imageList.map((imgName, index) => (
                        <div
                            key={index}
                            onClick={() => setModalImageIndex(index)}
                            className="flex-shrink-0 w-32 h-32 md:w-40 md:h-40 bg-gray-200 rounded-lg overflow-hidden shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-200"
                        >
                            <img 
                                src={`/assets/${imgName}`} 
                                alt={`썸네일 ${index + 1}`} 
                                className="w-full h-full object-cover"
                                onError={(e) => { e.target.style.display = 'none'; }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    
    // ⭐️ 모든 내용을 하나의 카드 컨테이너에 담고 순차적으로 나열
    return (
      <div className="p-1">
            <div className="bg-white rounded-xl shadow-lg p-4 space-y-3">
                
                {/* 1. 이름 + 설명 (Description) */}
                <div className="space-y-2">
                    <h2 className="text-2xl font-extrabold text-gray-900">{booth.name}</h2>
                    {booth.description && (
                        <p className="text-gray-700 text-base">{booth.description}</p>
                    )}
                </div>
                
                {/* 2. 운영 정보 (이름과 설명 아래) */}
                <div className="pt-3 border-t border-gray-200 space-y-2 text-sm text-gray-600">
                    <h3 className="text-lg font-bold text-gray-800 pb-1">운영 정보</h3>
                  {booth.location && (
                    <div className="flex items-center">
                      <span className="w-5 text-center mr-2">📍</span> <span className='font-medium'>{booth.location}</span>
                    </div>
                  )}
                  {booth.operationTime && timeDisplay[booth.operationTime] && (
                    <div className="flex items-center">
                      <span className="w-5 text-center mr-2">🕒</span> <span className='font-medium'>{timeDisplay[booth.operationTime]}</span>
                    </div>
                  )}
                  {booth.scheduleText && (
                    <div className="flex items-center">
                      <span className="w-5 text-center mr-2">⏰</span> <span className='font-medium'>{booth.scheduleText}</span>
                    </div>
                  )}
                </div>
                
                {/* 3. 이미지 갤러리 (운영 정보 아래) */}
                {imageList.length > 0 && renderGallery()}

            </div>
          </div>
    );
  };


  const renderContent = () => {
    // 3. Ultimate Detail View
    if (ultimateDetailBooth) {
      return renderUltimateDetail();
    }

    // 2. Detail View (개별 부스 목록)
    if (detailViewKey) {
      const parentCategory = categoryConfig[detailViewKey]?.parent;
      return (
        <div className="px-1">
          {parentCategory === 'BOOTH' && <TimeFilter onSelect={setActiveTimeFilter} selectedKey={activeTimeFilter} />}
          {detailBooths.length > 0 ? (
            <div className="space-y-2">
            {detailBooths.map(booth => (
              <div 
                key={booth.id} 
                onClick={() => setUltimateDetailBooth(booth)} 
                className="bg-white rounded-lg p-4 shadow cursor-pointer flex justify-between items-center hover:bg-gray-50 active:scale-[0.99] transition-all"
              >
                <div>
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
                <ChevronIcon />
              </div>
            ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 pt-16">선택한 조건에 맞는 부스가 없습니다.</p>
          )}
        </div>
      );
    }

    // 1. Summary View (카테고리 목록)
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
    <div className="relative">
        {/* 모달 렌더링 */}
        {modalImageIndex !== null && ultimateDetailBooth && (
            <ImageModal 
                images={memoizedImageList} 
                initialIndex={modalImageIndex}
                onClose={() => setModalImageIndex(null)}
            />
        )}

        {/* 메인 BoothList UI (하단 고정 바 - z-index: 20) */}
        <div
          className={`fixed bottom-0 left-0 right-0 h-[65%] max-h-[600px] bg-gray-50 rounded-t-2xl shadow-[0_-8px_30px_rgba(0,0,0,0.15)] transition-transform duration-300 ease-in-out z-20 ${
            isVisible ? 'translate-y-0' : 'translate-y-[calc(100%-70px)]'
          }`}
          onClick={() => !isVisible && onOpen()} 
        >
          <div
            onClick={(e) => { 
              if (isVisible && !detailViewKey && !drillDownCategory && !ultimateDetailBooth) { 
                e.stopPropagation(); onClose(); 
              } 
            }}
            className={`w-full h-[70px] p-3 box-border flex items-center justify-center relative ${
              (detailViewKey || drillDownCategory || ultimateDetailBooth) ? '' : 'cursor-grab active:cursor-grabbing'
            }`}
          >
            {/* 뒤로가기 버튼 */}
            {(detailViewKey || drillDownCategory || ultimateDetailBooth) && (
              <button type="button" onClick={handleBack} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-none border-none text-gray-700 cursor-pointer flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            )}
            {/* 드래그 핸들러 */}
            <div className={`w-10 h-1 bg-gray-300 rounded-full absolute top-3 left-1/2 -translate-x-1/2 ${
              (detailViewKey || drillDownCategory || ultimateDetailBooth) ? 'hidden' : 'block'
            }`} />
            {/* 타이틀 */}
            <p className="m-0 font-extrabold text-lg text-gray-700 pt-3">
              {headerTitle}
            </p>
          </div>
          {/* 콘텐츠 영역 */}
          <div className="overflow-y-auto h-[calc(100%-70px)] px-4 pb-4">
            {renderContent()}
          </div>
        </div>
    </div>
  );
}

export default BoothList;