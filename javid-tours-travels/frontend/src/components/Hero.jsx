import busImage from "../assets/bus.jpg";

function Hero() {
  return (
    <div className="hero">
      <img src={busImage} alt="Javid Tours" />
      <div className="hero-text">
        <h1>Welcome to Javid Tours & Travels</h1>
        <p>Your trusted travel partner in Goa since 2001</p>
      </div>
    </div>
  );
}

export default Hero;