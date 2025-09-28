// src/data/contentData.js

// 1. 각 콘텐츠의 대표 이미지를 import 합니다. (이미지가 없다면 임시 이미지를 사용하세요)
// import engraveImage from '../assets/image/contents/engrave-and-eternal.png';
//import meetImage from '../assets/image/contents/meet-and-start.png';
//import paintImage from '../assets/image/contents/paint-and-dye.png';
//import scoopImage from '../assets/image/contents/scoop-and-miss.png';
//import flowImage from '../assets/image/contents/flow-and-stop.png';
//import dropImage from '../assets/image/contents/drop-and-react.png';

// 2. 모든 이벤트 정보를 배열에 담아 export 합니다.
export const contentData = [
  {
    id: "engrave-and-eternal",
    title: "새기고, 염원하다",
    summary: "연등 만들기",
    // image: engraveImage,
    date: "9월 29일(월) ~ 30일(화) 12:00 ~ 18:00",
    location: "컨벤션 홀",
    target: "전남대학교 재적생(재학생 및 휴학생)",
    price: "무료",
    registration: "",
    guide: ["1. 원하는 키워드를 선택합니다. (건강. 재물. 애정)",
        "2. 엽서에 올해 이루고자 하는 다짐을 적습니다.",
        "3. 연등의 색깔을 선정합니다. (Ex. 건강: 파랑, 초록 / 재물: 노랑 / 애정: 빨강 핑크)",
        "4. 엽서를 연등에 매단 후, 스태프에게 연등을 전달합니다.",
        "5. 참여명부에 이름을 작성하고 상품을 수령합니다.",
        "※ 전남대 학우가 아니어도 참여는 가능하나, 상품 증정에는 제한이 있습니다.",],

    notes: ["부적절한 단어 (욕설 등) 사용 시 스태프의 안내에 따라 재제 당할 수 있습니다.",
        "타인의 연등, 엽서를 훼손을 금지합니다.",
        "전구는 안전상의 이유로 스태프만 사용합니다.",
        "인당 달 수 있는 연등은 1개이며, 연등 1개 당 상품은 1개씩 증정됩니다.",
    ],
  },
  {
    id: "meet-and-start",
    title: "만나고, 시작하다",
    summary: "소개팅 이벤트",
    //image: meetImage,
    date: "9월 29일(월) ~ 30일(화) 13:00 ~ 17:00",
    location: "민주마루 앞 잔디밭",
    target: "전남대학교 구성원 및 지역민",
    price: ["예약금: 12,000 \n 참가비: 2,000 \n 보증금: 10,000",
    ],
    registration: "",
    guide: ["본 소개팅은 대리 참여가 어렵습니다. 반드시, 신청자 본인이 참여해주세요."],
    notes: [],
  },
  {
    id: "paint-and-dye",
    title: "칠하고, 물들이다",
    summary: "나만의 베어브릭 키링 만들기",
    //image: paintImage,
    date: "9월 29일(월) ~ 30일(화) 11:00 ~ 17:00",
    location: "민주마루",
    target: "전남대학교 재학생, 휴학생 및 전 구성원",
    price: "8cm: 1,000원\n12cm: 2,000원",
    registration: "현장 접수 (예약자 우선)",
    guide: [
      "베어브릭을 자유롭게 도색합니다.",
      "물감통, 물총 등 다양한 도구를 활용하여 개성 있는 디자인으로 꾸밉니다.",
      "완성한 키링을 제공된 컵에 포장합니다.",
    ],
    notes: [
      "일회용 가운을 제공하나, 옷에 물감이 묻어도 책임지지 않습니다.",
      "베어브릭은 1인 1개 제공되며, 교환 및 변경은 불가합니다.",
      "결제 후 환불은 불가하며, 물품 소진 시 조기 마감될 수 있습니다.",
    ],
  },
  {
    id: "scoop-and-miss",
    title: "건지고, 놓치다",
    summary: "탱탱볼 건지기 게임",
    //image: scoopImage,
    date: "9월 29일(월) ~ 30일(화) 11:00 ~ 17:00",
    location: "민주마루 앞",
    target: "전남대학교 재학생, 휴학생 및 전 구성원 (외부인 참여 가능, 상품 증정 제한)",
    price: "뜰채 2개 1,000원",
    registration: "현장 접수",
    guide: [
        "뜰채로 8개의 탱탱볼을 건지면 선물을 증정합니다.",
        "뜰채가 찢어지면 시간이 남아도 게임은 종료됩니다."
    ],
    notes: [],
  },
  {
    id: "flow-and-stop",
    title: "흐르고, 멈추다",
    summary: "스톱워치 9.2930초에 맞추기",
    //image: flowImage,
    date: "9월 29일(월) ~ 30일(화) 11:00 ~ 17:00",
    location: "민주마루 앞",
    target: "전남대학교 재학생, 휴학생 및 전 구성원 (외부인 참여 가능, 상품 증정 제한)",
    price: "코인 1개당 3회 도전 가능 (*1,000원 = 코인 1개)",
    registration: "현장 접수",
    guide: ["시작 버튼을 누르고, 9.2930초에 정확하게 정지 버튼을 눌러야 합니다."],
    prizes: [
        "9.2930초 → 에어팟",
        "9.293X초 → 치킨 기프티콘",
        "9.29XX초 → 만원 상당의 카페 기프티콘",
        "9.2XXX초 → 비타오백"
    ],
    notes: [
      "코인은 '흐르고, 멈추다' & '떨어지고, 반응하다' 부스에서 교환 가능합니다.",
      "상품은 3번의 기록 중 가장 좋은 기록의 상품 하나만 제공됩니다.",
      "상위 상품(에어팟, 치킨, 카페) 당첨 시, 당일 재도전은 불가능합니다.",
    ]
  },
  {
    id: "drop-and-react",
    title: "떨어지고, 반응하다",
    summary: "떨어지는 막대 잡기",
    //image: dropImage,
    date: "9월 29일(월) ~ 30일(화) 11:00 ~ 17:00",
    location: "민주마루 앞",
    target: "전남대학교 재학생, 휴학생 및 전 구성원 (외부인 참여 가능, 상품 증정 제한)",
    price: "코인 1개당 1회 도전 가능 (*1,000원 = 코인 1개)",
    registration: "현장 접수",
    guide: ["스틱 10개 중 8개 이상을 잡으면 선물 증정"],
    prizes: ["성공 시: INC커피 10,000원 상품권"],
    notes: [
      "참여자 외에는 게임 공간 안으로 들어가지 않도록 주의해주세요.",
      "스태프의 허락 없이 기계를 조작하지 마세요."
    ],
  },
];