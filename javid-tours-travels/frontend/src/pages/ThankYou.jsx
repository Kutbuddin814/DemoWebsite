import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle, ArrowLeft, Clock, PhoneCall } from "lucide-react";
import "../styles/thankyou.css";

function ThankYou() {
  return (
    <div className="thankyou-page">
      <div className="thankyou-container">
        <div className="thankyou-card">
          {/* Animated Success Header */}
          <div className="success-icon-wrapper">
            <CheckCircle size={80} className="success-icon" />
            <div className="confetti-placeholder">🎉</div>
          </div>

          <div className="thankyou-content">
            <span className="status-badge">Inquiry Confirmed</span>
            <h1>Thank You for Choosing <br /><span className="text-gold">Javid Tours</span></h1>
            
            <p className="main-msg">
              Your journey starts here! We've received your request and our 
              travel experts are already curating the best options for you.
            </p>

            {/* Trust Indicators */}
            <div className="next-steps">
              <div className="step-item">
                <Clock size={20} />
                <span>Response within <strong>30 mins</strong></span>
              </div>
              <div className="step-item">
                <PhoneCall size={20} />
                <span>Personalized consultation</span>
              </div>
            </div>

            <div className="thankyou-actions">
              <Link to="/" className="btn-home-back">
                <ArrowLeft size={18} /> Back to Homepage
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative background element */}
        <div className="bg-blur-circle"></div>
      </div>
    </div>
  );
}

export default ThankYou;