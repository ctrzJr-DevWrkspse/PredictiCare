import React from 'react';

const Header = ({ 
  title, 
  subtitle, 
  iconSrc, 
  iconAlt, 
  onSidebarToggle, 
  showExportButton = false,
  onExport 
}) => {
  return (
    <header className="bg-white shadow-sm"> 
      <div className="px-4 py-3 d-flex justify-content-between align-items-center"> 
        <div className="d-flex align-items-center"> 
          <button 
            onClick={onSidebarToggle}
            className="d-md-none me-3 btn btn-link text-secondary" 
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          {iconSrc && (
            <div className="position-relative" style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', overflow: 'hidden' }}>
              <img src={iconSrc} alt={iconAlt} className="w-100 h-100 object-fit-cover" /> 
            </div>
          )}
          <div className="ms-3">
            <h2 className="fs-5 fw-semibold text-dark mb-0">{title}</h2> 
            {subtitle && (
              <p className="text-secondary mb-0">{subtitle}</p>
            )}
          </div>
        </div>
        
        <div className="d-flex align-items-center">
          {showExportButton && (
            <button 
              onClick={onExport}
              className="btn btn-primary btn-sm me-3" 
            >
              Export Report
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
