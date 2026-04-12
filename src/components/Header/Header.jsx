import "./Header.css";
import HeaderLogo from "../../assets/Mise Logo.png";

function Header({
  onLoginClick,
  onNavigate,
  isLoggedIn,
  onLogout,
  onDashboardClick,
}) {
  return (
    <div className="header">
      <button
        type="button"
        className="header__logo-link header__nav-trigger"
        onClick={() => onNavigate("top")}
      >
        <img className="header__logo" src={HeaderLogo} alt="App Logo" />
      </button>
      <div className="header__nav-links">
        <button
          type="button"
          className="header__button-link header__nav-trigger"
          onClick={() => onNavigate("benefits")}
        >
          <p className="header__nav-link">Benefits</p>
        </button>
        <button
          type="button"
          className="header__button-link header__nav-trigger"
          onClick={() => onNavigate("features")}
        >
          <p className="header__nav-link">Specifications</p>
        </button>
        <button
          type="button"
          className="header__button-link header__nav-trigger"
          onClick={() => onNavigate("how-to")}
        >
          <p className="header__nav-link">How-to</p>
        </button>
        <button
          type="button"
          className="header__button-link header__nav-trigger"
          onClick={() => onNavigate("connect")}
        >
          <p className="header__nav-link">Contact us</p>
        </button>
        {isLoggedIn ? (
          <>
            <button
              onClick={onDashboardClick}
              type="button"
              className="header__button-link header__sign-in-btn"
            >
              Dashboard
            </button>
            <button
              onClick={onLogout}
              type="button"
              className="header__button-link header__sign-in-btn"
            >
              Log Out
            </button>
          </>
        ) : (
          <button
            onClick={onLoginClick}
            type="button"
            className="header__button-link header__sign-in-btn"
          >
            Log In
          </button>
        )}
      </div>
      <button
        type="button"
        className="header__button header__cta"
        onClick={() => onNavigate("benefits")}
      >
        Learn More!
      </button>
    </div>
  );
}
export default Header;
