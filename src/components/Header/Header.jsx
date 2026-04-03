import { NavLink } from "react-router-dom";
import { useContext } from "react";

import "./Header.css";
import HeaderLogo from "../../assets/Mise Logo.png";

function Header() {
  return (
    <div className="header">
      <NavLink to="/" className="header__logo-link" type="button">
        <img className="header__logo" src={HeaderLogo} alt="App Logo" />
      </NavLink>
      <button className="header__button">Learn More!</button>
    </div>
  );
}
export default Header;
