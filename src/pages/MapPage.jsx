import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
// 1. 다른 파일들을 불러올 수 있도록 경로와 확장자를 정확하게 수정했습니다.
import MapComponent from '../components/MapComponent.jsx';
import BoothList from '../components/BoothList.jsx';
import FilterControls from '../components/FilterControls.jsx';
import './MapPage.css';
import { FESTIVAL_DATA } from '../data/FestivalData.js';
import { CATEGORY_CONFIG } from '../config/CategoryConfig.js';

function MapPage() {
  const navigate = useNavigate();
  const [allMarkers] = useState(FESTIVAL_DATA);
  const [currentZoom, setCurrentZoom] = useState(5);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [selectedMarkerId, setSelectedMarkerId] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState('ALL');
  // BoothList의 상세 뷰 상태를 MapPage에서 관리하여 핀 클릭과 연동합니다.
  const [detailViewKey, setDetailViewKey] = useState(null);

  // 지도에 표시될 마커들을 필터링합니다 (지도용 데이터).
  const visibleMarkers = useMemo(() => {
    return allMarkers.filter(marker => {
      const [minZoom, maxZoom] = marker.displayZoom || [0, 14];
      if (currentZoom < minZoom || currentZoom > maxZoom) return false;

      const filterConfig = CATEGORY_CONFIG[activeFilter];
      if (filterConfig?.parent === 'SUPPORT') {
        return marker.subCategory === activeFilter;
      }
      
      const matchesFilter = activeFilter === 'ALL' || marker.mainCategory === activeFilter;
      const isSupportItem = marker.mainCategory === 'SUPPORT';
      return matchesFilter || isSupportItem;
    });
  }, [allMarkers, currentZoom, activeFilter]);

  // 하단 목록에 표시될 부스들을 필터링합니다 (목록용 데이터).
  const listBooths = useMemo(() => {
    const boothMarkers = allMarkers.filter(marker => marker.type === 'BOOTH');
    const filterConfig = CATEGORY_CONFIG[activeFilter];
    if (filterConfig?.parent === 'SUPPORT') {
        return boothMarkers.filter(marker => marker.subCategory === activeFilter);
    }
    if (activeFilter === 'ALL') {
        return boothMarkers.filter(marker => marker.mainCategory !== 'SUPPORT');
    } else {
        return boothMarkers.filter(marker => marker.mainCategory === activeFilter);
    }
  }, [allMarkers, activeFilter]);

  // 2. 불필요한 재실행을 막기 위해 모든 핸들러 함수를 useCallback으로 감싸줍니다.
  const handleFilterChange = useCallback((filterKey) => {
    const newFilter = activeFilter === filterKey ? 'ALL' : filterKey;
    setActiveFilter(newFilter);
    setDetailViewKey(null); // 필터 변경 시 상세 뷰 닫기
    setSelectedSubCategory('ALL');
    if (newFilter !== 'ALL') {
      setIsSheetOpen(true);
    } else {
      setIsSheetOpen(false);
    }
  }, [activeFilter]);

  // 3. 핀 클릭 시, 해당 핀의 카테고리로 하단 바가 바로 열리도록 수정했습니다.
  const handleMarkerClick = useCallback((markerData) => {
    setSelectedMarkerId(markerData.id);
    setActiveFilter(markerData.mainCategory);
    setDetailViewKey(markerData.subCategory);
    setIsSheetOpen(true);
  }, []);

  const handleMapClick = useCallback(() => {
    if (isSheetOpen) {
      setIsSheetOpen(false);
    }
  }, [isSheetOpen]);

  const handleGoHome = useCallback(() => {
    navigate('/'); // 홈으로 가도록 경로 수정
  }, [navigate]);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      
      <div style={styles.headerContainer}>
        <button type="button" onClick={handleGoHome} style={styles.backButton}>
          <svg width="24" height="24" viewBox="0 0 24 24"><path d="M15 18L9 12L15 6" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <h1 style={styles.headerTitle}>지도</h1>
      </div>

      <div style={styles.filterContainer}>
        <FilterControls
          categoryConfig={CATEGORY_CONFIG}
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
        />
      </div>

      <MapComponent
        markers={visibleMarkers}
        categoryConfig={CATEGORY_CONFIG}
        onMarkerClick={handleMarkerClick}
        onZoomChange={setCurrentZoom}
        isSheetOpen={isSheetOpen}
        onMapClick={handleMapClick}
      />
      <BoothList
        isVisible={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        onOpen={() => setIsSheetOpen(true)}
        booths={listBooths}
        categoryConfig={CATEGORY_CONFIG}
        selectedMainCategory={activeFilter}
        selectedSubCategory={selectedSubCategory}
        setSelectedSubCategory={setSelectedSubCategory}
        selectedMarkerId={selectedMarkerId}
        detailViewKey={detailViewKey}
        setDetailViewKey={setDetailViewKey}
      />
    </div>
  );
}

const styles = {
  headerContainer: {
    position: 'absolute', top: 0, left: 0, right: 0,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    height: '56px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
    zIndex: 20,
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  backButton: {
    position: 'absolute', left: '16px', background: 'none',
    border: 'none', cursor: 'pointer', padding: 0,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  headerTitle: {
    margin: 0, fontSize: '18px', fontWeight: 'bold',
  },
  filterContainer: {
    position: 'absolute', top: '56px', left: 0, right: 0,
    zIndex: 10,
  },
};

export default MapPage;