import { NavLink, useNavigate } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { FaSearch } from "react-icons/fa";
import "./Navigation.css";

function Navigation() {
  const handleFeature = (e) => {
    alert("Feature Coming Soon");
  };

  return (
    <div className="navigation-container">
      <div className="nav-left-container">
        <NavLink to="/" className="main-logo">
          <img
            className="seen-it-logo"
            src="https://i.postimg.cc/C1H2RFrh/seen-it-logo.png"
            alt="logo"
          />
        </NavLink>
      </div>

      <div className="nav-right-container">
        <div className="search-bar" onClick={(e) => handleFeature(e)}>
          <FaSearch />
          <input
            className="search-input"
            type="text"
            name="search-bar"
            placeholder="Search for a community"
          />
        </div>
        <ProfileButton />
      </div>
    </div>
  );
}

export default Navigation;
