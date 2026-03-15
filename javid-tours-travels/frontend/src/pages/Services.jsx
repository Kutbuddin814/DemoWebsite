import { FaBus, FaBuilding, FaPlaneArrival, FaRoute, FaMapMarkedAlt, FaRing } from "react-icons/fa";

function Services() {
  return (
    <div className="services-page">

      <div className="services-header">
        <h1>Our Premium Services</h1>
        <p>
          Reliable transport solutions for tourism, events, and corporate travel
          across Goa and nearby states.
        </p>
      </div>

      <div className="services-container">

        <div className="service-card">
          <FaBus className="service-icon" />
          <h3>Group Tours</h3>
          <p>
            Comfortable AC buses for families, friends, and larger groups
            exploring Goa.
          </p>
        </div>

        <div className="service-card">
          <FaBuilding className="service-icon" />
          <h3>Corporate Transport</h3>
          <p>
            Professional transport support for meetings, team outings, and
            corporate events.
          </p>
        </div>

        <div className="service-card">
          <FaPlaneArrival className="service-icon" />
          <h3>Airport & Railway Pickup</h3>
          <p>
            Punctual pick-up and drop-off services from airports and railway
            stations.
          </p>
        </div>

        <div className="service-card">
          <FaRoute className="service-icon" />
          <h3>Outstation Travels</h3>
          <p>
            Comfortable outstation travel to Karnataka, Kerala, Tamil Nadu, and
            Hyderabad.
          </p>
        </div>

        <div className="service-card">
          <FaMapMarkedAlt className="service-icon" />
          <h3>Excursions</h3>
          <p>
            Curated excursions covering beaches, churches, heritage areas, and
            local highlights.
          </p>
        </div>

        <div className="service-card">
          <FaRing className="service-icon" />
          <h3>Wedding Transport</h3>
          <p>
            Organized and stylish transport arrangements for weddings and
            special celebrations.
          </p>
        </div>

      </div>
    </div>
  );
}

export default Services;