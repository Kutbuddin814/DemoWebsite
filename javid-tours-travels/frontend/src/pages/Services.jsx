import React from "react";
import { 
  Bus, 
  Building2, 
  PlaneLanding, 
  Route, 
  MapPin, 
  HeartHandshake, 
  ChevronRight 
} from "lucide-react";
import "../styles/services.css";

const WHATSAPP_NUMBER = "919767856773"; // your number

function Services() {
  const serviceList = [
    {
      title: "Group Tours",
      desc: "Comfortable AC buses for families, friends, and larger groups exploring Goa.",
      icon: <Bus size={32} />
    },
    {
      title: "Corporate Transport",
      desc: "Professional transport support for meetings, team outings, and corporate events.",
      icon: <Building2 size={32} />
    },
    {
      title: "Airport & Railway",
      desc: "Punctual pick-up and drop-off services from all Goa transport hubs.",
      icon: <PlaneLanding size={32} />
    },
    {
      title: "Outstation Travels",
      desc: "Comfortable travel to Karnataka, Kerala, Tamil Nadu, and Hyderabad.",
      icon: <Route size={32} />
    },
    {
      title: "Curated Excursions",
      desc: "Bespoke tours covering beaches, heritage sites, and local Goan highlights.",
      icon: <MapPin size={32} />
    },
    {
      title: "Wedding Events",
      desc: "Organized and stylish transport arrangements for your special celebrations.",
      icon: <HeartHandshake size={32} />
    }
  ];

  // ✅ Function to generate WhatsApp link
  const getWhatsappLink = (serviceTitle) => {
    const message = encodeURIComponent(
      `Hello Javid Tours, I want to inquire about ${serviceTitle}.`
    );
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
  };

  return (
    <div className="services-page">
      <section className="services-hero">
        <div className="section-header">
          <span className="subtitle">Expert Solutions</span>
          <h1>Our Premium <span className="text-gradient">Services</span></h1>
          <p className="header-p">
            Reliable transport solutions for tourism, events, and corporate travel 
            across Goa and nearby states.
          </p>
        </div>
      </section>

      <section className="services-grid-container">
        <div className="services-grid">
          {serviceList.map((service, index) => (
            <div className="service-card" key={index}>
              
              <div className="service-icon-wrapper">
                {service.icon}
              </div>

              <h3>{service.title}</h3>
              <p>{service.desc}</p>

              {/* ✅ WHATSAPP BUTTON */}
              <a
                href={getWhatsappLink(service.title)}
                target="_blank"
                rel="noopener noreferrer"
                className="card-footer"
              >
                <span>Inquire Now</span>
                <ChevronRight size={16} />
              </a>

            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Services;