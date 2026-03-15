import {
  FaUmbrellaBeach,
  FaFortAwesome,
  FaChurch,
  FaLeaf,
  FaLandmark
} from "react-icons/fa";

function Tours() {
  const northGoaPlaces = [
    {
      title: "Baga and Calangute Beach",
      description:
        "Bustling stretches known for beach shacks, water sports, and nightlife.",
      Icon: FaUmbrellaBeach
    },
    {
      title: "Anjuna Beach",
      description:
        "Famous for its lively flea market, vibrant vibe, and cliffside views.",
      Icon: FaUmbrellaBeach
    },
    {
      title: "Vagator and Chapora Beach",
      description:
        "Known for red cliffs, dramatic sunsets, and access to Chapora Fort.",
      Icon: FaUmbrellaBeach
    },
    {
      title: "Candolim Beach",
      description:
        "A calmer golden-sand shoreline ideal for relaxing beach time.",
      Icon: FaUmbrellaBeach
    },
    {
      title: "Arambol Beach",
      description:
        "A laid-back beach setting with a bohemian and peaceful atmosphere.",
      Icon: FaUmbrellaBeach
    },
    {
      title: "Fort Aguada",
      description:
        "Historic Portuguese fort with sea views and landmark lighthouse.",
      Icon: FaFortAwesome
    },
    {
      title: "Chapora Fort",
      description:
        "A scenic fort offering panoramic views that are especially striking at sunset.",
      Icon: FaFortAwesome
    },
    {
      title: "Old Goa Churches",
      description:
        "Visit heritage churches including Basilica of Bom Jesus and Se Cathedral.",
      Icon: FaChurch
    },
    {
      title: "Our Lady of Immaculate Conception Church",
      description:
        "A landmark church known for its iconic white facade and staircase.",
      Icon: FaChurch
    }
  ];

  const southGoaPlaces = [
    {
      title: "The Figueiredo Mansion",
      description:
        "A centuries-old Portuguese mansion showcasing Goa's colonial heritage.",
      Icon: FaLandmark
    },
    {
      title: "Bigfoot Museum",
      description:
        "A cultural museum that presents local traditions and Goan folklore.",
      Icon: FaLandmark
    },
    {
      title: "Margao City",
      description:
        "South Goa's commercial center with lively markets and local charm.",
      Icon: FaLandmark
    },
    {
      title: "Colva Beach",
      description:
        "A popular beach destination with a wide shore and calm coastal energy.",
      Icon: FaUmbrellaBeach
    },
    {
      title: "Majorda Beach",
      description:
        "A serene shoreline known for clean sands and a relaxed atmosphere.",
      Icon: FaUmbrellaBeach
    },
    {
      title: "Cabo de Rama Fort",
      description:
        "Historic fort ruins with sweeping views of the Arabian Sea.",
      Icon: FaFortAwesome
    },
    {
      title: "Shri Shantadurga Temple",
      description:
        "A revered temple reflecting Goa's spiritual and architectural heritage.",
      Icon: FaChurch
    },
    {
      title: "Spice Plantation",
      description:
        "Guided tours through lush plantations with insights into local spices.",
      Icon: FaLeaf
    }
  ];

  return (
    <div className="tours-page">

      <div className="tours-header">
        <h1>North & South Goa Sightseeing</h1>
        <p>Discover Goa's beaches, forts, culture, and heritage in one curated plan</p>
      </div>

      <h2 className="section-title">North Goa Highlights</h2>
      <div className="places-grid">
        {northGoaPlaces.map(({ title, description, Icon }) => (
          <article className="place-card" key={title}>
            <Icon className="place-icon" />
            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>

      <h2 className="section-title">South Goa Highlights</h2>
      <div className="places-grid">
        {southGoaPlaces.map(({ title, description, Icon }) => (
          <article className="place-card" key={title}>
            <Icon className="place-icon" />
            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>

    </div>
  );
}

export default Tours;