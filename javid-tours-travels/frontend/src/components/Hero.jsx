import React from "react";
import { Link } from "react-router-dom";
import busImage from "../assets/bus.jpg";
import "../styles/hero.css";
import { CheckCircle, Users, ChevronRight } from "lucide-react";

function Hero() {
  return (
    <section className="hero-pro">
      <div className="hero-shell">
        <div className="hero-copy">
          <span className="hero-kicker">Trusted Since 2000</span>
          <h1>Explore Goa in <span className="text-gradient">Comfort & Style</span></h1>
          <p className="hero-description">
            Premium group and corporate transport with professional drivers and 
            flexible itineraries. Experience the best of Goa without the stress.
          </p>

          <div className="hero-badges">
            <span><CheckCircle size={14} /> Private AC</span>
            <span><CheckCircle size={14} /> Pro Drivers</span>
            <span><CheckCircle size={14} /> 24/7 Support</span>
          </div>

          <div className="hero-actions">
            <Link to="/contact" className="btn-primary">
              Book Your Tour <ChevronRight size={18} />
            </Link>
            <Link to="/fleet" className="btn-secondary-outline">
              View Fleet
            </Link>
          </div>
        </div>

        <div className="hero-media">
          <div className="image-card">
            <img src={busImage} alt="Javid Tours executive travel bus" />
            <div className="floating-stat">
              <Users size={20} />
              <span><strong>500+</strong> Groups Served</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;