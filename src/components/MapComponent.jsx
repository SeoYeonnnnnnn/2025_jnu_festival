import React, { useRef, useEffect, useState } from 'react';
import useKakaoLoader from '../hooks/useKakaoLoader';
import { fetchBooths } from '../services/api';

const MapPage = () => {
  const mapStatus = useKakaoLoader();
  const mapContainerRef = useRef(null);
  const [booths, setBooths] = useState([]);

  // 1. 컴포넌트가 마운트되면 백엔드에서 부스 데이터를 가져옵니다.
  useEffect(() => {
    fetchBooths().then(data => {
      setBooths(data);
    });
  }, []); // 최초 1회만 실행

  // 2. 지도 SDK 로딩과 부스 데이터 로딩이 모두 완료되면 지도를 그립니다.
  useEffect(() => {
    // 두 조건이 모두 충족되지 않으면 실행하지 않습니다.
    if (mapStatus !== 'loaded' || booths.length === 0 || !mapContainerRef.current) {
      return;
    }

    const container = mapContainerRef.current;
    const options = {
      center: new window.kakao.maps.LatLng(35.1759, 126.9090), // 전남대학교 중심 좌표
      level: 4,
    };
    const map = new window.kakao.maps.Map(container, options);

    // 3. 받아온 부스 데이터를 기반으로 마커와 정보창을 생성합니다.
    booths.forEach(booth => {
      // 백엔드에서 위도, 경도 데이터를 받아와야 합니다.
      // 예시: booth.latitude, booth.longitude
      // 지금은 models.py에 위도/경도 필드가 없으므로, 임시 위치를 사용합니다.
      // 실제 구현 시에는 models.py에 lat, lng 필드를 추가해야 합니다.
      const tempPosition = new window.kakao.maps.LatLng(35.1777 - (booth.id * 0.0005), 126.9068);
      
      const marker = new window.kakao.maps.Marker({ position: tempPosition });
      marker.setMap(map);

      const iwContent = `<div style="padding:5px; font-size:14px; font-weight:bold; text-align:center;">${booth.name}</div>`;
      const infowindow = new window.kakao.maps.InfoWindow({ content: iwContent, removable: true });

      window.kakao.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map, marker);
      });
    });

    // 4. 사용자 현재 위치를 표시합니다.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          const userPosition = new window.kakao.maps.LatLng(latitude, longitude);
          
          const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png';
          const imageSize = new window.kakao.maps.Size(34, 36);
          const userMarker = new window.kakao.maps.Marker({ position: userPosition, image: new window.kakao.maps.MarkerImage(imageSrc, imageSize) });
          
          userMarker.setMap(map);
          map.setCenter(userPosition); // 지도의 중심을 사용자 위치로 이동
        },
        (err) => console.warn(`Geolocation Error(${err.code}): ${err.message}`),
        { enableHighAccuracy: true }
      );
    }

  }, [mapStatus, booths]); // 지도 SDK 또는 부스 데이터가 준비되면 이 효과가 실행됩니다.

  return (
    <div className="relative w-full h-[calc(100vh-60px)]">
      <div 
        ref={mapContainerRef} 
        className="w-full h-full"
        aria-label="카카오 지도"
      >
        {mapStatus !== 'loaded' && (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <p className="text-gray-500">지도를 불러오는 중입니다...</p>
          </div>
        )}
      </div>
      {/* 부스 목록 슬라이드 컴포넌트는 필요 시 여기에 추가할 수 있습니다. */}
    </div>
  );
};

export default MapPage;