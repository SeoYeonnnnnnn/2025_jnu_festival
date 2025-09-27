import React from 'react';

function FilterControls({ categoryConfig, activeFilter, onFilterChange }) {
  const mainCategories = [{ key: 'ALL', name: '전체', color: "#535353ff", activeColor: "#FFFFFF", icon: "전체.png" }];
  const iconCategories = [];

  Object.entries(categoryConfig).forEach(([key, config]) => {
    if (!config.parent) {
      mainCategories.push({ key, ...config });
    }
    if (['RESTROOM', 'AED', 'SMOKING_AREA', 'TRASH_CAN'].includes(key)) {
      iconCategories.push({ key, ...config });
    }
  });

  return (
    <>
      <div style={{
        padding: '20px 10px 10px 20px', // 좌우 여백만 설정
      }}>
        <div className="horizontal-scroll-container" style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
          {mainCategories.map((category) => (
            <button
              key={category.key}
              type="button"
              onClick={() => onFilterChange(category.key)}
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                marginRight: '8px', padding: '6px 12px', // 👈 버튼 크기 (padding) 줄임
                fontSize: '14px',  marginBottom: '10px',
                borderRadius: '20px', cursor: 'pointer',
                fontWeight: 'bold', boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                transition: 'all 0.2s ease',
                minWidth: 'fit-content',
                backgroundColor: activeFilter === category.key ? category.color : '#ffffff',
                color: activeFilter === category.key ? category.activeColor : category.color,
                border: `1.5px solid ${activeFilter === category.key ? category.color : '#ddd'}`,
              }}
            >
              {category.icon && (
                <img
                  src={`/assets/${category.icon}`}
                  alt={category.name}
                  style={{
                    width: '20px', height: '20px',
                    marginRight: '6px',
                    filter: activeFilter === category.key ? 'brightness(0) invert(1)' : 'none',
                  }}
                />
              )}
              {category.name}
            </button>
          ))}
        </div>
      </div>
      <div style={{
        position: 'absolute', top: '100px', right: '20px', zIndex: 10,
        display: 'flex', flexDirection: 'column', gap: '12px',
      }}>
        {iconCategories.map((iconCat) => (
          <button
            key={iconCat.key}
            type="button"
            onClick={() => onFilterChange(iconCat.key)}
            style={{
              width: '40px', height: '40px', borderRadius: '50%',
              border: '1px solid #ddd', display: 'flex', alignItems: 'center', justifyContent: 'center',
              backgroundColor: activeFilter === iconCat.key ? '#efefefff' : 'rgba(255, 255, 255, 0.1)',
              cursor: 'pointer', boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
              transition: 'all 0.2s ease'
            }}
            title={iconCat.name}
          >
            <img src={`/assets/${iconCat.icon}`} alt={iconCat.name} style={{ width: '23px', height: '23px' }} />
          </button>
        ))}
      </div>
    </>
  );
}
export default FilterControls;
