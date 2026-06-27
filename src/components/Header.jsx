import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header({ onSearchClick, cartCount = 0 }) {
  const location = useLocation();

  const handleSearchClick = (e) => {
    if (location.pathname !== '/') {
      // If not on home page, wait a tiny bit for navigation to home page before triggering focus
      setTimeout(() => {
        if (onSearchClick) onSearchClick();
      }, 100);
    } else {
      if (onSearchClick) onSearchClick();
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo-section">
          <div className="logo-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <span className="logo-text">Food<span className="logo-highlight">Express</span></span>
        </Link>

        <nav>
          <ul className="nav-menu">
            <li className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
              <Link to="/">
                <svg className="nav-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                <span>Home</span>
              </Link>
            </li>
            <li className="nav-item">
              <a href="#help">
                <svg className="nav-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                <span>Help</span>
              </a>
            </li>
            <li className="nav-item">
              <Link to="/" onClick={handleSearchClick}>
                <svg className="nav-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <span>Search</span>
              </Link>
            </li>
            <li className="nav-item">
              <a href="#cart">
                <svg className="nav-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                <span>Cart</span>
                <span className="cart-count">{cartCount}</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
