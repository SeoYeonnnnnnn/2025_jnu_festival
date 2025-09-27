export const FESTIVAL_DATA = [
  // =========================================================
  // 1. 요약 목록용 마커 (지도에 표시되고, 목록의 첫 화면을 구성)
  // =========================================================
  // --- 부스 ---
  {
    id: 1, type: "BOOTH", name: "학생부스", description: "학생부스 목록 보러가기",
    coordinates: [35.177237, 126.906417],
    mainCategory: "BOOTH", subCategory: "STUDENT_BOOTH",
    displayZoom: [1, 4], // 줌 레벨을 1-4로 통일합니다.
  },
  {
    id: 2, type: "BOOTH", name: "기업부스", description: "기업부스 목록 보러가기",
    coordinates: [35.177460, 126.907001],
    mainCategory: "BOOTH", subCategory: "COMPANY_BOOTH",
    displayZoom: [1, 4],
  },
  {
    id: 3, type: "BOOTH", name: "기관부스", description: "기관부스 및 안전관리부스 목록 보러가기", // 설명을 통합했습니다.
    coordinates: [35.176982, 126.906450],
    mainCategory: "BOOTH", subCategory: "INSTITUTIONAL_BOOTH",
    displayZoom: [1, 4],
  },
  {
    id: 4, type: "BOOTH", name: "푸드트럭", description: "푸드트럭 목록 보러가기",
    coordinates: [35.174886, 126.907864],
    mainCategory: "BOOTH", subCategory: "FOOD_TRUCK",
    displayZoom: [1, 4],
  },
  {
    id: 5, type: "BOOTH", name: "테이블존", description: "테이블존 목록 보러가기",
    coordinates: [35.175537, 126.910425],
    mainCategory: "BOOTH", subCategory: "TABLE_ZONE", // subCategory를 올바르게 수정했습니다.
    displayZoom: [1, 4],
  },
  // --- 컨텐츠 ---
  {
    id: 20, type: "BOOTH", name: "굿즈 팝업존", description: "굿즈 팝업존 목록 보러가기",
    mainCategory: "CONTENTS", subCategory: "POPUP_ZONE",
    displayZoom: [1, 4], coordinates: [35.175738, 126.906348],
  },
  {
    id: 21, type: "BOOTH", name: "포토부스", description: "포토부스 목록 보러가기",
    mainCategory: "CONTENTS", subCategory: "PHOTO_BOOTH",
    displayZoom: [1, 4], coordinates: [35.176744, 126.907123],
  },
  {
    id: 22, type: "BOOTH", name: "민주마루 컨텐츠", description: "컨텐츠 목록 보러가기",
    mainCategory: "CONTENTS", subCategory: "CONTENTS_ZONE",
    displayZoom: [1, 4], coordinates: [35.175762, 126.907245],
  },
  {
    id: 23, type: "BOOTH", name: "거리노래방", description: "거리노래방 상세보기",
    mainCategory: "CONTENTS", subCategory: "STREET_KARAOKE",
    displayZoom: [1, 4], coordinates: [35.175648, 126.911916],
  },
  // --- 무대 ---
  {
    id: 30, type: "BOOTH", name: "본 무대", description: "본 무대 상세보기",
    mainCategory: "STAGE", subCategory: "MAIN_STAGE",
    displayZoom: [1, 4], coordinates: [35.173987, 126.906248],
  },
  {
    id: 31, type: "BOOTH", name: "팔찌 배부", description: "팔찌 배부 상세보기",
    mainCategory: "STAGE", subCategory: "WRISTBAND_BOOTH",
    displayZoom: [1, 4], coordinates: [35.174097, 126.907667],
  },

  // =========================================================
  // 2. 상세 목록용 데이터 (지도에 표시되지 않음)
  // =========================================================


  // --- 학생부스 ---
  { id: 101, type: "BOOTH", name: "제미나이", description: "제미나이",image: "제미나이.png", mainCategory: "BOOTH", subCategory: "STUDENT_BOOTH", operationTime: "DAY",location: "5.18광장(봉지)",studentBoothType: "기타" },
  { id: 102, type: "BOOTH", name: "그린바이오 팝업", description: "그린바이오 팝업", mainCategory: "BOOTH", subCategory: "STUDENT_BOOTH", operationTime: "DAY",location: "5.18광장(봉지)",studentBoothType: "기타" },
  { id: 103, type: "BOOTH", name: "너는 내 취향저격", description: "소개팅부스", mainCategory: "BOOTH", subCategory: "STUDENT_BOOTH", operationTime: "DAY",location: "5.18광장(봉지)",studentBoothType: "소개팅" },
  { id: 104, type: "BOOTH", name: "ROKAFE", description: "음식", mainCategory: "BOOTH", subCategory: "STUDENT_BOOTH", operationTime: "DAY",location: "5.18광장(봉지)",studentBoothType: "음식" },
  { id: 105, type: "BOOTH", name: "룩개팅&키링", description: "키링, 소개팅", mainCategory: "BOOTH", subCategory: "STUDENT_BOOTH", operationTime: "DAY",location: "5.18광장(봉지)",studentBoothType: "소개팅" },
  { id: 106, type: "BOOTH", name: "몽실몽실", description: "뜨개물품 판매", mainCategory: "BOOTH", subCategory: "STUDENT_BOOTH", operationTime: "DAY",location: "5.18광장(봉지)",studentBoothType: "기타" },
  { id: 107, type: "BOOTH", name: "연애의 첫 단추 소개팅", description: "소개팅", mainCategory: "BOOTH", subCategory: "STUDENT_BOOTH", operationTime: "DAY",location: "5.18광장(봉지)",studentBoothType: "소개팅" },
  { id: 108, type: "BOOTH", name: "셀디와 레스투의 어드벤처 타임", description: "음식", mainCategory: "BOOTH", subCategory: "STUDENT_BOOTH", operationTime: "DAY",location: "5.18광장(봉지)",studentBoothType: "음식" },
  // ▼▼▼▼▼▼▼▼▼▼ 요청하신 학생부스(후문 일대) 데이터 추가 ▼▼▼▼▼▼▼▼▼▼
  { id: 109, type: "BOOTH", name: "광속구", description: "광속구", mainCategory: "BOOTH", subCategory: "STUDENT_BOOTH", operationTime: "ALL", location: "후문 일대(용지 앞)", studentBoothType: "음식" },
  { id: 110, type: "BOOTH", name: "애프터시그널", description: "애프터시그널", mainCategory: "BOOTH", subCategory: "STUDENT_BOOTH", operationTime: "ALL", location: "후문 일대(용지 앞)", studentBoothType: "소개팅" },
  { id: 111, type: "BOOTH", name: "붕스크림", description: "붕스크림", mainCategory: "BOOTH", subCategory: "STUDENT_BOOTH", operationTime: "ALL", location: "후문 일대(용지 앞)", studentBoothType: "음식" },
  { id: 112, type: "BOOTH", name: "드림포차", description: "드림포차", mainCategory: "BOOTH", subCategory: "STUDENT_BOOTH", operationTime: "NIGHT", location: "후문 일대(용지 앞)", studentBoothType: "음식" },
  { id: 113, type: "BOOTH", name: "검정고무신", description: "검정고무신", mainCategory: "BOOTH", subCategory: "STUDENT_BOOTH", operationTime: "NIGHT", location: "후문 일대(용지 앞)", studentBoothType: "음식" },
  { id: 114, type: "BOOTH", name: "아직 한 발 남았다", description: "아직 한 발 남았다", mainCategory: "BOOTH", subCategory: "STUDENT_BOOTH", operationTime: "NIGHT", location: "후문 일대(용지 앞)", studentBoothType: "기타" },
  { id: 115, type: "BOOTH", name: "리조또지만 육회도 하고싶어", description: "리조또지만 육회도 하고싶어", mainCategory: "BOOTH", subCategory: "STUDENT_BOOTH", operationTime: "NIGHT", location: "후문 일대(용지 앞)", studentBoothType: "음식" },
  { id: 116, type: "BOOTH", name: "사탕하나, 사랑하나", description: "사탕하나, 사랑하나", mainCategory: "BOOTH", subCategory: "STUDENT_BOOTH", operationTime: "NIGHT", location: "후문 일대(용지 앞)", studentBoothType: "소개팅" },
  { id: 117, type: "BOOTH", name: "화채먹으러오뎅요", description: "화채먹으러오뎅요", mainCategory: "BOOTH", subCategory: "STUDENT_BOOTH", operationTime: "NIGHT", location: "후문 일대(용지 앞)", studentBoothType: "음식" },
  { id: 118, type: "BOOTH", name: "냉면죽여불어", description: "냉면죽여불어", mainCategory: "BOOTH", subCategory: "STUDENT_BOOTH", operationTime: "NIGHT", location: "후문 일대(용지 앞)", studentBoothType: "음식" },
  { id: 119, type: "BOOTH", name: "이웃집 야키토리", description: "이웃집 야키토리", mainCategory: "BOOTH", subCategory: "STUDENT_BOOTH", operationTime: "NIGHT", location: "후문 일대(용지 앞)", studentBoothType: "음식" },
  { id: 120, type: "BOOTH", name: "돼지삶은거.", description: "돼지삶은거.", mainCategory: "BOOTH", subCategory: "STUDENT_BOOTH", operationTime: "NIGHT", location: "후문 일대(용지 앞)", studentBoothType: "음식" },
  { id: 121, type: "BOOTH", name: "전전전셋", description: "전전전셋", mainCategory: "BOOTH", subCategory: "STUDENT_BOOTH", operationTime: "NIGHT", location: "후문 일대(용지 앞)", studentBoothType: "음식" },
  { id: 122, type: "BOOTH", name: "토목 Boom Coming", description: "토목 Boom Coming", mainCategory: "BOOTH", subCategory: "STUDENT_BOOTH", operationTime: "NIGHT", location: "후문 일대(용지 앞)", studentBoothType: "음식" },
  { id: 123, type: "BOOTH", name: "PPP를 이겨라 종이컵 맞추기", description: "PPP를 이겨라 종이컵 맞추기", mainCategory: "BOOTH", subCategory: "STUDENT_BOOTH", operationTime: "NIGHT", location: "후문 일대(용지 앞)", studentBoothType: "기타" },
  // ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲

  // --- 기업부스 ---
  { id: 130, type: "BOOTH", name: "INC COFFEE", description: "부스 번호: 1, 2", mainCategory: "BOOTH", subCategory: "COMPANY_BOOTH", operationTime: "DAY", location: "5.18광장(봉지)" },
  { id: 131, type: "BOOTH", name: "프로세카 개강 응원 축제", description: "부스 번호: 3, 4 (1일차)", mainCategory: "BOOTH", subCategory: "COMPANY_BOOTH", operationTime: "DAY", location: "5.18광장(봉지)" },
  { id: 132, type: "BOOTH", name: "<레디, 갓생, 고!> 커피차", description: "부스 번호: 3, 4 (2일차)", mainCategory: "BOOTH", subCategory: "COMPANY_BOOTH", operationTime: "DAY", location: "5.18광장(봉지)" },
  { id: 133, type: "BOOTH", name: "퍼스널컬러 / 립&치크 만들기", description: "부스 번호: 5", mainCategory: "BOOTH", subCategory: "COMPANY_BOOTH", operationTime: "DAY", location: "5.18광장(봉지)" },
  { id: 134, type: "BOOTH", name: "PATCHKING 패치킹", description: "부스 번호: 6", mainCategory: "BOOTH", subCategory: "COMPANY_BOOTH", operationTime: "DAY", location: "5.18광장(봉지)" },
  { id: 135, type: "BOOTH", name: "(주)하이트진로", description: "부스 번호: 7", mainCategory: "BOOTH", subCategory: "COMPANY_BOOTH", operationTime: "DAY", location: "5.18광장(봉지)" },
  { id: 136, type: "BOOTH", name: "기업광주여행플랫폼 광주아트패스", description: "부스 번호: 4", mainCategory: "BOOTH", subCategory: "COMPANY_BOOTH", operationTime: "NIGHT", location: "후문 일대(용지 앞)" },

  // --- 기관부스 ---
  { id: 140, type: "BOOTH", name: "굿네이버스와 함께하는 지구 구하기 대작전!", description: "부스 번호: 8", mainCategory: "BOOTH", subCategory: "INSTITUTIONAL_BOOTH", operationTime: "DAY", location: "5.18광장(봉지)" },
  { id: 141, type: "BOOTH", name: "스마트인재개발원", description: "부스 번호: 9", mainCategory: "BOOTH", subCategory: "INSTITUTIONAL_BOOTH", operationTime: "DAY", location: "5.18광장(봉지)" },
  { id: 142, type: "BOOTH", name: "국가 AI컴퓨팅센터를 광주로!", description: "부스 번호: 10", mainCategory: "BOOTH", subCategory: "INSTITUTIONAL_BOOTH", operationTime: "DAY", location: "5.18광장(봉지)" },
  { id: 143, type: "BOOTH", name: "반지공방 아뜰리에 호수 광주", description: "부스 번호: 11", mainCategory: "BOOTH", subCategory: "INSTITUTIONAL_BOOTH", operationTime: "DAY", location: "5.18광장(봉지)" },
  { id: 144, type: "BOOTH", name: "온누리상품권 무료 충전부스", description: "부스 번호: 12", mainCategory: "BOOTH", subCategory: "INSTITUTIONAL_BOOTH", operationTime: "DAY", location: "5.18광장(봉지)" },
  { id: 145, type: "BOOTH", name: "국민체력100과 함께하는 “도전! Street 체력왕!”", description: "부스 번호: 12, 13", mainCategory: "BOOTH", subCategory: "INSTITUTIONAL_BOOTH", operationTime: "DAY", location: "5.18광장(봉지)" },
  { id: 146, type: "BOOTH", name: "취업이 막막할 땐? 광주고용복지+센터로 똑똑!", description: "부스 번호: 14", mainCategory: "BOOTH", subCategory: "INSTITUTIONAL_BOOTH", operationTime: "DAY", location: "5.18광장(봉지)" },
  { id: 147, type: "BOOTH", name: "창업중심대학사업단 홍보부스", description: "부스 번호: 15", mainCategory: "BOOTH", subCategory: "INSTITUTIONAL_BOOTH", operationTime: "DAY", location: "5.18광장(봉지)" },
  { id: 148, type: "BOOTH", name: "전남대학교 디지털 헬스케어 체험", description: "부스 번호: 16", mainCategory: "BOOTH", subCategory: "INSTITUTIONAL_BOOTH", operationTime: "DAY", location: "5.18광장(봉지)" },

  // --- 컨텐츠 ---
  { id: 201, type: "BOOTH", name: "굿즈 판매샵", description: "전룡이가 가득 담긴 특별한 굿즈들로 대동제의 기억을 간직해보세요", mainCategory: "CONTENTS", subCategory: "POPUP_ZONE", operationTime: "DAY", scheduleText: "10:00~18:00", location: "용봉관 앞" },
  { id: 202, type: "BOOTH", name: "슈링클스 키링 만들기", description: "나만의 캐릭터를 직접 그리고 세상에 하나뿐인 키링을 만들어보세요", mainCategory: "CONTENTS", subCategory: "POPUP_ZONE", operationTime: "DAY", scheduleText: "10:00~18:00", location: "용봉관 앞" },
  { id: 203, type: "BOOTH", name: "유니폼 마킹 및 와펜", description: "와펜과 나만의 마킹의 조합으로  유니폼에 특별한 개성을 더해보세요", mainCategory: "CONTENTS", subCategory: "POPUP_ZONE", scheduleText: "10:00~18:00", location: "용봉관 앞" },
  { id: 204, type: "BOOTH", name: "전룡이 포토존", description: "전룡이에게 반가운 첫인사를 건네주세요", mainCategory: "CONTENTS", subCategory: "POPUP_ZONE", operationTime: "DAY", scheduleText: "상시 운영", location: "용봉관 앞" },
  { id: 205, type: "BOOTH", name: "'새기고, 염원하다'(연등)", description: "연등에 소원을 담아 환하게 빛내보세요", mainCategory: "CONTENTS", subCategory: "CONTENTS_ZONE", scheduleText: "12:00~18:00", location: "용지관 앞" },
  { id: 206, type: "BOOTH", name: "'만나고, 시작하다'(소개팅)", description: "두근거리는 대화 속에서 나와 잘 맞는 인연을 찾아보세요", mainCategory: "CONTENTS", subCategory: "CONTENTS_ZONE", location: "민주마루 앞 잔디밭", scheduleText: "13:00~17:00" },

  // --- 무대 ---
  { id: 301, type: "BOOTH", name: "본 무대 상세", description: "1일차 입장 시간 |  15:30 / 2일차 입장 시간  15:00", mainCategory: "STAGE", subCategory: "MAIN_STAGE", location: "대운동장" },
  { id: 302, type: "BOOTH", name: "팔찌 배부 상세", description: "팔찌 배부 시간 | 08:30~14:30", mainCategory: "STAGE", subCategory: "WRISTBAND_BOOTH", location: "풋살장", scheduleText: "08:30~14:30" },

  // =========================================================
  // 3. 편의시설 (지도에 항상 표시)
  // =========================================================
  { id: 401, type: "BOOTH", name: "화장실", coordinates: [35.177943, 126.906869], mainCategory: "SUPPORT", subCategory: "RESTROOM", displayZoom: [1, 4] },
  { id: 402, type: "BOOTH", name: "흡연구역", coordinates: [35.177102, 126.907520], mainCategory: "SUPPORT", subCategory: "SMOKING_AREA", displayZoom: [1, 4] },
  { id: 403, type: "BOOTH", name: "AED", coordinates: [35.176873, 126.907469], mainCategory: "SUPPORT", subCategory: "AED", displayZoom: [1, 4] },
  { id: 404, type: "BOOTH", name: "AED", coordinates: [35.175943, 126.908428], mainCategory: "SUPPORT", subCategory: "AED", displayZoom: [1, 4] },
  { id: 405, type: "BOOTH", name: "쓰레기통", coordinates: [35.176591, 126.907093], mainCategory: "SUPPORT", subCategory: "TRASH_CAN", displayZoom: [1, 4] },
  { id: 406, type: "BOOTH", name: "쓰레기통", coordinates: [35.175675, 126.909054], mainCategory: "SUPPORT", subCategory: "TRASH_CAN", displayZoom: [1, 4] },
  { id: 407, type: "BOOTH", name: "쓰레기통", coordinates: [35.175252, 126.909430], mainCategory: "SUPPORT", subCategory: "TRASH_CAN", displayZoom: [1, 4] },
  { id: 408, type: "BOOTH", name: "쓰레기통", coordinates: [35.175700, 126.909839], mainCategory: "SUPPORT", subCategory: "TRASH_CAN", displayZoom: [1, 4] },
  { id: 409, type: "BOOTH", name: "쓰레기통", coordinates: [35.175697, 126.910881], mainCategory: "SUPPORT", subCategory: "TRASH_CAN", displayZoom: [1, 4] },
  { id: 410, type: "BOOTH", name: "흡연구역", coordinates: [35.175723, 126.909559], mainCategory: "SUPPORT", subCategory: "SMOKING_AREA", displayZoom: [1, 4] },
  { id: 411, type: "BOOTH", name: "화장실", coordinates: [35.175377, 126.911057], mainCategory: "SUPPORT", subCategory: "RESTROOM", displayZoom: [1, 4] },
  { id: 412, type: "BOOTH", name: "흡연구역", coordinates: [35.175278, 126.911313], mainCategory: "SUPPORT", subCategory: "SMOKING_AREA", displayZoom: [1, 4] },
  { id: 413, type: "BOOTH", name: "화장실", coordinates: [35.176088, 126.910373], mainCategory: "SUPPORT", subCategory: "RESTROOM", displayZoom: [1, 4] },
  { id: 414, type: "BOOTH", name: "화장실", coordinates: [35.176232, 126.909860], mainCategory: "SUPPORT", subCategory: "RESTROOM", displayZoom: [1, 4] },
  { id: 415, type: "BOOTH", name: "AED", coordinates: [35.175465, 126.912078], mainCategory: "SUPPORT", subCategory: "AED", displayZoom: [1, 4] },
  { id: 416, type: "BOOTH", name: "화장실", coordinates: [35.173761, 126.907212], mainCategory: "SUPPORT", subCategory: "RESTROOM", displayZoom: [1, 4] },
  { id: 417, type: "BOOTH", name: "화장실", coordinates: [35.172949, 126.906864], mainCategory: "SUPPORT", subCategory: "RESTROOM", displayZoom: [1, 4] },
  { id: 418, type: "BOOTH", name: "흡연구역", coordinates: [35.173037, 126.907619], mainCategory: "SUPPORT", subCategory: "SMOKING_AREA", displayZoom: [1, 4] },
  { id: 419, type: "BOOTH", name: "AED", coordinates: [35.174188, 126.906072], mainCategory: "SUPPORT", subCategory: "AED", displayZoom: [1, 4] },
];

