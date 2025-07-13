import React from 'react';
import { useLocation } from 'react-router-dom';

const Sidebar = ({ onNavigate }) => {
  const location = useLocation();
  const navItems = [
    {
      id: 'dashboard',
      href: '/dashboard',
      icon: 'bx bx-home-alt',
      label: 'Dashboard'
    },
    {
      id: 'patients',
      href: '/patients',
      icon: 'bx bx-user',
      label: 'Patient Records'
    },
    {
      id: 'analytics',
      href: '/analytics',
      icon: 'bx bx-line-chart',
      label: 'Analytics'
    },
    {
      id: 'reports',
      href: '/reports',
      icon: 'bx bx-file',
      label: 'Reports'
    },
    {
      id: 'settings',
      href: '/settings',
      icon: 'bx bx-cog',
      label: 'Settings'
    },
    {
      id: 'logout',
      href: '/',
      icon: 'bx bx-door-open',
      label: 'Logout'
    }
  ];

  return (
    <div className="sidebar text-white flex-shrink-0 d-none d-md-flex flex-column" style={{ width: '16rem' }}>
      <div className="p-4 text-center border-bottom border-warning">
        <img 
          src="/image/logo.png"
          alt="ISPSC Logo" 
          className="mx-auto" 
          style={{ height: '9rem' }} 
        />
        <h1 className="h4 fw-bold mt-2">PredictiCare</h1>
        <p className="text-black fw-bold small">Ilocos Sur Polytechnic State College
          <span className='fw-lighter'  >- Tagudin Campus</span></p>
      </div>
      
      <style>{`
      .sidebar {
          background: #970000;
      }
        .sidebar .sidebar-btn {
          background: transparent;
          color: #fff;
          border: none;
          transition: background 0.2s, color 0.2s;
        }
        .sidebar .sidebar-btn:hover {
          background:  #006400;
          color: #000;
        }
        .sidebar .sidebar-btn.active, .sidebar .sidebar-btn.active:focus {
          background:  rgb(18, 178, 18);
          color: black;
        }
      `}</style>
      
      <nav className="flex-grow-1 p-4 d-flex flex-column gap-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href || (item.href === '/' && location.pathname === '');
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.href)}
              className={`sidebar-btn d-flex align-items-center p-2 rounded nav-link w-100 text-start${isActive ? ' active' : ''}`}
            >
              <i className={item.icon} style={{ fontSize: '1.5rem' }}></i>
              <span className="ms-3">{item.label}</span>
            </button>
          );
        })}
      </nav>
      
      <div className="p-4 border-top border-warning">
        <div className="d-flex align-items-center">
          <img 
            src="image/logo.png" 
            alt="User  profile" 
            className="rounded-circle me-2" 
            style={{ height: '3rem', width: '3rem' }} 
          />
          <div>
            <p className="fw-semibold mb-0">Nurse Name</p>
            <p className="small text-black mb-0">ISPSC  <br/> - Tagudin Campus</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
