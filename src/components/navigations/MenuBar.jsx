import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './MenuBar.css';

const MenuBar = () => {
  const [click, setClick] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  // Handle scrolling effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`nav-container ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar">
        <Link to="/" className="logo" onClick={closeMobileMenu}>
          <img src='/logo.svg' alt="Golden City Logo" />
          <span>Golden City</span>
        </Link>
        
        <div className="menu-icon" onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        
        <div className="menu-container">
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className="nav-item">
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  isActive ? "nav-links active" : "nav-links"
                }
                onClick={closeMobileMenu}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                to="/marketplace" 
                className={({ isActive }) => 
                  isActive ? "nav-links active" : "nav-links"
                }
                onClick={closeMobileMenu}
              >
                Marketplace
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                to="/about" 
                className={({ isActive }) => 
                  isActive ? "nav-links active" : "nav-links"
                }
                onClick={closeMobileMenu}
              >
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                to="/faq" 
                className={({ isActive }) => 
                  isActive ? "nav-links active" : "nav-links"
                }
                onClick={closeMobileMenu}
              >
                FAQ
              </NavLink>
            </li>
          </ul>
          <button className="nav-btn">Connect Wallet</button>
        </div>
      </div>
    </nav>
  );
};

export default MenuBar;