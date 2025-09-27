import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

function MapComponent({ markers, categoryConfig, onMarkerClick, onZoomChange, isSheetOpen }) {
  const mapContainer = useRef(null);
  const [kakaoMap, setKakaoMap] = useState(null);
  const [kakaoMarkers, setKakaoMarkers] = useState([]);
  const [activeOverlay, setActiveOverlay] = useState(null);
  const [labelOverlays, setLabelOverlays] = useState([]);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const navigate = useNavigate();

  // 1. 스크립트 로딩 (단 한 번만 실행)
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_API_KEY}&autoload=false`;
    script.async = true;
    document.head.appendChild(script);
    script.onload = () => { window.kakao.maps.load(() => setIsScriptLoaded(true)); };
  }, []);

  // 2. 지도 생성 (스크립트 로딩 후 단 한 번만 실행)
  useEffect(() => {
    if (!isScriptLoaded || !mapContainer.current) return;
    const options = {
      center: new window.kakao.maps.LatLng(35.176833, 126.909100),
      level: 2, minLevel: 1, maxLevel: 6,
    };
    const newMap = new window.kakao.maps.Map(mapContainer.current, options);
    setKakaoMap(newMap);
  }, [isScriptLoaded]);

  // 3. 지도 이벤트 리스너 등록
  useEffect(() => {
    if (!kakaoMap) return;
    const handleZoomChange = () => onZoomChange(kakaoMap.getLevel());
    const handleClick = () => {
      if (activeOverlay) {
        activeOverlay.setMap(null);
        setActiveOverlay(null);
      }
    };
    window.kakao.maps.event.addListener(kakaoMap, 'zoom_changed', handleZoomChange);
    window.kakao.maps.event.addListener(kakaoMap, 'click', handleClick);
    
    return () => {
      window.kakao.maps.event.removeListener(kakaoMap, 'zoom_changed', handleZoomChange);
      window.kakao.maps.event.removeListener(kakaoMap, 'click', handleClick);
    };
  }, [kakaoMap, onZoomChange, activeOverlay]);

  // 4. 마커 및 라벨 그리기
  useEffect(() => {
    if (!kakaoMap) return;

    kakaoMarkers.forEach(marker => marker.setMap(null));
    labelOverlays.forEach(label => label.setMap(null));
    if (activeOverlay) activeOverlay.setMap(null);

    const newKakaoMarkers = [];
    const newLabelOverlays = [];

    markers.forEach(data => {
      if (!data.coordinates) return;
      
      let markerImage = null;
      let imageSrc = '';
      let imageSize = null;

      if (data.type === 'AREA' && data.icon) {
        imageSrc = `/assets/${data.icon}`;
        imageSize = new window.kakao.maps.Size(42, 42);
      } else if (data.type === 'BOOTH') {
        const subCategoryInfo = categoryConfig[data.subCategory];
        if (subCategoryInfo?.icon) {
          imageSrc = `/assets/${subCategoryInfo.icon}`;
          const iconSize = subCategoryInfo.size || [20, 20];
          imageSize = new window.kakao.maps.Size(iconSize[0], iconSize[1]);
        }
      }

      if (imageSrc && imageSize) {
        markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);
      }
      
      const markerPosition = new window.kakao.maps.LatLng(data.coordinates[0], data.coordinates[1]);
      const kakaoMarker = new window.kakao.maps.Marker({
        position: markerPosition,
        title: data.name,
        image: markerImage,
      });

      window.kakao.maps.event.addListener(kakaoMarker, 'click', () => {
        const currentCenter = kakaoMap.getCenter();
        const currentLevel = kakaoMap.getLevel();

        if (activeOverlay) activeOverlay.setMap(null);
        onMarkerClick(data);
        const content = `<div style="padding:5px 10px; background:white; border:1px solid #ccc; border-radius:8px; font-weight:bold;">${data.name}</div>`;
        const customOverlay = new window.kakao.maps.CustomOverlay({
          position: markerPosition, content: content, yAnchor: 2.2
        });
        customOverlay.setMap(kakaoMap);
        setActiveOverlay(customOverlay);

        kakaoMap.setCenter(currentCenter);
        kakaoMap.setLevel(currentLevel);
      });
      
      kakaoMarker.setMap(kakaoMap);
      newKakaoMarkers.push(kakaoMarker);

      if (data.type === 'BOOTH' && data.mainCategory !== 'SUPPORT') {
        const labelContent = `<div style="padding: 2px 5px; font-size: 12px; font-weight: bold; color: #333; text-shadow: 1px 1px 0 #fff; white-space: nowrap;">${data.name}</div>`;
        const labelOverlay = new window.kakao.maps.CustomOverlay({
          position: markerPosition,
          content: labelContent,
          yAnchor: 2,
          zIndex: 3
        });
        labelOverlay.setMap(kakaoMap);
        newLabelOverlays.push(labelOverlay);
      }
    });

    setKakaoMarkers(newKakaoMarkers);
    setLabelOverlays(newLabelOverlays);
  }, [kakaoMap, markers, categoryConfig, onMarkerClick]);

  const handleCurrentLocation = useCallback(() => {
    if (kakaoMap && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const currentPos = new window.kakao.maps.LatLng(lat, lng);
          
          kakaoMap.panTo(currentPos);

          const marker = new window.kakao.maps.Marker({
            map: kakaoMap,
            position: currentPos,
            title: '현재 위치'
          });
          setTimeout(() => marker.setMap(null), 3000);
        },
        (error) => {
          console.error("Geolocation error:", error);
          alert("위치 정보를 가져올 수 없습니다. 브라우저의 위치 정보 접근 권한을 확인해주세요.");
        }
      );
    } else if (!navigator.geolocation) {
      alert("이 브라우저에서는 위치 정보 기능을 지원하지 않습니다.");
    }
  }, [kakaoMap]);

  const handleGoHome = useCallback(() => {
    navigate('/');
  }, [navigate]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
      
      <div style={{
        position: 'absolute',
        bottom: '90px',
        right: '20px',
        zIndex: 30,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        transition: 'bottom 0.3s ease-in-out',
      }}>
        <button type="button" onClick={handleCurrentLocation} style={styles.floatingButton} title="현재 위치로 이동">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><circle cx="12" cy="12" r="8"></circle><line x1="12" y1="2" x2="12" y2="4"></line><line x1="12" y1="20" x2="12" y2="22"></line><line x1="2" y1="12" x2="4" y2="12"></line><line x1="20" y1="12" x2="22" y2="12"></line></svg>
        </button>
      </div>
    </div>
  );
}

const styles = {
  floatingButton: {
    width: '50px', height: '50px', borderRadius: '50%',
    backgroundColor: 'white', border: '1px solid #ddd',
    boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer',
  }
};

export default MapComponent;