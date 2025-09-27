// src/pages/MapPage.jsx

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import MapComponent from '../components/MapComponent';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import BoothList from '../components/BoothList';
import FilterControls from '../components/FilterControls';
import './MapPage.css';
import { FESTIVAL_DATA } from '../data/FestivalData';
import { CATEGORY_CONFIG } from '../config/CategoryConfig';

function MapPage() {
  const navigate = useNavigate();
  const [allMarkers] = useState(FESTIVAL_DATA);
  const [currentZoom, setCurrentZoom] = useState(5);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [selectedMarkerId, setSelectedMarkerId] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState('ALL');

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


  const handleFilterChange = useCallback((filterKey) => {
    const newFilter = activeFilter === filterKey ? 'ALL' : filterKey;
    setActiveFilter(newFilter);
    setSelectedSubCategory('ALL');

    if (newFilter !== 'ALL') {
      setIsSheetOpen(true);
    } else {
      setIsSheetOpen(false);
    }
  }, [activeFilter]);

  const handleMarkerClick = useCallback((markerData) => {
    setSelectedMarkerId(markerData.id);
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
        booths={listBooths}
        categoryConfig={CATEGORY_CONFIG}
        selectedMainCategory={activeFilter}
        selectedSubCategory={selectedSubCategory}
        setSelectedSubCategory={setSelectedSubCategory}
        selectedMarkerId={selectedMarkerId}
      />
    </div>
  );
}

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
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
    zIndex: 20,
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  backButton: {
    position: 'absolute',
    left: '16px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    margin: 0,
    fontSize: '18px',
    fontWeight: 'bold',
  },
  filterContainer: {
    position: 'absolute',
    top: '56px',
    left: 0,
    right: 0,
    zIndex: 10,
  },
};

export default MapPage;

