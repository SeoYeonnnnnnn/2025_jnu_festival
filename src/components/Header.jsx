import React from 'react';
import { useNavigate } from 'react-router-dom';

// 1. 아이콘 색상을 흰색으로 변경합니다.
const BackIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 18L9 12L15 6" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// 2. transparent prop을 추가하여 헤더 스타일을 동적으로 제어합니다.
function Header({ title, onBackClick, transparent = false }) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      navigate(-1);
    }
  };

  const headerStyle = {
    position: 'sticky',
    top: 0,
    left: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '56px',
    zIndex: 20,
    transition: 'background-color 0.3s ease',
    // 3. transparent prop 값에 따라 배경을 다르게 설정합니다.
    backgroundColor: transparent ? 'transparent' : 'rgba(255, 255, 255, 0.8)',
    backdropFilter: transparent ? 'none' : 'blur(10px)',
    boxShadow: transparent ? 'none' : '0 2px 4px rgba(0,0,0,0.1)',
  };
  
  const titleStyle = {
      margin: 0,
      fontSize: '18px',
      fontWeight: 'bold',
      // 4. transparent prop 값에 따라 글자색을 다르게 설정합니다.
      color: transparent ? '#FFFFFF' : '#333333',
  }

  return (
    <div style={headerStyle}>
      <button type="button" onClick={handleBack} style={styles.backButton}>
        {/* transparent일 때만 흰색 아이콘이 보이도록 할 수 있지만, 여기서는 흰색으로 통일합니다. */}
        <BackIcon />
      </button>
      <h1 style={titleStyle}>{title}</h1>
    </div>
  );
}

const styles = {
  backButton: {
    position: 'absolute',
    left: '16px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default Header;

