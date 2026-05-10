import "./FeaturesSection.css";

const featureCards = [
  {
    title: "Live floor visibility",
    description:
      "View your dining room layout with the same table context your team already uses in service.",
  },
  {
    title: "Smarter table decisions",
    description:
      "Spot bottlenecks, high-value tables, and seating changes without relying on manual updates.",
  },
  {
    title: "Built for restaurant teams",
    description:
      "Keep operators, hosts, and managers aligned around one source of truth for the floor.",
  },
];

function FeaturesSection({ featuresRef }) {
  return (
    <section className="features" ref={featuresRef}>
      <div className="features__heading">
        <p className="features__eyebrow">Features</p>
        <h2 className="features__title">
          See the floor exactly how service needs it.
        </h2>
        <p className="features__description">
          Mise brings your restaurant floorplan into one dashboard so the team
          can read changes, plan around demand, and stay ahead of the room.
        </p>
      </div>
      <div className="features__grid">
        {featureCards.map((feature) => (
          <article key={feature.title} className="features__card">
            <h3 className="features__card-title">{feature.title}</h3>
            <p className="features__card-description">{feature.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default FeaturesSection;
