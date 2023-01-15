import React from "react";
import { useReducer } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../styles/header.css";
import LoggedInNavBar from "./loginComponents/LoggedInNavBar.jsx";
import Login from "./loginComponents/Login.jsx";

function Header({ loggedIn, setErrorMsg, setLoggedIn, roles }) {
  return (
    <nav className="topnav">
      <NavLink className="active" to="/">
        <i className="fa fa-fw fa-home"></i> Home
      </NavLink>

        {loggedIn && roles.includes("admin") && (
      <NavLink to="/users">
        <i className="fa fa-fw fa-search"></i> Users
      </NavLink>
        )}

      <NavLink to="/contact">
        <i className="fa fa-fw fa-envelope"></i> Contact
      </NavLink>

      {loggedIn && roles.includes("admin") && (
        <NavLink to="/simple-users">
          <i className="fa fa-fw fa-user"></i>Simple Users
        </NavLink>
      )}

      {loggedIn && (
        <NavLink to="profile">
          <i className="fa fa-fw fa-id-badge"></i> Profile
        </NavLink>
      )}

      {!loggedIn ? (
        <Login setLoggedIn={setLoggedIn} setErrorMsg={setErrorMsg} />
      ) : (
        <div>
          <LoggedInNavBar setLoggedIn={setLoggedIn} />
        </div>
      )}
    </nav>
  );
}

export default Header;
