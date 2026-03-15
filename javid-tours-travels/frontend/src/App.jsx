import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Services from "./pages/Services";
import Tours from "./pages/Tours";
import Contact from "./pages/Contact";
import ThankYou from "./pages/ThankYou";
import WhatsAppFloat from "./components/WhatsAppFloat";


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/tours" element={<Tours />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
      <WhatsAppFloat />
      <Footer />
    </BrowserRouter>
  );
}

export default App;