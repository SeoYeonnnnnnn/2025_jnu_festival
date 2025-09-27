// 백엔드 서버의 기본 URL
const API_BASE_URL = "http://localhost:8000";

/**
 * 모든 부스 목록을 가져오는 함수
 * @returns {Promise<Array>} 부스 목록 데이터
 */
export const fetchBooths = async () => {
  try {
    // 백엔드의 /api/booths 엔드포인트에 GET 요청을 보냅니다.
    const response = await fetch(`${API_BASE_URL}/api/booths/`);
    
    // 응답이 성공적이지 않으면 오류를 발생시킵니다.
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch booths:", error);
    // 오류 발생 시 빈 배열을 반환하여 앱의 다른 부분이 중단되지 않도록 합니다.
    return [];
  }
};
