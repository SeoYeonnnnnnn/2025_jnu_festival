// src/pages/ContentDetailPage.jsx (새 파일)

import React from "react";
import { useParams, Link } from "react-router-dom";
import { contentData } from "../data/contentData";
import { FaArrowLeft, FaRegClock, FaMapMarkerAlt, FaUsers, FaWonSign, FaClipboardList, FaBullhorn, FaGift, FaExclamationTriangle } from "react-icons/fa";

export default function ContentDetailPage() {
  const { eventId } = useParams();
  const event = contentData.find((e) => e.id === eventId);

  if (!event) {
    return (
      <div className="text-white text-center p-10">
        <h2 className="text-2xl">이벤트 정보를 찾을 수 없습니다.</h2>
        <Link to="/content" className="text-green-400 mt-4 inline-block">목록으로 돌아가기</Link>
      </div>
    );
  }

  return (
    // 상세 페이지는 자체적으로 배경을 갖도록 설정
    <div className="w-full min-h-screen relative" style={{ backgroundImage: `url(/assets/배경.png)`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="absolute inset-0 bg-black/20" />
      <main className="relative z-10">
        <div className="max-w-2xl mx-auto px-4 pb-20">
          <div className="relative pt-6 pb-4">
            <Link to="/content" className="absolute left-0 top-6 text-white hover:text-green-300 transition-colors">
              <FaArrowLeft size={24} />
            </Link>
          </div>
          
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden">
            {/* ✅ 이미지 태그를 주석 처리합니다. */}
            {/* <img src={event.image} alt={event.title} className="w-full h-64 object-cover" /> */}
            <div className="p-8">
              <h1 className="text-4xl font-extrabold text-gray-900">{event.title}</h1>
              <p className="text-lg text-gray-600 mt-1 mb-8">{event.summary}</p>

              <div className="space-y-6">
                <InfoSection icon={<FaRegClock />} title="진행 일시" content={event.date} />
                <InfoSection icon={<FaMapMarkerAlt />} title="진행 장소" content={event.location} />
                <InfoSection icon={<FaUsers />} title="참여 대상" content={event.target} />
                <InfoSection icon={<FaWonSign />} title="참여 금액" content={event.price} />
                <InfoSection icon={<FaClipboardList />} title="접수 방법" content={event.registration} />

                {event.guide && <ListSection icon={<FaBullhorn />} title="진행 안내" items={event.guide} />}
                {event.prizes && <ListSection icon={<FaGift />} title="상품 안내" items={event.prizes} />}
                {event.notes && event.notes.length > 0 && <ListSection icon={<FaExclamationTriangle />} title="유의 사항" items={event.notes} />}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// 아이콘을 포함한 상세 정보 섹션 컴포넌트
const InfoSection = ({ icon, title, content }) => (
  <div>
    <h3 className="flex items-center font-bold text-xl text-green-800 mb-2">
      <span className="mr-3">{icon}</span>
      {title}
    </h3>
    <p className="text-gray-700 whitespace-pre-line ml-9">{content}</p>
  </div>
);

const ListSection = ({ icon, title, items }) => (
  <div>
    <h3 className="flex items-center font-bold text-xl text-green-800 mb-2">
      <span className="mr-3">{icon}</span>
      {title}
    </h3>
    <ul className="list-disc list-inside text-gray-700 space-y-1 ml-9">
      {items.map((item, index) => <li key={index}>{item}</li>)}
    </ul>
  </div>
);

