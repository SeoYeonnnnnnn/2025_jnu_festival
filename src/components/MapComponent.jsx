import React, { useRef, useEffect, useState } from 'react';
import useKakaoLoader from '../hooks/useKakaoLoader';
import { fetchBooths } from '../services/api';

const MapComponent = () => {
  const mapStatus = useKakaoLoader();
  const mapContainerRef = useRef(null);
  const [booths, setBooths] = useState([]);
  const [map, setMap] = useState(null);

  // 1. 백엔드에서 부스 데이터를 가져옵니다.
  useEffect(() => {
    fetchBooths().then(data => {
      setBooths(data);
    });
  }, []);

  // 2. 지도 SDK 로딩이 완료되면, 기본 지도를 먼저 생성합니다.
  useEffect(() => {
    if (mapStatus !== 'loaded' || !mapContainerRef.current) {
      return;
    }

    const container = mapContainerRef.current;
    const options = {
      center: new window.kakao.maps.LatLng(35.1759, 126.9090),
      level: 2,
    };
    const mapInstance = new window.kakao.maps.Map(container, options);
    setMap(mapInstance);

    // 사용자 현재 위치 표시
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const userPosition = new window.kakao.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png';
        const imageSize = new window.kakao.maps.Size(34, 36);
        const userMarker = new window.kakao.maps.Marker({
          position: userPosition,
          image: new window.kakao.maps.MarkerImage(imageSrc, imageSize)
        });
        userMarker.setMap(mapInstance);
        mapInstance.setCenter(userPosition);
      });
    }
  }, [mapStatus]);

  // 3. 지도와 부스 데이터가 모두 준비되면, 마커를 추가합니다.
  useEffect(() => {
    if (!map || booths.length === 0) {
      return;
    }

    booths.forEach(booth => {
      const position = new window.kakao.maps.LatLng(booth.latitude, booth.longitude);
      const marker = new window.kakao.maps.Marker({ position });
      marker.setMap(map);

      const iwContent = `<div style="padding:5px;font-weight:bold;text-align:center;">${booth.name}</div>`;
      const infowindow = new window.kakao.maps.InfoWindow({ content: iwContent, removable: true });
      window.kakao.maps.event.addListener(marker, 'click', () => infowindow.open(map, marker));
    });
  }, [map, booths]);

  return (
    <div ref={mapContainerRef} className="w-full h-full">
      {mapStatus !== 'loaded' && (
        <div className="w-full h-full flex items-center justify-center bg-gray-200">
          <p className="text-gray-500">지도를 불러오는 중입니다...</p>
        </div>
      )}
    </div>
  );
};

export default MapComponent;
