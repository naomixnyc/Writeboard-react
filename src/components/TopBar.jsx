import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './TopBar.css';

function TopBar({ searchTerm, onSearchChange, isAuthenticated, onLogout, openLoginModal }) {
  const [showSearch, setShowSearch] = useState(false);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);

  const toggleSearch = () => {
    setShowSearch(prev => !prev);
  };

  const handleInputChange = (e) => {
    onSearchChange(e);
    navigate(`/?search=${encodeURIComponent(e.target.value)}`);
  };

  return (
    <>
      <div className="topbar">
        {/* left section */}
        <div className="topbar-left">
          <div className="burger">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
        </div>

        {/* center logo section */}
        <div className="topbar-center">
          <div className="logo">
            <svg width="16" height="16"><circle cx="8" cy="8" r="7" fill="white" /></svg>
            <svg width="16" height="16"><polygon points="8,2 14,14 2,14" fill="white" /></svg>
            <svg width="16" height="16"><rect x="2" y="2" width="12" height="12" fill="white" /></svg>
          </div>
        </div>

        {/* right section */}
        <div className="topbar-right">
          <button className="auth-button" onClick={isAuthenticated ? onLogout : openLoginModal}>
            {isAuthenticated ? 'Log out' : 'Log in / Sign up'}
          </button>

          <button onClick={toggleSearch} className="search-button" aria-label="Search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </div>
      </div>

      {/* search dropdown */}
      {showSearch && (
      <div className="search-dropdown">
        <input
          type="text"
          placeholder="Search articles..."
          className="search-input"
          ref={searchInputRef}
          value={searchTerm}
          onChange={handleInputChange}
        />
      </div>
      )}
    </>
  );
}

export default TopBar;
