import React from "react";
import "../styles/fleet.css";
import bus1 from "../assets/bus1.png";
import bus2 from "../assets/bus2.png";
import { Link } from "react-router-dom";
import { FaWhatsapp, FaArrowRight } from "react-icons/fa";
import { MdOutlineAirlineSeatReclineExtra, MdAcUnit, MdSecurity } from "react-icons/md";

const WHATSAPP_NUMBER = "919767856773";

const vehicles = [
  {
    id: 1,
    name: "SML Isuzu Executive",
    tag: "Corporate Favorite",
    image: bus1,
    seats: "13 Seater",
    features: ["Climate Control", "Ergonomic Seats", "Ample Luggage"],
    desc: "The gold standard for corporate travel and medium-sized groups. Experience a smooth, vibration-free journey across Goa's scenic routes.",
  },
  {
    id: 2,
    name: "Force Urbania",
    tag: "Ultra Luxury",
    image: bus2,
    seats: "16 Seater",
    features: ["Silent Cabin", "Premium Leather", "Panoramic Windows"],
    desc: "Indulge in a first-class travel experience. The Urbania offers unparalleled cabin space and a whisper-quiet engine for maximum relaxation.",
  }
];

function Fleet() {
  const getWhatsappLink = (vName) => {
    const msg = encodeURIComponent(`Hello Javid Tours, I'm interested in booking the ${vName}.`);
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
  };

  return (
    <div className="fleet-page">
      {/* HEADER SECTION */}
      <section className="fleet-hero">
        <div className="hero-content">
          <span className="hero-kicker">Premium Collection</span>
          <h1>Our Executive Fleet</h1>
          <p>
            Curated for the discerning traveler. From silent cabins to ergonomic 
            lounging, our fleet redefines the journey, not just the destination.
          </p>
        </div>
      </section>

      {/* GRID SECTION */}
      <section className="fleet-container">
        <div className="fleet-grid">
          {vehicles.map((v) => (
            <div className="fleet-card" key={v.id}>
              <div className="fleet-image-wrapper">
                <div className="fleet-tag-badge">{v.tag}</div>
                <img src={v.image} alt={v.name} className="fleet-img" />
              </div>

              <div className="fleet-content">
                <div className="fleet-header-row">
                  <h3>{v.name}</h3>
                  <span className="seat-badge">
                    <MdOutlineAirlineSeatReclineExtra /> {v.seats}
                  </span>
                </div>

                <div className="feature-pills">
                  <span><MdAcUnit /> AC</span>
                  <span><MdSecurity /> Insured</span>
                </div>

                <p className="fleet-desc">{v.desc}</p>

                <ul className="fleet-specs">
                  {v.features.map((f, i) => <li key={i}>{f}</li>)}
                </ul>

                <div className="fleet-actions">
                  <Link to="/contact" className="fleet-btn-primary">
                    Book Now <FaArrowRight />
                  </Link>
                  <a
                    href={getWhatsappLink(v.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fleet-btn-wa"
                  >
                    <FaWhatsapp />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Fleet;