import React, { useRef, useEffect, useState } from 'react';
import useKakaoLoader from '../hooks/useKakaoLoader';
import { fetchBooths } from '../services/api';

// ✅ 카테고리별 마커 이미지 URL을 정의합니다.
const markerImageSrc = {
  "부스 & 테이블존": "http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png",
  "콘텐츠 & 포토존": "http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_orange.png",
  "공연 & 관련부스": "http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_yellow.png",
  "안전관리": "http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_green.png",
  "다회용기 반납": "http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_blue.png",
};
const defaultMarkerImageSrc = "http://t1.daumcdn.net/mapjsapi/images/marker.png"; // 기본 마커

const MapComponent = () => {
  const mapStatus = useKakaoLoader();
  const mapContainerRef = useRef(null);
  const [booths, setBooths] = useState([]);
  const [map, setMap] = useState(null);

  useEffect(() => {
    fetchBooths().then(data => setBooths(data));
  }, []);

  useEffect(() => {
    if (mapStatus !== 'loaded' || !mapContainerRef.current) return;

    const container = mapContainerRef.current;
    const options = {
      center: new window.kakao.maps.LatLng(35.1759, 126.9090),
      level: 3,
    };
    const mapInstance = new window.kakao.maps.Map(container, options);
    setMap(mapInstance);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const userPosition = new window.kakao.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        mapInstance.setCenter(userPosition);
      });
    }
  }, [mapStatus]);

  useEffect(() => {
    if (!map || booths.length === 0) return;

    booths.forEach(booth => {
      const position = new window.kakao.maps.LatLng(booth.latitude, booth.longitude);
      
      // ✅ 카테고리에 맞는 마커 이미지 소스를 가져옵니다.
      const imageSrc = markerImageSrc[booth.category] || defaultMarkerImageSrc;
      const imageSize = new window.kakao.maps.Size(32, 35);
      const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);

      const marker = new window.kakao.maps.Marker({
        position,
        image: markerImage // ✅ 생성된 마커 이미지를 설정합니다.
      });
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