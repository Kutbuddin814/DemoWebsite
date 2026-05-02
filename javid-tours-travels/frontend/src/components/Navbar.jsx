import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logoImage from "../assets/Logo.png";
import { Menu, X, Phone } from "lucide-react";

import "../styles/navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  useEffect(() => setMenuOpen(false), [location.pathname]);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
        <div className="nav-container">

          {/* LOGO */}
          <Link to="/" className="logo-link">
            <img src={logoImage} alt="Javid Tours" className="logo-img" />
          </Link>

          {/* DESKTOP */}
          <div className="nav-desktop">
            <ul className="nav-links">
              <li><Link to="/" className={isActive("/") ? "active" : ""}>Home</Link></li>
              <li><Link to="/services" className={isActive("/services") ? "active" : ""}>Services</Link></li>
              <li><Link to="/tours" className={isActive("/tours") ? "active" : ""}>Tours</Link></li>
            </ul>

            <Link to="/contact" className="nav-cta-btn">Book Now</Link>
          </div>

          {/* MOBILE BUTTON */}
          <button className="mobile-toggle" onClick={() => setMenuOpen(true)}>
            <Menu size={26} />
          </button>
        </div>
      </nav>

      {/* 🔥 FULLSCREEN MOBILE MENU */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>

        <div className="mobile-header">
          
          <button onClick={() => setMenuOpen(false)}>
            <X size={28} />
          </button>
        </div>

        <div className="mobile-links">
          <Link to="/" className={isActive("/") ? "active" : ""}>Home</Link>
          <Link to="/services" className={isActive("/services") ? "active" : ""}>Services</Link>
          <Link to="/tours" className={isActive("/tours") ? "active" : ""}>Tours</Link>
        </div>

        <div className="mobile-footer">
          <a href="tel:+9767856773" className="mobile-support">
            <Phone size={18} /> Call Support
          </a>

          <Link to="/contact" className="mobile-btn">
            Book Your Tour
          </Link>
        </div>

      </div>
    </>
  );
}

export default Navbar;