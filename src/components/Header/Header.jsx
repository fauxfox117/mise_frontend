import { NavLink } from "react-router-dom";
import { useContext } from "react";

import "./Header.css";
import HeaderLogo from "../../assets/Mise Logo.png";

function Header({ onLoginClick }) {
  return (
    <div className="header">
      <NavLink to="/" className="header__logo-link" type="button">
        <img className="header__logo" src={HeaderLogo} alt="App Logo" />
      </NavLink>
      <div className="header__nav-links">
        <NavLink to="/" className="header__button-link" type="button">
          <p className="header__nav-link">Benefits</p>
        </NavLink>
        <NavLink to="/" className="header__button-link" type="button">
          <p className="header__nav-link">Specifications</p>
        </NavLink>
        <NavLink to="/" className="header__button-link" type="button">
          <p className="header__nav-link">How-to</p>
        </NavLink>
        <NavLink to="/" className="header__button-link" type="button">
          <p className="header__nav-link">Contact us</p>
        </NavLink>
        <button
          onClick={onLoginClick}
          type="button"
          className="header__button-link header__sign-in-btn"
        >
          Log In
        </button>
      </div>
      <NavLink to="/" className="header__button-link" type="button">
        <button className="header__button">Learn More!</button>
      </NavLink>
    </div>
  );
}
export default Header;
