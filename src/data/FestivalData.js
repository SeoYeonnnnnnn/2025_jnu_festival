// src/data/FestivalData.js

export const FESTIVAL_DATA = [
  // '구역' 마커 (줌 아웃: 5~6 레벨)
  

  // '개별' 마커 (줌 인: 1~4 레벨)
  {
    id: 1, type: "BOOTH", name: "학생부스", description: "학생부스 목록 보러가기",
    coordinates: [35.177237, 126.906417],
    mainCategory: "BOOTH", subCategory: "STUDENT_BOOTH",
    displayZoom: [1, 3],
  },
  {
    id: 2, type: "BOOTH", name: "기업부스", description: "기업부스 목록 보러가기",
    coordinates: [35.1774609, 126.907001],
    mainCategory: "BOOTH", subCategory: "COMPANY_BOOTH",
    displayZoom: [1, 3],
  },
  {
    id: 3, type: "BOOTH", name: "기관부스", description: "기관부스 목록 보러가기",
    coordinates: [35.176982, 126.906450],
    mainCategory: "BOOTH", subCategory: "INSTITUTIONAL_BOOTH",
    displayZoom: [1, 3],
  },
  {
    id: 4, type: "BOOTH", name: "푸드트럭", description: "푸드트럭 목록 보러가기",
    coordinates: [35.174886, 126.907864],
    mainCategory: "BOOTH", subCategory: "FOOD_TRUCK",
    displayZoom: [1, 3],
  },
 
  {
    id: 6, type: "BOOTH", name: "본부부스", description: "안전관리부스 및 본부부스 목록 보러가기",
    coordinates: [35.177039, 126.907183],
    mainCategory: "BOOTH", subCategory: "INSTITUTIONAL_BOOTH",
    displayZoom: [1, 3],
  },
  {
    id: 7, type: "BOOTH", name: "제미나이", description: "제미나이",image: "제미나이.png",
    mainCategory: "BOOTH", subCategory: "STUDENT_BOOTH", operationTime: "DAY",location: "5.18광장(봉지)",studentBoothType: "기타"
  },
  {
    id: 8, type: "BOOTH", name: "그린바이오 팝업", description: "그린바이오 팝업",
    mainCategory: "BOOTH", subCategory: "STUDENT_BOOTH", operationTime: "DAY",location: "5.18광장(봉지)",studentBoothType: "기타"
  },
  {
    id: 9, type: "BOOTH", name: "너는 내 취향저격", description: "소개팅부스",
    mainCategory: "BOOTH", subCategory: "STUDENT_BOOTH", operationTime: "DAY",location: "5.18광장(봉지)",studentBoothType: "소개팅"
  },
  {
    id: 10, type: "BOOTH", name: "ROKAFE", description: "음식",
    mainCategory: "BOOTH", subCategory: "STUDENT_BOOTH", operationTime: "DAY",location: "5.18광장(봉지)",studentBoothType: "음식"
  },
  {
    id: 11, type: "BOOTH", name: "룩개팅&키링", description: "키링, 소개팅",
    mainCategory: "BOOTH", subCategory: "STUDENT_BOOTH", operationTime: "DAY",location: "5.18광장(봉지)",studentBoothType: "소개팅"
  },
  {
    id: 12, type: "BOOTH", name: "몽실몽실", description: "뜨개물품 판매",
    mainCategory: "BOOTH", subCategory: "STUDENT_BOOTH", operationTime: "DAY",location: "5.18광장(봉지)",studentBoothType: "기타"
  },
  { 
    id: 13, type: "BOOTH", name: "연애의 첫 단추 소개팅", description: "소개팅",
    mainCategory: "BOOTH", subCategory: "STUDENT_BOOTH", operationTime: "DAY",location: "5.18광장(봉지)",studentBoothType: "소개팅"
  },
  { 
    id: 14, type: "BOOTH", name: "셀디와 레스투의 어드벤처 타임", description: "음식",
    mainCategory: "BOOTH", subCategory: "STUDENT_BOOTH", operationTime: "DAY",location: "5.18광장(봉지)",studentBoothType: "음식"
  },

  //컨텐츠 부스

  
  {
    id: 50, 
    type: "BOOTH", 
    name: "'부르고, 즐기다'(거리노래방)", 
    description: "나만의 목소리로 거리의 무대를 가득 채워보세요",
    mainCategory: "CONTENTS", 
    subCategory: "STREET_KARAOKE",
    operationTime: "DAY",
    image: "테스트.jpg",
    location: "후문 미니무대",
    displayZoom: [1, 4],
    coordinates: [35.175648, 126.911916],
  
  },

  
  {
    id: 25, // 다른 id와 겹치지 않게 설정
    type: "BOOTH", 
    name: "굿즈 팝업존", 
    description: "굿즈 팝업존 목록 보러가기", // 👈 가장 중요!
    mainCategory: "CONTENTS", 
    subCategory: "POPUP_ZONE",
    displayZoom: [1, 4], // 지도에 표시될 핀
    coordinates: [35.175738, 126.906348],
  },
  
  {
    id: 26, 
    type: "BOOTH",
    name: "굿즈 판매샵", 
    description: "전룡이가 가득 담긴 특별한 굿즈들로 대동제의 기억을 간직해보세요",
    mainCategory: "CONTENTS", 
    subCategory: "POPUP_ZONE",
    operationTime: "DAY",
    scheduleText: "10:00~18:00",
    location: "용봉관 앞"
    // 이 데이터는 지도에 표시될 필요가 없으므로 coordinates와 displayZoom이 없어도 됩니다.
  },
  {
    id: 27, 
    type: "BOOTH", 
    name: "슈링클스 키링 만들기", 
    description: "나만의 캐릭터를 직접 그리고 세상에 하나뿐인 키링을 만들어보세요",
    mainCategory: "CONTENTS", 
    subCategory: "POPUP_ZONE",
    operationTime: "DAY",
    scheduleText: "10:00~18:00",
    location: "용봉관 앞"
  },
  {
    id: 28, 
    type: "BOOTH", 
    name: "유니폼 마킹 및 와펜", 
    description: "와펜과 나만의 마킹의 조합으로  유니폼에 특별한 개성을 더해보세요",
    mainCategory: "CONTENTS", 
    subCategory: "POPUP_ZONE",
    scheduleText: "10:00~18:00",
    location: "용봉관 앞"
  },
  {
    id: 29, 
    type: "BOOTH", 
    name: "전룡이 포토존", 
    description: "전룡이에게 반가운 첫인사를 건네주세요",
    mainCategory: "CONTENTS", 
    subCategory: "POPUP_ZONE",
    operationTime: "DAY",
    scheduleText: "상시 운영",
    location: "용봉관 앞"
  },
  {
    id: 30, 
    type: "BOOTH", 
    name: "포토부스(제1학생마루)", 
    description: "사진으로 대동제의 추억을 가득 남겨보세요",
    mainCategory: "CONTENTS", 
    subCategory: "PHOTO_BOOTH",
    location: "제1학생마루 앞",
    scheduleText: "상시 운영",
    displayZoom: [1, 4],
    coordinates: [35.176744, 126.907123]
  },
  {
    id: 30, 
    type: "BOOTH", 
    name: "포토부스(민주마루)", 
    description: "사진으로 대동제의 추억을 가득 남겨보세요",
    mainCategory: "CONTENTS", 
    subCategory: "PHOTO_BOOTH",
    scheduleText: "상시 운영",
    location: "민주마루 앞",
    displayZoom: [1, 4],
    coordinates: [35.175926, 126.906965]
  },
  {
    id: 32, 
    type: "BOOTH", 
    name: "'새기고, 염원하다'(연등)", 
    description: "연등에 소원을 담아 환하게 빛내보세요",
    mainCategory: "CONTENTS", 
    subCategory: "CONTENTS_ZONE",
    scheduleText: "12:00~18:00",
    location: "용지관 앞",
    displayZoom: [1, 4],
    coordinates: [35.175534, 126.910006]
  },
  
  {
    id: 35, 
    type: "BOOTH", 
    name: "'만나고, 시작하다'(소개팅)", 
    description: "두근거리는 대화 속에서 나와 잘 맞는 인연을 찾아보세요",
    mainCategory: "CONTENTS", 
    subCategory: "CONTENTS_ZONE",
    location: "민주마루 앞 잔디밭",
    scheduleText: "13:00~17:00",
    displayZoom: [1, 4],
    coordinates: [35.175241, 126.906952]
  },
  {
    id: 36, 
    type: "BOOTH", 
    name: "본 무대", 
    description: "1일차 입장 시간 |  15:30 / 2일차 입장 시간  15:00",
    mainCategory: "STAGE", 
    subCategory: "MAIN_STAGE",
    location: "대운동장",
    displayZoom: [1, 4],
    coordinates: [35.173987, 126.906248]
  },
  {
    id: 36, 
    type: "BOOTH", 
    name: "팔찌 배부", 
    description: "팔찌 배부 시간 | 08:30~14:30",
    mainCategory: "STAGE", 
    subCategory: "WRISTBAND_BOOTH",
    location: "풋살장",
    scheduleText: "08:30~14:30",
    displayZoom: [1, 4],
    coordinates: [35.174097, 126.907667]
  },
 {
    id: 70, 
    type: "BOOTH", 
    name: "테이블존", 
    description: "ㅇ",
    mainCategory: "BOOTH", 
    subCategory: "TABLE_ZONE",
    scheduleText: "13:00~17:00",
    location: "후문 일대",
    displayZoom: [1, 4],
    coordinates: [35.175537, 126.910425],
  },
  


  {
    id: 40, type: "BOOTH", name: "화장실",
    coordinates: [35.177943, 126.906869],
    mainCategory: "SUPPORT", subCategory: "RESTROOM",
    displayZoom: [1, 2],
  },
  {
    id: 41, type: "BOOTH", name: "흡연구역",
    coordinates: [35.177102, 126.90752],
    mainCategory: "SUPPORT", subCategory: "SMOKING_AREA",
    displayZoom: [1, 2],
  },
  {
    id: 42, type: "BOOTH", name: "AED",
    coordinates: [35.176873, 126.907469],
    mainCategory: "SUPPORT", subCategory: "AED",
    displayZoom: [1, 2],
  },

  {
    id: 43, type: "BOOTH", name: "AED",
    coordinates: [35.175943, 126.908428],
    mainCategory: "SUPPORT", subCategory: "AED",
    displayZoom: [1, 2],
  },
  {
    id: 44, type: "BOOTH", name: "쓰레기통",
    coordinates: [35.176591, 126.907093],
    mainCategory: "SUPPORT", subCategory: "TRASH_CAN",
    displayZoom: [1, 2],
  },
  {
    id: 45, type: "BOOTH", name: "쓰레기통",
    coordinates: [35.175675, 126.909054],
    mainCategory: "SUPPORT", subCategory: "TRASH_CAN",
    displayZoom: [1, 2],
  },
  {
    id: 46, type: "BOOTH", name: "쓰레기통",
    coordinates: [35.175252, 126.909430],
    mainCategory: "SUPPORT", subCategory: "TRASH_CAN",
    displayZoom: [1, 2],
  },
  {
    id: 47, type: "BOOTH", name: "쓰레기통",
    coordinates: [35.175700, 126.909839],
    mainCategory: "SUPPORT", subCategory: "TRASH_CAN",displayZoom: [1, 3]
  },
  {
    id: 48, type: "BOOTH", name: "쓰레기통",
    coordinates: [35.175697, 126.910881],
    mainCategory: "SUPPORT", subCategory: "TRASH_CAN",
    displayZoom: [1, 2],
  },
  {
    id: 49, type: "BOOTH", name: "흡연구역",
    coordinates: [35.175723, 126.909559],
    mainCategory: "SUPPORT", subCategory: "SMOKING_AREA",
    displayZoom: [1, 2],
  },
  {
    id: 50, type: "BOOTH", name: "화장실",
    coordinates: [35.175377, 126.911057],
    mainCategory: "SUPPORT", subCategory: "RESTROOM",
    displayZoom: [1, 2],
  },
  {
    id: 51, type: "BOOTH", name: "흡연구역",
    coordinates: [35.175278, 126.911313],
    mainCategory: "SUPPORT", subCategory: "SMOKING_AREA",
    displayZoom: [1, 2],
  },
  {
    id: 52, type: "BOOTH", name: "화장실",
    coordinates: [35.1760889, 126.910373],
    mainCategory: "SUPPORT", subCategory: "RESTROOM",
    displayZoom: [1, 2],
  },
  {
    id: 53, type: "BOOTH", name: "화장실",
    coordinates: [35.176232, 126.909860],
    mainCategory: "SUPPORT", subCategory: "RESTROOM",
    displayZoom: [1, 2],
  },
  {
    id: 54, type: "BOOTH", name: "AED",
    coordinates: [35.175465, 126.912078],
    mainCategory: "SUPPORT", subCategory: "AED",
    displayZoom: [1, 2],
  },
  {
    id: 55, type: "BOOTH", name: "화장실",
    coordinates: [35.173761, 126.907212],
    mainCategory: "SUPPORT", subCategory: "RESTROOM",
    displayZoom: [1, 2],
  },
  {
    id: 56, type: "BOOTH", name: "화장실",
    coordinates: [35.172949, 126.906864],
    mainCategory: "SUPPORT", subCategory: "RESTROOM",
    displayZoom: [1, 2],
  },
  {
    id: 57, type: "BOOTH", name: "흡연구역",
    coordinates: [35.173037, 126.907619],
    mainCategory: "SUPPORT", subCategory: "SMOKING_AREA",
    displayZoom: [1, 2],
  },
  {
    id: 54, type: "BOOTH", name: "AED",
    coordinates: [35.174188, 126.906072],
    mainCategory: "SUPPORT", subCategory: "AED",
    displayZoom: [1, 2],
  },


  // =========================================================
  // 경로 데이터 (type: "PATH")
  // =========================================================
]