import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackIcon = ({ color = '#333' }) => (
  <svg width="24" height="24" viewBox="0 0 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 18L9 12L15 6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

function Header({ title, onBackClick, transparent = false }) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      navigate(-1);
    }
  };

  // 1. 기본 스타일을 반투명으로 변경
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
    transition: 'all 0.3s ease',
    backgroundColor: transparent ? 'transparent' : 'rgba(255, 255, 255, 0.8)',
    backdropFilter: transparent ? 'none' : 'blur(10px)',
    boxShadow: transparent ? 'none' : '0 1px 2px rgba(0,0,0,0.1)',
  };
  
  const titleStyle = {
    margin: 0,
    fontSize: '18px',
    fontWeight: 'bold',
    color: transparent ? '#FFFFFF' : '#333333',
  }

  return (
    <div style={headerStyle}>
      <button type="button" onClick={handleBack} style={styles.backButton}>
        <BackIcon color={transparent ? '#FFFFFF' : '#333333'} />
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