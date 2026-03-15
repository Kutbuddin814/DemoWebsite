import { FaWhatsapp } from "react-icons/fa";

const WHATSAPP_NUMBER = "919767856773";

function WhatsAppFloat() {
  const message = encodeURIComponent(
    "Hello Javid Tours, I would like to know more about your Goa tour packages."
  );

  return (
    <a
      className="whatsapp-float"
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      title="Chat with us on WhatsApp"
    >
      <FaWhatsapp />
      <span>WhatsApp Us</span>
    </a>
  );
}

export default WhatsAppFloat;
