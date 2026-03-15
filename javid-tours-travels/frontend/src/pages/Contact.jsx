import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.email) {
      alert("Please fill all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(
        `${apiBaseUrl}/api/book`,
        formData,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

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
      console.error(error);
      const errorMessage =
        error?.response?.data?.message ||
        "Server error. Please try again later.";
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-box">
        <h1>Book Your Tour Today</h1>

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            inputMode="numeric"
            pattern="[0-9]{10}"
            title="Enter a valid 10-digit phone number"
            required
          />

          <input
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Tell us your travel plan..."
            value={formData.message}
            onChange={handleChange}
          />

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Inquiry"}
          </button>
        </form>

        <p className="contact-note">
          Prefer instant support? WhatsApp us on 9767856773.
        </p>
      </div>
    </div>
  );
}

export default Contact;