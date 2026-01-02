import { useTranslation } from 'react-i18next';
import { useState, useRef, useEffect } from 'react';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'en', name: 'English', countryCode: 'US' },
    { code: 'ko', name: '한국어', countryCode: 'KR' }
  ];

  const changeLanguage = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  return (
    <div className="language-switcher position-relative" ref={dropdownRef}>
      <button 
        className="btn d-flex align-items-center gap-2" 
        type="button" 
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        style={{ 
          border: 'none', 
          fontSize: '14px',
          padding: '8px 12px',
          color: '#333',
          backgroundColor: 'transparent',
          cursor: 'pointer'
        }}
      >
        <span 
          style={{ 
            fontSize: '12px', 
            fontWeight: 600, 
            color: '#666',
            textTransform: 'uppercase'
          }}
        >
          {currentLanguage.countryCode}
        </span>
        <span style={{ color: '#333', fontWeight: 500 }}>{currentLanguage.name}</span>
        <i 
          className={`fa-solid fa-chevron-${isOpen ? 'up' : 'down'}`} 
          style={{ fontSize: '10px', color: '#666', marginLeft: '4px' }}
        ></i>
      </button>
      
      {isOpen && (
        <ul 
          className="position-absolute bg-white border rounded shadow-sm"
          role="listbox"
          aria-label="Select language"
          style={{ 
            top: '100%',
            right: 0,
            marginTop: '4px',
            padding: '8px 0',
            minWidth: '160px',
            zIndex: 1050,
            listStyle: 'none',
            border: '1px solid #e5e5e5'
          }}
        >
          {languages.map((language) => (
            <li key={language.code}>
              <button 
                role="option"
                aria-selected={i18n.language === language.code}
                className="w-100 d-flex align-items-center gap-3 border-0 bg-transparent text-start"
                onClick={() => changeLanguage(language.code)}
                style={{ 
                  padding: '10px 16px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  color: i18n.language === language.code ? '#0066cc' : '#333',
                  backgroundColor: i18n.language === language.code ? '#f0f7ff' : 'transparent',
                  transition: 'background-color 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  if (i18n.language !== language.code) {
                    e.currentTarget.style.backgroundColor = '#f5f5f5';
                  }
                }}
                onMouseLeave={(e) => {
                  if (i18n.language !== language.code) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <span 
                  style={{ 
                    fontSize: '12px', 
                    fontWeight: 600, 
                    color: '#888',
                    minWidth: '24px'
                  }}
                >
                  {language.countryCode}
                </span>
                <span style={{ fontWeight: i18n.language === language.code ? 500 : 400 }}>
                  {language.name}
                </span>
                {i18n.language === language.code && (
                  <i className="fa-solid fa-check ms-auto" style={{ fontSize: '12px', color: '#0066cc' }}></i>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSwitcher;