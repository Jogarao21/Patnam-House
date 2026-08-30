import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';
import logoImage from '../assets/patnam_house.jpeg';

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : 'unset';
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = 'unset';
  };

  const handleLogoClick = () => {
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    closeMobileMenu();
  };


  // Nav links: path is the route, label is the display text
  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/menu', label: 'Menu' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/reviews', label: 'Reviews' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <nav className={`navbar ${isSticky ? 'navbar--sticky' : ''}`}>
        <div className="navbar__container">
          {/* Logo */}
          <div className="navbar__logo" onClick={handleLogoClick}>
            <img src={logoImage} alt="Patnam House" className="navbar__logo-img" />
            <span className="navbar__logo-tooltip">Patnam House</span>
          </div>

          {/* Desktop & Mobile Menu */}
          <ul className={`navbar__menu ${isMobileMenuOpen ? 'navbar__menu--active' : ''}`}>
            {navLinks.map(({ path, label }) => (
              <li key={path} className="navbar__item">
                <Link
                  to={path}
                  className={`navbar__link ${location.pathname === path ? 'navbar__link--active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>




          {/* Hamburger */}
          <button
            className={`navbar__hamburger ${isMobileMenuOpen ? 'navbar__hamburger--active' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Overlay */}
      {isMobileMenuOpen && <div className="navbar__overlay" onClick={toggleMobileMenu}></div>}
    </>
  );
};

export default Navbar;
