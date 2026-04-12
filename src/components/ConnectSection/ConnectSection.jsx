import "./ConnectSection.css";

function ConnectSection({ connectRef }) {
  return (
    <section className="connect" ref={connectRef}>
      <div className="connect__content">
        <div className="connect__copy">
          <p className="connect__eyebrow">Connect with us</p>
          <h2 className="connect__title">Bring your restaurant into Mise.</h2>
          <p className="connect__description">
            Tell us about your restaurant and what system you use today. We will
            follow up with next steps for onboarding and Toast floorplan import.
          </p>
        </div>
        <form className="connect__form">
          <label className="connect__label">
            Name
            <input className="connect__input" type="text" name="name" />
          </label>
          <label className="connect__label">
            Email
            <input className="connect__input" type="email" name="email" />
          </label>
          <label className="connect__label connect__label_message">
            Message
            <textarea className="connect__textarea" name="message" rows="5" />
          </label>
          <button className="connect__button" type="submit">
            Send message
          </button>
        </form>
      </div>
    </section>
  );
}

export default ConnectSection;
