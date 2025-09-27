import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
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
    
    // ⭐️ 지도상 마커를 필터링하는 상태 (기존 activeFilter)
    const [activeFilter, setActiveFilter] = useState('ALL'); 
    
    // ⭐️ 하단 부스 목록의 내용을 필터링하는 상태 (새로 추가)
    const [listActiveFilter, setListActiveFilter] = useState('ALL'); 
    
    const [selectedMarkerId, setSelectedMarkerId] = useState(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState('ALL');
    const [detailViewKey, setDetailViewKey] = useState(null);

    // 1. 지도에 표시될 마커 목록 (activeFilter 사용)
    const visibleMarkers = useMemo(() => {
        return allMarkers.filter(marker => {
            const [minZoom, maxZoom] = marker.displayZoom || [0, 14];
            if (currentZoom < minZoom || currentZoom > maxZoom) return false;

            const filterConfig = CATEGORY_CONFIG[activeFilter];
            
            // SUPPORT 계열 필터가 활성화된 경우: 해당 서브 카테고리만 표시
            if (filterConfig?.parent === 'SUPPORT') {
                return marker.subCategory === activeFilter;
            }
            
            // 기타 필터: 필터와 일치하거나, 항상 표시되어야 하는 SUPPORT 항목 표시
            const matchesFilter = activeFilter === 'ALL' || marker.mainCategory === activeFilter;
            const isSupportItem = marker.mainCategory === 'SUPPORT';
            return matchesFilter || isSupportItem;
        });
    }, [allMarkers, currentZoom, activeFilter]);

    // 2. 하단 목록에 표시될 부스 데이터 (listActiveFilter 사용)
    const listBooths = useMemo(() => {
        const boothMarkers = allMarkers.filter(marker => marker.type === 'BOOTH');
        
        // SUPPORT 항목은 하단 목록에서 제외
        let filteredList = boothMarkers.filter(marker => marker.mainCategory !== 'SUPPORT');

        // listActiveFilter가 ALL이 아닐 경우 필터링
        if (listActiveFilter !== 'ALL') {
             // listActiveFilter는 SUPPORT 계열이 아닌 것만 담고 있으므로 바로 mainCategory로 필터링
            return filteredList.filter(marker => marker.mainCategory === listActiveFilter);
        }

        return filteredList;
    }, [allMarkers, listActiveFilter]);


    // 3. 필터 변경 핸들러 (activeFilter 및 listActiveFilter 관리)
    const handleFilterChange = useCallback((filterKey) => {
        const newFilter = activeFilter === filterKey ? 'ALL' : filterKey;
        setActiveFilter(newFilter); // 맵 필터는 항상 변경
        setDetailViewKey(null);
        setSelectedSubCategory('ALL');
        
        const filterConfig = CATEGORY_CONFIG[filterKey];
        const isSupportFilter = filterKey === 'SUPPORT' || filterConfig?.parent === 'SUPPORT';
        
        // SUPPORT 계열 필터가 선택되거나 해제될 경우: 
        if (isSupportFilter) {
            // isSheetOpen과 listActiveFilter는 현재 상태를 유지합니다.
            // listActiveFilter 변경 없음 -> 하단 바 내용 유지
            return;
        } 
        
        // ⭐️ SUPPORT 외 필터가 선택되거나 해제될 경우: listActiveFilter를 업데이트합니다.
        setListActiveFilter(newFilter);

        // 하단 바 상태 변경 (SUPPORT 외 필터에서만 작동)
        if (newFilter !== 'ALL') {
            setIsSheetOpen(true);
        } else if (activeFilter !== 'ALL' && newFilter === 'ALL') {
            setIsSheetOpen(false);
        }
    }, [activeFilter]);

    // 4. 마커 클릭 핸들러
    const handleMarkerClick = useCallback((markerData) => {
        
        // SUPPORT 마커를 클릭했을 경우: 하단 바 관련 상태는 일절 건드리지 않고 함수를 종료합니다.
        if (markerData.mainCategory === 'SUPPORT') {
            return; // isSheetOpen, listActiveFilter 상태 유지
        }

        // SUPPORT가 아닌 부스/콘텐츠 마커인 경우에만 목록을 열고 상태 업데이트
        setSelectedMarkerId(markerData.id);
        setActiveFilter(markerData.mainCategory);
        // ⭐️ listActiveFilter도 업데이트
        setListActiveFilter(markerData.mainCategory);
        setDetailViewKey(markerData.subCategory);
        setIsSheetOpen(true);
    }, []);

    const handleMapClick = useCallback(() => {
        if (isSheetOpen) {
            setIsSheetOpen(false);
        }
    }, [isSheetOpen]);

    const handleGoHome = useCallback(() => {
        navigate('/');
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
                booths={listBooths} // listBooths는 이제 listActiveFilter에 의해 필터링됩니다.
                categoryConfig={CATEGORY_CONFIG}
                selectedMainCategory={listActiveFilter} // ⭐️ 목록은 listActiveFilter를 기준으로 내용 표시
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