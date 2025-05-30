import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    if (isHomePage) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [isHomePage]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`navigation ${isHomePage ? 'home-nav' : ''} ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-brand">
        <Link to="/">Nathan Goel</Link>
      </div>
      <button className="hamburger" onClick={toggleMenu} aria-label="Toggle menu">
        <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
        <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
        <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
      </button>
      <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        <li className={location.pathname === '/' ? 'active' : ''}>
          <Link to="/" onClick={() => setIsMenuOpen(false)}>HOME</Link>
        </li>
        <li className={location.pathname === '/about' ? 'active' : ''}>
          <Link to="/about" onClick={() => setIsMenuOpen(false)}>ABOUT</Link>
        </li>
        <li className={location.pathname === '/portfolio' ? 'active' : ''}>
          <Link to="/portfolio" onClick={() => setIsMenuOpen(false)}>PORTFOLIO</Link>
        </li>
        <li className={location.pathname === '/gallery' ? 'active' : ''}>
          <Link to="/gallery" onClick={() => setIsMenuOpen(false)}>GALLERY</Link>
        </li>
        <li className={location.pathname === '/contact' ? 'active' : ''}>
          <Link to="/contact" onClick={() => setIsMenuOpen(false)}>CONTACT</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation; 