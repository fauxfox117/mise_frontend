import "./Main.css";
import IpadImage from "../../assets/Ipad.png";
import ToastLogo from "../../assets/toast-logo_color.png";
import ScoundrelLogo from "../../assets/Scoundrel+email+images-2.webp";
import ResyOSLogo from "../../assets/Resy-Box-Logo-Red.svg";

function Main({ topRef, howToRef }) {
  return (
    <div className="container" ref={topRef}>
      <div className="main__header">
        <section className="main">
          <h1 className="main-text">Table updates in real time.</h1>
        </section>
        <section className="main__image-section" ref={howToRef}>
          <img
            className="main__image"
            src={IpadImage}
            alt="Illustration of real-time updates"
          />
        </section>
        <section className="main__logo-cloud-section">
          <h2 className="main__logo-cloud-title">Trusted by:</h2>
          <div className="main__logo-cloud-section">
            <img
              className="main__logo-cloud"
              src={ToastLogo}
              alt="Toast POS logo"
            ></img>
            <img
              className="main__logo-cloud"
              src={ScoundrelLogo}
              alt="Scoundrel logo"
            ></img>
            <img
              className="main__logo-cloud"
              src={ResyOSLogo}
              alt="Resy OS logo"
            ></img>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Main;
