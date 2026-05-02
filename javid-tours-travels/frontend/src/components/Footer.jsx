import { Link } from "react-router-dom";
import logoImage from "../assets/Logo.png";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">

        {/* BRAND */}
        <div className="footer-brand">
          <img src={logoImage} alt="Javid Tours" className="footer-logo" />
          <p>
            Your premier partner for luxury travel and group transport across Goa since 2000.
          </p>
        </div>

        {/* LINKS */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <Link to="/">Home</Link>
          <Link to="/tours">Tours</Link>
          <Link to="/services">Services</Link>
          <Link to="/contact">Contact</Link>
        </div>

        {/* CONTACT */}
        <div className="footer-contact">
          <h4>Contact Us</h4>
          <p>Vasco, South Goa</p>
          <p>info@javidtours.com</p>
          <p>+91 9822124331 / +91 97678 56773</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2000 - {currentYear} Javid Tours & Travels | All Rights Reserved</p>
      </div>
    </footer>
  );
}

export default Footer;