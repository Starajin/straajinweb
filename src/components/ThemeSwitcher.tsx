import { useState, useEffect } from 'react';

const ThemeSwitcher = () => {
  const [currentTheme, setCurrentTheme] = useState('theme-royal-blue');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'theme-royal-blue';
    setCurrentTheme(savedTheme);
    document.documentElement.className = savedTheme;
  }, []);

  const switchTheme = (theme: string) => {
    setCurrentTheme(theme);
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
  };

  return (
    <div style={{
      position: 'fixed',
      top: '100px',
      right: '20px',
      zIndex: 9999,
      backgroundColor: 'white',
      padding: '15px',
      borderRadius: '10px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
      minWidth: '180px'
    }}>
      <div style={{ 
        fontSize: '12px', 
        fontWeight: '600', 
        marginBottom: '10px',
        color: '#333',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
      }}>
        Choose Theme
      </div>
      
      <button
        onClick={() => switchTheme('theme-royal-blue')}
        style={{
          width: '100%',
          padding: '10px',
          marginBottom: '8px',
          border: currentTheme === 'theme-royal-blue' ? '2px solid #023EDA' : '1px solid #ddd',
          borderRadius: '6px',
          backgroundColor: currentTheme === 'theme-royal-blue' ? '#E3F2FD' : 'white',
          cursor: 'pointer',
          fontSize: '13px',
          fontWeight: currentTheme === 'theme-royal-blue' ? '600' : '400',
          transition: 'all 0.2s',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        <span style={{ 
          width: '16px', 
          height: '16px', 
          borderRadius: '3px',
          background: 'linear-gradient(135deg, #023EDA 50%, #ffc700 50%)',
          flexShrink: 0
        }}></span>
        Royal Blue & Gold
      </button>

      <button
        onClick={() => switchTheme('theme-teal-coral')}
        style={{
          width: '100%',
          padding: '10px',
          marginBottom: '8px',
          border: currentTheme === 'theme-teal-coral' ? '2px solid #0D9488' : '1px solid #ddd',
          borderRadius: '6px',
          backgroundColor: currentTheme === 'theme-teal-coral' ? '#CCFBF1' : 'white',
          cursor: 'pointer',
          fontSize: '13px',
          fontWeight: currentTheme === 'theme-teal-coral' ? '600' : '400',
          transition: 'all 0.2s',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        <span style={{ 
          width: '16px', 
          height: '16px', 
          borderRadius: '3px',
          background: 'linear-gradient(135deg, #0D9488 50%, #64748B 50%)',
          flexShrink: 0
        }}></span>
        Teal & Slate Grey
      </button>

      <button
        onClick={() => switchTheme('theme-navy-amber')}
        style={{
          width: '100%',
          padding: '10px',
          border: currentTheme === 'theme-navy-amber' ? '2px solid #1E3A8A' : '1px solid #ddd',
          borderRadius: '6px',
          backgroundColor: currentTheme === 'theme-navy-amber' ? '#DBEAFE' : 'white',
          cursor: 'pointer',
          fontSize: '13px',
          fontWeight: currentTheme === 'theme-navy-amber' ? '600' : '400',
          transition: 'all 0.2s',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        <span style={{ 
          width: '16px', 
          height: '16px', 
          borderRadius: '3px',
          background: 'linear-gradient(135deg, #1E3A8A 50%, #F59E0B 50%)',
          flexShrink: 0
        }}></span>
        Navy & Amber
      </button>
    </div>
  );
};

export default ThemeSwitcher;
