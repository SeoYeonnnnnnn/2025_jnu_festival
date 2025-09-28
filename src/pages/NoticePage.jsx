import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// --- 이미지 갤러리 모달 컴포넌트 (변경 없음) ---
const ImageModal = ({ images, initialIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
      else if (event.key === 'ArrowRight') nextImage();
      else if (event.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, nextImage, prevImage]);

  return (
    <div
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-full"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute -top-2 -right-2 text-white text-4xl z-10 p-2 bg-black/50 rounded-full hover:bg-black/70 transition">&times;</button>
        <img src={`/assets/${images[currentIndex]}`} alt={`공지 이미지 ${currentIndex + 1}`} className="w-full max-h-[80vh] object-contain rounded-lg" />
        {images.length > 1 && (
          <>
            <button onClick={(e) => { e.stopPropagation(); prevImage(); }} className="absolute left-2 top-1/2 -translate-y-1/2 p-3 text-white text-3xl bg-black/50 rounded-full hover:bg-black/70 transition">&lt;</button>
            <button onClick={(e) => { e.stopPropagation(); nextImage(); }} className="absolute right-2 top-1/2 -translate-y-1/2 p-3 text-white text-3xl bg-black/50 rounded-full hover:bg-black/70 transition">&gt;</button>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black/50 px-3 py-1 rounded-full text-sm font-semibold">{currentIndex + 1} / {images.length}</div>
          </>
        )}
      </div>
    </div>
  );
};

// ▼▼▼ [수정] 데이터에서 content 속성 제거 ▼▼▼
const noticeData = [
  {
    id: 1,
    title: "1. 총학생회 물품대여사업 및 소통창구 운영 일시 중단 안내",
    images: ['총학생회 물품대여사업 및 소통창구 운영 일시 중단 안내.png']
  },
  {
    id: 2,
    title: "2. 현장 촬영 안내",
    images: ['현장 촬영 안내.png']
  },
  {
    id: 3,
    title: "3. 교통 통제 구역 및 우회도로 안내",
    images: ['통제1.png','통제2.png','통제3.png',]
  },
  {
    id: 4,
    title: "4. 우천 시 대비 안내",
    images: ['우천.png']
  },
  {
    id: 5,
    title: "5. 안전관련 안내",
    images: ['안전1.png','안전2.png','안전3.png','안전4.png','안전5.png','안전6.png','안전7.png',]
  },
  

];

function NoticePage() {
  const navigate = useNavigate();
  
  const [modalState, setModalState] = useState({
    isOpen: false,
    images: [],
    initialIndex: 0
  });

  const openModal = (images, index) => {
    setModalState({ isOpen: true, images, initialIndex: index });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, images: [], initialIndex: 0 });
  };
  
  const handleBackClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <div className="w-full min-h-screen bg-gray-900">
      <div className="fixed inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: `url(/assets/배경.png)` }}/>
      <div className="fixed inset-0 bg-black/50" />
      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fade-in-up 0.5s ease-out forwards; opacity: 0; }
      `}</style>
      
      <div style={styles.headerContainer}>
        <button type="button" onClick={handleBackClick} style={styles.backButton}>
          <svg width="24" height="24" viewBox="0 0 24 24"><path d="M15 18L9 12L15 6" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <h1 style={styles.headerTitle}>공지사항</h1>
      </div>
      
      <div className="relative z-10 max-w-md mx-auto pb-10 pt-20">
        <div className="px-4 grid grid-cols-1 gap-5">
          {noticeData.map((notice, index) => {
            const thumbnail = notice.images && notice.images.length > 0 ? notice.images[0] : null;
            return (
              <div
                key={notice.id}
                className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 flex items-center gap-4 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex-1 min-w-0">
                  {/* ▼▼▼ [수정] truncate 클래스 제거 ▼▼▼ */}
                  <h3 className="text-md font-bold text-white">{notice.title}</h3>
                </div>
                
                {thumbnail && (
                  <img 
                    src={`/assets/${thumbnail}`} 
                    alt={`${notice.title} 썸네일`} 
                    className="w-24 h-24 rounded-lg object-cover bg-gray-700 flex-shrink-0 cursor-pointer hover:scale-105 transition-transform duration-300" 
                    onClick={() => openModal(notice.images, 0)}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {modalState.isOpen && (
        <ImageModal 
          images={modalState.images}
          initialIndex={modalState.initialIndex}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

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
    backgroundColor: 'rgba(0,0,0,0.1)',
    backdropFilter: 'blur(10px)',
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
    textShadow: '0 1px 3px rgba(0,0,0,0.5)',
  },
};

export default NoticePage;