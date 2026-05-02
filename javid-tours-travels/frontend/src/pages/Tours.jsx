import React, { useState } from "react";
import { 
  Umbrella, 
  Castle, 
  Church, 
  Leaf, 
  Map, 
  Navigation, 
  Camera 
} from "lucide-react";
import "../styles/tours.css";

function Tours() {
  const [activeTab, setActiveTab] = useState("north");

  const northGoaPlaces = [
    { title: "Baga & Calangute", description: "Bustling stretches known for beach shacks, water sports, and nightlife.", Icon: Umbrella },
    { title: "Anjuna Beach", description: "Famous for its lively flea market, vibrant vibe, and cliffside views.", Icon: Camera },
    { title: "Vagator & Chapora", description: "Known for red cliffs, dramatic sunsets, and access to Chapora Fort.", Icon: Navigation },
    { title: "Candolim Beach", description: "A calmer golden-sand shoreline ideal for relaxing beach time.", Icon: Umbrella },
    { title: "Arambol Beach", description: "A laid-back beach setting with a bohemian and peaceful atmosphere.", Icon: Leaf },
    { title: "Fort Aguada", description: "Historic Portuguese fort with sea views and landmark lighthouse.", Icon: Castle },
    { title: "Chapora Fort", description: "A scenic fort offering panoramic views especially striking at sunset.", Icon: Castle },
    { title: "Old Goa Churches", description: "Visit heritage sites like Basilica of Bom Jesus and Se Cathedral.", Icon: Church },
    { title: "Immaculate Conception", description: "Landmark church known for its iconic white facade and staircase.", Icon: Church }
  ];

  const southGoaPlaces = [
    { title: "Figueiredo Mansion", description: "A centuries-old Portuguese mansion showcasing Goa's colonial heritage.", Icon: Map },
    { title: "Bigfoot Museum", description: "A cultural museum that presents local traditions and folklore.", Icon: Map },
    { title: "Margao City", description: "South Goa's commercial center with lively markets and local charm.", Icon: Navigation },
    { title: "Colva Beach", description: "A popular beach destination with a wide shore and calm coastal energy.", Icon: Umbrella },
    { title: "Majorda Beach", description: "A serene shoreline known for clean sands and a relaxed atmosphere.", Icon: Umbrella },
    { title: "Cabo de Rama Fort", description: "Historic fort ruins with sweeping views of the Arabian Sea.", Icon: Castle },
    { title: "Shantadurga Temple", description: "A revered temple reflecting Goa's spiritual and architectural heritage.", Icon: Church },
    { title: "Spice Plantation", description: "Guided tours through lush plantations with insights into local spices.", Icon: Leaf }
  ];

  const currentPlaces = activeTab === "north" ? northGoaPlaces : southGoaPlaces;

  return (
    <div className="tours-page">
      <section className="tours-hero">
        <div className="section-header">
          <span className="subtitle">Curated Itineraries</span>
          <h1>Explore the <span className="text-gradient">Heart of Goa</span></h1>
          <p className="header-p">Discover pristine beaches, historic forts, and rich cultural heritage with our expert sightseeing plans.</p>
        </div>
      </section>

      <div className="tours-content-wrapper">
        <div className="tab-navigation">
          <button 
            className={`tab-btn ${activeTab === "north" ? "active" : ""}`} 
            onClick={() => setActiveTab("north")}
          >
            North Goa Highlights
          </button>
          <button 
            className={`tab-btn ${activeTab === "south" ? "active" : ""}`} 
            onClick={() => setActiveTab("south")}
          >
            South Goa Highlights
          </button>
        </div>

        <div className="places-grid animate-fade-in">
          {currentPlaces.map(({ title, description, Icon }) => (
            <article className="place-card" key={title}>
              <div className="place-icon-container">
                <Icon size={28} />
              </div>
              <div className="place-info">
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Tours;