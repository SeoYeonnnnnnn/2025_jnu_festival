import React, { useState, useEffect, useMemo, useRef } from 'react';

// 운영 시간 필터 옵션
const timeFilters = {
  TOTAL: '전체',
  DAY: '주간  5.18광장(봉지)',
  NIGHT: '야간  후문 일대(용지 앞)',
  ALL: '주야간  후문 일대(용지 앞)',
};

// 운영 시간 표시 텍스트
const timeDisplay = {
  DAY: '주간 12:00-18:00',
  NIGHT: '야간 18:00-23:00',
  ALL: '주야간 12:00-23:00',
};

function BoothList({
  isVisible, onClose, onOpen, booths,
  categoryConfig, selectedMainCategory,
}) {
  const listRef = useRef(null);
  const [detailViewKey, setDetailViewKey] = useState(null); // 상세 목록 뷰 (subCategory)
  const [drillDownCategory, setDrillDownCategory] = useState(null); // '전체' 모드에서 선택한 대분류
  const [activeTimeFilter, setActiveTimeFilter] = useState('TOTAL');

  // 상위 필터가 바뀌면 내부 상태를 모두 초기화합니다.
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
    if (detailViewKey) {
      setDetailViewKey(null); // 상세 목록 -> 요약 목록
    } else if (drillDownCategory) {
      setDrillDownCategory(null); // '전체' 모드의 하위 목록 -> '전체' 모드의 최상위 목록
    }
  };

  // 1단계 또는 2단계 요약 목록 생성
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

  // 3단계 상세 목록 생성
  const detailBooths = useMemo(() => {
    if (!detailViewKey) return [];
    
    const allInCategory = booths.filter(booth => booth.subCategory === detailViewKey);
    const categoryFiltered = allInCategory.filter(b => !b.description?.includes("목록 보러가기"));

    const parentCategory = categoryConfig[detailViewKey]?.parent;
    if (parentCategory !== 'BOOTH') {
      return categoryFiltered;
    }

    switch (activeTimeFilter) {
      case 'DAY': return categoryFiltered.filter(b => b.operationTime === 'DAY' || b.operationTime === 'ALL');
      case 'NIGHT': return categoryFiltered.filter(b => b.operationTime === 'NIGHT' || b.operationTime === 'ALL');
      case 'ALL': return categoryFiltered.filter(b => b.operationTime === 'ALL');
      default: return categoryFiltered;
    }
  }, [booths, detailViewKey, activeTimeFilter, categoryConfig]);


  const renderContent = () => {
    // 3단계: 상세 목록
    if (detailViewKey) {
      const parentCategory = categoryConfig[detailViewKey]?.parent;
      return (
        <>
          {parentCategory === 'BOOTH' && (
              <div style={styles.timeFilterContainer}>
                {Object.entries(timeFilters).map(([key, name]) => (
                  <button key={key} type="button" onClick={() => setActiveTimeFilter(key)}
                    style={{ ...styles.timeFilterButton, ...(activeTimeFilter === key ? styles.timeFilterButtonActive : {}) }}>
                    {name}
                  </button>
                ))}
              </div>
          )}

          {detailBooths.length > 0
            ? detailBooths.map(booth => (
                <div key={booth.id} style={styles.boothItem}>
                  <div style={styles.boothTitleContainer}>
                    <h3 style={styles.boothTitle}>{booth.name}</h3>
                    {/* ▼▼▼ 카테고리에 따라 시간 표시 방식 변경 ▼▼▼ */}
                    {booth.mainCategory === 'BOOTH' && booth.operationTime && (
                      <span style={{...styles.timeBadge, ...styles[booth.operationTime]}}>
                        {timeDisplay[booth.operationTime]}
                      </span>
                    )}
                    {booth.mainCategory !== 'BOOTH' && booth.scheduleText && (
                      <span style={{...styles.timeBadge, ...styles.customTimeBadge}}>
                        {booth.scheduleText}
                      </span>
                    )}
                    {/* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */}
                  </div>
                  <p style={styles.boothDescription}>{booth.description || '내용 없음'}</p>
                </div>
              ))
            : <p style={styles.emptyMessage}>선택한 조건에 맞는 부스가 없습니다.</p>
          }
        </>
      );
    }
    
    // 1 & 2단계: 요약 목록
    if (summaryItems.length === 0) {
      return <p style={styles.emptyMessage}>표시할 부스가 없습니다.</p>;
    }
    return summaryItems.map(item => (
      <div 
        key={item.key} 
        onClick={() => {
          if (selectedMainCategory === 'ALL' && !drillDownCategory) {
            setDrillDownCategory(item.key);
          } else {
            setDetailViewKey(item.key);
          }
        }} 
        style={styles.summaryItem}
      >
        <h3 style={styles.summaryTitle}>{item.name}</h3>
        <span style={styles.summaryCount}>&gt;</span>
      </div>
    ));
  };

  return (
    <div
      style={{ ...styles.container, transform: isVisible ? 'translateY(0)' : `translateY(calc(100% - 70px))` }}
      onClick={() => !isVisible && onOpen()}
    >
      <div
        onClick={(e) => { if (isVisible && !detailViewKey && !drillDownCategory) { e.stopPropagation(); onClose(); } }}
        style={{...styles.header, cursor: (detailViewKey || drillDownCategory) ? 'default' : 'pointer'}}
      >
        { (detailViewKey || drillDownCategory) && (
          <button type="button" onClick={handleBack} style={styles.backButton}>
             &larr; 이전
          </button>
        )}
        <div style={{...styles.handle, display: (detailViewKey || drillDownCategory) ? 'none' : 'block' }} />
        <p style={styles.title}>
          { detailViewKey
            ? categoryConfig[detailViewKey]?.name
            : drillDownCategory
            ? categoryConfig[drillDownCategory]?.name
            : categoryConfig[selectedMainCategory]?.name || "전체 목록"
          }
        </p>
      </div>
      <div style={{...styles.contentArea, paddingTop: (detailViewKey && categoryConfig[detailViewKey]?.parent !== 'BOOTH') ? '12px' : '0' }}>
        {renderContent()}
      </div>
    </div>
  );
}

