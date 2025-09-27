// src/config/CategoryConfig.js

export const CATEGORY_CONFIG = {
  // 대분류
  BOOTH: { key: "BOOTH", name: "부스" ,color: "#fd8a69",activeColor: "#FFFFFF", icon: "부스.png"},       
  CONTENTS: { key: "CONTENTS", name: "컨텐츠" ,color: "#ffcd4a",activeColor: "#FFFFFF" ,icon: "컨텐츠.png"}, 
  STAGE: { key: "STAGE", name: "무대",color: "#7db249",activeColor: "#FFFFFF", icon: "무대.png"},      
  SUPPORT: { key: "SUPPORT", name: "테이블존",color: "#1187cf",activeColor: "#FFFFFF",icon: "테이블.png" },   


  // 소분류
  // --- 부스 그룹 ---
  STUDENT_BOOTH: { name: "학생부스", parent: "BOOTH", icon: "빨강핀.png" ,size: [30, 30],},
  COMPANY_BOOTH: { name: "기업부스", parent: "BOOTH", icon: "빨강핀.png" ,size: [30, 30]},
  INSTITUTIONAL_BOOTH: { name: "기관부스", parent: "BOOTH", icon: "빨강핀.png",size: [30, 30] },
  FOOD_TRUCK: { name: "푸드트럭", parent: "BOOTH", icon: "빨강핀.png",size: [30, 30] },

  // --- 컨텐츠 그룹 ---
  POPUP_ZONE: { name: "굿즈 팝업존", parent: "CONTENTS",icon: "노랑핀.png" ,size: [30, 30],},
  CONTENTS_ZONE: { name: "컨텐츠존", parent: "CONTENTS",icon: "노랑핀.png" ,size: [30, 30],},
  STREET_KARAOKE: { name: "거리노래방", parent: "CONTENTS",icon: "노랑핀.png" ,size: [30, 30], },
  PHOTO_BOOTH: { name: "포토부스", parent: "CONTENTS",icon: "노랑핀.png" ,size: [30, 30], },

  // --- 무대 그룹 ---
  MAIN_STAGE: { name: "본무대", parent: "STAGE", icon: "초록핀.png",size: [30, 30], },
  WRISTBAND_BOOTH: { name: "팔찌 배부처", parent: "STAGE", icon: "초록핀.png",size: [30, 30], },

  // ---테이블존 ---
  TABLE_ZONE: { name: "테이블 존", parent: "BOOTH", icon: "파랑핀.png" ,size: [30, 30]},

  // --- 편의시설 ---
  RESTROOM: { name: "화장실", parent: "SUPPORT", icon: "화장실.png",size: [20, 20] },
  SMOKING_AREA: { name: "흡연구역", parent: "SUPPORT", icon: "흡연.png",size: [20, 20] },
  TRASH_CAN: { name: "쓰레기통", parent: "SUPPORT", icon: "쓰레기통.png",size: [20, 20] },
  SAFETY_BOOTH: { name: "안전관리부스", parent: "SUPPORT", icon: "safety-booth-icon.png",size: [20, 26] },
  AED: { name: "AED", parent: "SUPPORT", icon: "AED.png",size: [26, 26] },
};