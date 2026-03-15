import busImage from "../assets/bus.jpg";
import { Link } from "react-router-dom";

function Home() {
  const whyChoosePoints = [
    "Customized itineraries tailored to your interests.",
    "Reliable service with professional drivers and maintained vehicles.",
    "Coverage across North Goa and South Goa attractions.",
    "Affordable luxury with transparent and competitive pricing."
  ];

  const inclusions = [
    "Private AC vehicle matched to your group size.",
    "Professional and courteous driver.",
    "Complimentary mineral water for each participant.",
    "Parking, fuel, and toll charges included."
  ];

  const exclusions = [
    "Personal expenses like shopping and souvenirs.",
    "Meals and beverages.",
    "Entry tickets for forts, museums, and water sports.",
    "Boat rides and tips."
  ];

  return (
    <div className="home-page">
      <section className="hero hero-pro">
        <div className="hero-shell">
          <div className="hero-copy animate-slide-up">
            <p className="hero-kicker">Trusted Since 2000</p>
            <h1>Explore Goa in Comfort and Style</h1>
            <p>
              Premium group and corporate transport with reliable drivers,
              comfortable vehicles, and flexible itineraries.
            </p>

            <div className="hero-badges">
              <span>Private AC Vehicles</span>
              <span>Professional Drivers</span>
              <span>North and South Goa</span>
            </div>

            <Link to="/contact" className="hero-btn">
              Book Your Tour
            </Link>
          </div>

          <div className="hero-media animate-zoom-in">
            <img src={busImage} alt="Javid Tours executive travel bus" />
          </div>
        </div>
      </section>

      <section className="home-intro page-section">
        <h2>Welcome to Javid Tours and Travels</h2>
        <p>
          Javid Tours and Travels is your trusted partner for unforgettable
          travel experiences in Goa. With more than two decades of experience,
          we create journeys that balance comfort, punctuality, and local
          expertise for family trips, group tours, and corporate travel.
        </p>
      </section>

      <section className="home-benefits page-section">
        <h2>Why Choose Us</h2>
        <div className="home-list-grid">
          {whyChoosePoints.map((point) => (
            <article className="home-info-card" key={point}>
              <p>{point}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-terms page-section">
        <h2>Important Notes</h2>
        <div className="home-list-grid">
          <article className="home-info-card">
            <h3>Pricing</h3>
            <p>
              Tour pricing depends on selected locations and itinerary. Contact
              us for a customized quote.
            </p>
          </article>
          <article className="home-info-card">
            <h3>Duration</h3>
            <p>
              Most sightseeing plans are full-day tours of approximately 8
              hours.
            </p>
          </article>
          <article className="home-info-card">
            <h3>Pick-Up and Drop-Off</h3>
            <p>
              Tours begin and end at your preferred location within Goa for
              maximum convenience.
            </p>
          </article>
        </div>
      </section>

      <section className="home-inclusions page-section">
        <h2>Inclusions and Exclusions</h2>
        <div className="home-two-column">
          <article className="home-info-card">
            <h3>Tour Inclusions</h3>
            <ul>
              {inclusions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="home-info-card">
            <h3>Exclusions</h3>
            <ul>
              {exclusions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="home-fleet page-section">
        <h2>Travel in Style</h2>
        <div className="home-two-column">
          <article className="home-info-card">
            <h3>SML Isuzu Executive 13-Seater</h3>
            <p>
              Ideal for group tours and corporate travel with AC seating, ample
              luggage capacity, and modern comfort features.
            </p>
          </article>

          <article className="home-info-card">
            <h3>Force Motors Urbania 16-Seater</h3>
            <p>
              Perfect for larger groups seeking premium comfort, flexible travel
              plans, and smooth long-distance journeys in Goa and beyond.
            </p>
          </article>
        </div>

        <div className="home-cta">
          <Link to="/contact" className="hero-btn">
            Request a Quote
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;