// 스타일 객체
const styles = {
  container: {
    position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%',
    backgroundColor: 'white', borderTopLeftRadius: '20px', borderTopRightRadius: '20px',
    boxShadow: '0 -4px 12px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s ease-in-out', zIndex: 20,
    cursor: 'default',
  },
  header: {
    width: '100%', height: '70px', padding: '12px',
    textAlign: 'center', boxSizing: 'border-box',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    position: 'relative',
  },
  handle: {
    width: '40px', height: '4px', backgroundColor: '#d0d0d0',
    borderRadius: '2px', position: 'absolute', top: '12px',
    left: '50%', transform: 'translateX(-50%)'
  },
  title: {
    margin: 0, fontWeight: 'bold', fontSize: '16px', color: '#555', paddingTop: '10px'
  },
  contentArea: {
    overflowY: 'auto', height: `calc(100% - 70px)`, padding: '0 16px',
  },
  emptyMessage: {
    textAlign: 'center', color: '#666', paddingTop: '40px',
  },
  summaryItem: {
    padding: '16px 12px', borderBottom: '1px solid #eee', cursor: 'pointer',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
  },
  summaryTitle: { margin: 0, fontWeight: 'bold', fontSize: '16px' },
  summaryCount: { color: '#1a73e8', fontWeight: 'bold', fontSize: '20px' },
  backButton: {
    position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)',
    background: 'none', border: 'none', color: '#1a73e8',
    cursor: 'pointer', fontWeight: 'bold', fontSize: '15px'
  },
  timeFilterContainer: {
    display: 'flex', gap: '8px', padding: '12px 0',
    borderBottom: '1px solid #eee',
  },
  timeFilterButton: {
    flex: 1, padding: '8px 12px', borderRadius: '8px',
    border: '1px solid #ccc', backgroundColor: '#f0f0f0',
    color: '#333', cursor: 'pointer', fontSize: '12px',
  },
  timeFilterButtonActive: {
    backgroundColor: '#1a73e8', color: 'white',
    borderColor: '#1a73e8', fontWeight: 'bold',
  },
  boothItem: {
    padding: '16px 0', borderBottom: '1px solid #eee',
  },
  boothTitleContainer: {
    display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap',
  },
  boothTitle: { margin: 0, fontWeight: 'bold' },
  boothDescription: { margin: '8px 0 0', color: '#666', fontSize: '14px' },
  timeBadge: {
    padding: '2px 8px', borderRadius: '12px', fontSize: '12px',
    fontWeight: 'bold', color: 'white', whiteSpace: 'nowrap',
  },
  DAY: { backgroundColor: '#4285F4' },
  NIGHT: { backgroundColor: '#7B1FA2' },
  ALL: { backgroundColor: '#34A853' },
  customTimeBadge: { backgroundColor: '#6c757d' }, // 커스텀 시간 뱃지 스타일 추가
};

export default BoothList;

