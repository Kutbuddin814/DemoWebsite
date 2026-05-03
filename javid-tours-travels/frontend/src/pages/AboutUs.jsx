import React from "react";
import "../styles/aboutus.css";

const AboutUs = () => {
  return (
    <div className="aboutus-container">
      <header className="aboutus-header">
        <span className="subtitle">Discover Our Story</span>
        <h1>Our Journey</h1>
        <p className="lead-text">
          At <strong>Javid Tours & Travels</strong>, we don’t just move you from point A to B; 
          we curate experiences that stay with you forever. From the winding roads of adventure 
          to the smooth lanes of corporate travel.
        </p>
      </header>

      <div className="grid-section">
        <div className="info-card">
          <div className="card-icon">🎯</div>
          <h2>Our Mission</h2>
          <p>
            To redefine travel by merging luxury, safety, and local expertise. 
            We strive to be the most trusted name in fleet services and 
            personalized holiday planning.
          </p>
        </div>
        <div className="info-card">
          <div className="card-icon">✨</div>
          <h2>Our Vision</h2>
          <p>
            Creating a world where every traveler feels like a guest of honor. 
            We focus on sustainable growth and unparalleled reliability.
          </p>
        </div>
      </div>

      <section className="features-section">
        <h2>Why Travel With Us?</h2>
        <ul className="features-list">
          <li>Expert Local Guides</li>
          <li>Premium Luxury Fleet</li>
          <li>Customized Itineraries</li>
          <li>24/7 Concierge Support</li>
          <li>Transparent Pricing</li>
          <li>Safety-First Protocol</li>
        </ul>
      </section>

      <footer className="aboutus-creator">
        <div className="creator-content">
          <h3 className="gradient-text">Digital Experience by Kutbuddin Shaikh</h3>
          <p>
            Transforming ideas into high-performance digital realities. Whether it's
            business growth, a personal brand, or a custom web application—I build
            solutions that deliver results across any industry.
          </p>

          <div className="creator-badges">
            <span>Full-Stack Development</span>
            <span>Responsive UI/UX</span>
            <span>Scalable Architecture</span>
            <span>SEO & Performance</span>
          </div>

          <div className="cta-group">
            <a href="https://wa.me/9175869470" className="whatsapp-btn" target="_blank" rel="noreferrer">
              <span className="btn-content">Chat on WhatsApp</span>
            </a>
          </div>

          <div className="social-links">
            <a href="https://www.linkedin.com/in/kutbuddin-shaikh" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://github.com/kutbuddin814" target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;