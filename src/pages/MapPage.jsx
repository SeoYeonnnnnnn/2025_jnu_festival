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
    
    const [activeFilter, setActiveFilter] = useState('ALL'); 
    const [listActiveFilter, setListActiveFilter] = useState('ALL'); 

    // ▼▼▼ [수정] 지도 마커 필터링 로직 변경 ▼▼▼
    const visibleMarkers = useMemo(() => {
        return allMarkers.filter(marker => {
            // 줌 레벨에 따른 필터링은 그대로 유지합니다.
            const [minZoom, maxZoom] = marker.displayZoom || [0, 14];
            if (currentZoom < minZoom || currentZoom > maxZoom) {
                return false;
            }
            // activeFilter(상단 필터)와 상관없이 항상 모든 마커를 지도에 표시합니다.
            return true; 
        });
    }, [allMarkers, currentZoom]); // 의존성 배열에서 activeFilter 제거

    const listBooths = useMemo(() => {
        return allMarkers.filter(marker => marker.mainCategory !== 'SUPPORT');
    }, [allMarkers]);

    const handleFilterChange = useCallback((filterKey) => {
        const newFilter = activeFilter === filterKey ? 'ALL' : filterKey;
        setActiveFilter(newFilter);
        
        const isSupportFilter = CATEGORY_CONFIG[filterKey]?.parent === 'SUPPORT';
        if (isSupportFilter) {
            return;
        } 
        
        setListActiveFilter(newFilter);
        
        if (newFilter !== 'ALL') {
            setIsSheetOpen(true);
        } else {
            setIsSheetOpen(false);
        }
    }, [activeFilter]);

    const handleMarkerClick = useCallback((markerData) => {
        if (markerData.mainCategory === 'SUPPORT') {
            return; 
        }
        setListActiveFilter(markerData.mainCategory);
        setIsSheetOpen(true);
    }, []);

    const handleMapClick = useCallback(() => {
        setIsSheetOpen(false);
    }, []);

    const handleGoHome = useCallback(() => {
        navigate('/');
    }, [navigate]);

    const displayableCategoryConfig = useMemo(() => {
        const filteredConfig = {};
        for (const key in CATEGORY_CONFIG) {
            if (CATEGORY_CONFIG[key].parent !== 'SUPPORT') {
                filteredConfig[key] = CATEGORY_CONFIG[key];
            }
        }
        return filteredConfig;
    }, []);

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
                    categoryConfig={displayableCategoryConfig}
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
                selectedMainCategory={listActiveFilter}
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