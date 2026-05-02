import React from "react";
import { Link } from "react-router-dom";
import busImage from "../assets/bus.jpg";
import { 
  CheckCircle, 
  XCircle, 
  ShieldCheck, 
  MapPin, 
  Clock, 
  CreditCard, 
  ChevronRight, 
  Users, 
  Star,
  Zap,
  ArrowRight
} from "lucide-react";

import "../styles/home.css";
import "../styles/navbar.css";
import "../styles/footer.css";

function Home() {
  const whyChoosePoints = [
    { 
      title: "Customized", 
      text: "Itineraries tailored to your specific interests and group pace.", 
      icon: <MapPin size={24} /> 
    },
    { 
      title: "Reliable", 
      text: "Professional drivers and strictly maintained vehicles for peace of mind.", 
      icon: <ShieldCheck size={24} /> 
    },
    { 
      title: "Coverage", 
      text: "Seamless travel across all North and South Goa attractions.", 
      icon: <Star size={24} /> 
    },
    { 
      title: "Transparent", 
      text: "Affordable luxury with clear, competitive, and honest pricing.", 
      icon: <CreditCard size={24} /> 
    }
  ];

  const inclusions = [
    "Private AC vehicle matched to your group size.",
    "Professional and courteous local driver.",
    "Complimentary mineral water for the journey.",
    "All parking, fuel, and toll charges covered."
  ];

  const exclusions = [
    "Personal expenses & shopping.",
    "Meals and beverages.",
    "Entry tickets to forts or museums.",
    "Activity fees (Boat rides, etc)."
  ];

  return (
    <div className="home-page">
      {/* --- HERO SECTION --- */}
      <section className="hero-pro">
        <div className="hero-overlay"></div>
        <div className="hero-shell">
          <div className="hero-copy">
            <div className="hero-kicker-wrapper">
              <span className="hero-kicker">
                <Zap size={14} fill="currentColor" /> Trusted Since 2000
              </span>
            </div>
            <h1>Premium Travel <br /><span className="text-gradient">Redefined in Goa</span></h1>
            <p className="hero-description">
              From corporate retreats to family getaways—experience seamless transport 
              with our executive fleet and local expertise. 
            </p>

            <div className="hero-badges">
              <span><CheckCircle size={14} className="text-yellow" /> Private AC</span>
              <span><CheckCircle size={14} className="text-yellow" /> Pro Drivers</span>
              <span><CheckCircle size={14} className="text-yellow" /> 24/7 Support</span>
            </div>

            <div className="hero-actions">
              <Link to="/contact" className="btn-primary">
                Book Your Tour <ChevronRight size={18} />
              </Link>
              <Link to="/fleet" className="btn-glass">
                View Our Fleet
              </Link>
            </div>
          </div>

          <div className="hero-media">
            <div className="image-card">
              <img src={busImage} alt="Javid Tours executive travel bus" />
              <div className="floating-stat">
                <div className="stat-icon"><Users size={20} /></div>
                <span><strong>500+</strong> Happy Groups</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- BENEFITS GRID --- */}
      <section className="page-section section-top-gap">
        <div className="section-header">
          
          <h2>Your Local Travel Experts</h2>
          <p className="header-p">
            With over two decades of expertise, we balance comfort, punctuality, 
            and local knowledge to create seamless journeys.
          </p>
        </div>
        <div className="feature-grid">
          {whyChoosePoints.map((point, index) => (
            <div className="feature-card" key={index}>
              <div className="icon-box">{point.icon}</div>
              <h3>{point.title}</h3>
              <p>{point.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- HIGHLIGHT BAR --- */}
      <section className="highlight-bar-wrapper">
        <div className="highlight-bar">
          <div className="highlight-item">
            <div className="icon-circle"><Clock size={28} /></div>
            <div className="highlight-text">
              <h3>Flexible Duration</h3>
              <p>Standard 8-hour tours or custom hourly plans.</p>
            </div>
          </div>
          <div className="highlight-sep"></div>
          <div className="highlight-item">
            <div className="icon-circle"><MapPin size={28} /></div>
            <div className="highlight-text">
              <h3>Doorstep Service</h3>
              <p>Pick-up and drop-off at any hotel or airport.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- INCLUSIONS / EXCLUSIONS --- */}
      <section className="page-section split-details">
        <div className="detail-panel inclusion-panel">
          <h3><CheckCircle className="text-success" /> Tour Inclusions</h3>
          <ul className="custom-list">
            {inclusions.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
        <div className="detail-panel exclusion-panel">
          <h3><XCircle className="text-danger" /> Exclusions</h3>
          <ul className="custom-list">
            {exclusions.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
      </section>

      {/* --- FLEET SECTION --- */}
      <section className="page-section fleet-section">
        <div className="section-header">
          <span className="subtitle">Executive Fleet</span>
          <h2>Travel in True Comfort</h2>
        </div>
        <div className="fleet-grid">
          <div className="fleet-card">
            <div className="fleet-tag">Most Popular</div>
            <div className="fleet-content">
              <h3>SML Isuzu Executive</h3>
              <p className="capacity">13-Seater • AC • Luggage Space</p>
              <p className="desc">Perfect for corporate groups and medium-sized family outings with modern amenities.</p>
              <Link to="/contact" className="fleet-link">Enquire Now <ArrowRight size={16} /></Link>
            </div>
          </div>
          <div className="fleet-card featured">
            <div className="fleet-tag">Premium Choice</div>
            <div className="fleet-content">
              <h3>Force Urbania</h3>
              <p className="capacity">16-Seater • AC • Luxury Seating</p>
              <p className="desc">The gold standard for luxury travel, offering a silent and smooth ride for large groups.</p>
              <Link to="/contact" className="fleet-link">Enquire Now <ArrowRight size={16} /></Link>
            </div>
          </div>
        </div>
        <div className="fleet-cta">
          <Link to="/contact" className="btn-primary">Request a Custom Quote</Link>
        </div>
      </section>
    </div>
  );
}

export default Home;