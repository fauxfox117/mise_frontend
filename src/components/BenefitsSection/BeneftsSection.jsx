import "./BenefitsSection.css";

function BenefitsSection() {
  return (
    <section className="benefits">
      <h2 className="benefits__title">Why choose Mise?</h2>
      <ul className="benefits__list">
        <li className="benefits__item">
          <h3 className="benefits__item-title">Real-Time Updates</h3>
          <p className="benefits__item-description">
            See changes to your tables instantly without needing to refresh.
          </p>
        </li>
        <li className="benefits__item">
          <h3 className="benefits__item-title">Easy Integration</h3>
          <p className="benefits__item-description">
            Connect Mise to your existing databases with minimal setup.
          </p>
        </li>
        <li className="benefits__item">
          <h3 className="benefits__item-title">User-Friendly Interface</h3>
          <p className="benefits__item-description">
            Manage and monitor your tables with an intuitive dashboard.
          </p>
        </li>
        <li className="benefits__item">
          <h3 className="benefits__item-title">Customizable Alerts</h3>
          <p className="benefits__item-description">
            Set up notifications for specific changes or thresholds in your
            data.
          </p>
        </li>
      </ul>
    </section>
  );
}

export default BenefitsSection;
