import { Link } from "react-router-dom";

function ThankYou() {
  return (
    <div className="thankyou-page">
      <div className="thankyou-box">
        <h1>🎉 Thank You!</h1>
        <p>
          Your inquiry has been received.
          Our travel expert will contact you within 30 minutes.
        </p>

        <Link to="/" className="hero-btn">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default ThankYou;