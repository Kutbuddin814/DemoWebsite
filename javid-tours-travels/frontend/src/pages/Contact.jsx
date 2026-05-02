import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Phone, Mail, MapPin, Send, MessageSquare } from "lucide-react";
import "../styles/contact.css";

function Contact() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const apiBaseUrl =
    import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") ||
    "http://localhost:5000";

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) {
      alert("Please fill all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post(`${apiBaseUrl}/api/book`, formData);

      if (response.data.success) {
        window.open(
          "https://wa.me/919767856773?text=Hello%20Javid%20Tours%2C%20I%20just%20submitted%20a%20tour%20inquiry.",
          "_blank"
        );
        navigate("/thank-you");
      } else {
        alert("Failed to submit inquiry");
      }
    } catch (error) {
      alert("Server error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        {/* Left Side: Professional Info */}
        <div className="contact-info">
          <span className="subtitle">Get in Touch</span>
          <h1>Let's Plan Your <span className="text-gradient">Goa Journey</span></h1>
          <p>Have questions about our fleet or custom itineraries? Our team is ready to assist you 24/7.</p>
          
          <div className="info-items">
            <div className="info-item">
              <div className="info-icon"><Phone size={20} /></div>
              <div>
                <h4>Call or WhatsApp</h4>
                <p>+91 97678 56773</p>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon"><Mail size={20} /></div>
              <div>
                <h4>Email Us</h4>
                <p>info@javidtours.com</p>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon"><MapPin size={20} /></div>
              <div>
                <h4>Office Location</h4>
                <p>Vasco da Gama, Goa</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Modern Form Card */}
        <div className="contact-form-card">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Full Name</label>
              <input name="name" placeholder="Enter your name" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="input-group">
              <label>Phone Number</label>
              <input name="phone" placeholder="Enter your phone number" value={formData.phone} onChange={handleChange} inputMode="numeric" pattern="[0-9]{10}" required />
            </div>

            <div className="input-group">
              <label>Email Address</label>
              <input name="email" type="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="input-group">
              <label>Travel Plans / Message</label>
              <textarea name="message" placeholder="Tell us about your group size and destination..." value={formData.message} onChange={handleChange} />
            </div>

            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : <>Send Inquiry <Send size={18} /></>}
            </button>
          </form>
          
          <div className="whatsapp-redirect">
            <MessageSquare size={16} />
            <span>Instant support available via WhatsApp</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;