import { NavLink, useNavigate } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { FaSearch } from "react-icons/fa";
// import icon from "../../../../../public.favicon.ico"
import "./Navigation.css";

function Navigation() {
  const handleFeature = (e) => {
    alert("Feature Coming Soon");
  };

  return (
    <div className="navigation-container">
      <div className="nav-left-container">
        <NavLink to="/" className="main-logo">
          <div className="logo-image-container">
            <img className="seen-it-logo" src={"/favicon.ico"} />
          </div>

          <p className="logo-name-tag">Seen-it</p>

        </NavLink>
      </div>

      <div className="nav-right-container">
        <div className="search-bar" onClick={(e) => handleFeature(e)}>
          <FaSearch className="search-icon"/>
          <input
            className="search-input"
            type="text"
            name="search-bar"
            placeholder="Search Seen-it"
          />
        </div>
        <ProfileButton />
      </div>
    </div>
  );
}

export default Navigation;
