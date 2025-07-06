import { useState, useEffect } from 'react';

const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_API_KEY}&autoload=false`;

export default function useKakaoLoader() {
  const [status, setStatus] = useState('loading'); // 'loading', 'loaded', 'error'

  useEffect(() => {
    const scriptId = 'kakao-map-script';
    const existingScript = document.getElementById(scriptId);

    // 스크립트가 이미 로드되어 API 사용이 가능한지 먼저 확인
    if (window.kakao && window.kakao.maps) {
      setStatus('loaded');
      return;
    }

    // 스크립트 태그는 있지만, 아직 로딩이 완료되지 않은 경우 (중복 생성 방지)
    if (existingScript) {
      // 로드가 완료되면 상태를 변경하도록 이벤트 리스너 추가
      const checkKakaoLoad = () => {
          if (window.kakao && window.kakao.maps) {
              window.kakao.maps.load(() => setStatus('loaded'));
          }
      };
      existingScript.addEventListener('load', checkKakaoLoad);
      return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = KAKAO_SDK_URL;
    script.async = true;
    
    script.onload = () => {
      // 스크립트 파일 자체는 로드되었지만, 내부 초기화가 성공했는지 확인
      if (window.kakao && typeof window.kakao.maps.load === 'function') {
        window.kakao.maps.load(() => {
          setStatus('loaded');
        });
      } else {
        // 이 경우는 보통 API 키나 도메인 문제로 초기화가 실패한 경우입니다.
        console.error("Kakao script was loaded, but `window.kakao.maps.load` is not available. This is likely due to an invalid API key or an unregistered domain in the Kakao Developers site.");
        setStatus('error');
      }
    };

    script.onerror = () => {
      console.error("Failed to load the Kakao Maps script. Check your network connection.");
      setStatus('error');
    };

    document.head.appendChild(script);
  }, []);

  return status;
}
