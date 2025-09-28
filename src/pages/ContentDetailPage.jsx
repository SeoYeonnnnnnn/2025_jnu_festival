// src/pages/ContentDetailPage.jsx (최종 코드)

import React, { useMemo } from "react";
// 🚨 useNavigate 훅을 추가합니다.
import { useParams, Link, useNavigate } from "react-router-dom";
import { contentData } from "../data/contentData";
import { FaArrowLeft, FaRegClock, FaMapMarkerAlt, FaUsers, FaWonSign, FaClipboardList, FaBullhorn, FaGift, FaExclamationTriangle, FaInfoCircle, FaImage } from "react-icons/fa";

export default function ContentDetailPage() {
    // 🚨 useNavigate 훅 초기화
    const navigate = useNavigate();
    const { eventId } = useParams();
    
    // 데이터 안정성을 위해 ID 타입을 문자열로 통일하여 비교
    const event = useMemo(() => {
        return contentData.find((e) => String(e.id) === eventId);
    }, [eventId]);

    // 이미지 목록 준비 (data 구조에 images/image 키가 있을 경우를 대비)
    const imageList = event?.images && event.images.length > 0
        ? event.images
        : (event?.image ? [event.image] : []);

    // 🚨 뒤로가기 함수 정의
    const handleBackClick = () => {
        // 브라우저 히스토리에서 정확히 1단계 뒤로 이동
        navigate(-1); 
    };

    if (!event) {
        return (
            // 오류 페이지 스타일 통일
            <div className="text-white text-center p-10 bg-gray-900 min-h-screen">
                <h2 className="text-2xl">이벤트 정보를 찾을 수 없습니다. (ID: {eventId})</h2>
                <Link to="/content" className="text-green-400 mt-4 inline-block">목록으로 돌아가기</Link>
            </div>
        );
    }

    return (
        // 배경 스타일 통일
        <div className="w-full min-h-screen relative bg-gray-900">
            <div className="fixed inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: `url(/assets/배경.png)` }}/>
            <div className="fixed inset-0 bg-black/50" />
            
            {/* ⭐️ 상단 고정 헤더 스타일 적용 */}
            <div style={styles.headerContainer}>
                {/* 🚨 Link 대신 Button으로 변경하고 onClick 이벤트 연결 + 아이콘 통일 */}
                <button type="button" onClick={handleBackClick} style={styles.backButton}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 18L9 12L15 6" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
                <h1 style={styles.headerTitle}>{"이벤트 상세"}</h1>
            </div>
            
            <main className="relative z-10 pt-16">
                {/* ⭐️ max-w-xl로 크기 조정 및 중앙 정렬 */}
                <div className="max-w-xl mx-auto px-4 pb-20"> 
                    
                    {/* ⭐️ 투명 카드형 레이아웃 적용 */}
                    <div className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
                        
                        
                        <div className="p-6">
                            <h1 className="text-3xl font-bold text-white mb-1">{event.title}</h1>
                            <p className="text-lg text-green-400 mb-6">{event.summary}</p>

                            <div className="space-y-4">
                                {/* ⭐️ InfoSection 컴포넌트 사용 및 조건부 렌더링 적용 */}
                                <InfoSection icon={<FaRegClock />} title="진행 일시" content={event.date} />
                                <InfoSection icon={<FaMapMarkerAlt />} title="진행 장소" content={event.location} />
                                <InfoSection icon={<FaUsers />} title="참여 대상" content={event.target} />
                                <InfoSection icon={<FaWonSign />} title="참여 금액" content={event.price} />
                                <InfoSection icon={<FaClipboardList />} title="접수 방법" content={event.registration} />

                                {/* ⭐️ ListSection 컴포넌트 사용 및 아이콘 통일 */}
                                <ListSection icon={<FaInfoCircle />} title="진행 안내" items={event.guide} />
                                <ListSection icon={<FaGift />} title="상품 안내" items={event.prizes} />
                                {event.notes && event.notes.length > 0 && <ListSection icon={<FaExclamationTriangle />} title="유의 사항" items={event.notes} />}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

// --------------------------------------------------------------------------------------


// ⭐️ InfoSection 컴포넌트 디자인 (투명 배경, 흰색/초록색 텍스트)
const InfoSection = ({ icon, title, content }) => {
    if (!content) return null;
    return (
        <div className="flex items-start p-3 bg-white/10 rounded-lg shadow-inner">
            <h3 className="flex items-center font-bold text-base text-green-400 flex-shrink-0 w-24">
                <span className="mr-2 text-xl">{icon}</span>
                {title}
            </h3>
            <p className="text-white/80 whitespace-pre-line flex-1 text-base">{content}</p>
        </div>
    );
};

// ⭐️ ListSection 컴포넌트 디자인 (투명 배경, 흰색/초록색 텍스트)
const ListSection = ({ icon, title, items }) => {
    if (!items || items.length === 0) return null;
    return (
        <div className="p-4 bg-white/10 rounded-lg border border-green-500/30">
            <h3 className="flex items-center font-bold text-xl text-green-400 mb-3 border-b pb-2 border-white/10">
                <span className="mr-3 text-2xl">{icon}</span>
                {title}
            </h3>
            <ul className="list-none text-white/80 space-y-2">
                {items.map((item, index) => (
                    <li key={index} className="flex items-start text-sm">
                        <span className="text-green-400 mr-2 mt-1">•</span> 
                        <span className="flex-1">{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

// ⭐️ 목록 페이지와 통일된 고정 헤더 스타일
const styles = {
  headerContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '56px',
    zIndex: 30, 
    backgroundColor: 'rgba(0,0,0,0.5)', 
    backdropFilter: 'blur(5px)',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  },
  backButton: {
    position: 'absolute',
    left: '16px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
  },
  headerTitle: {
    margin: 0,
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadow: '0 0 5px rgba(0,0,0,0.8)',
  },
};