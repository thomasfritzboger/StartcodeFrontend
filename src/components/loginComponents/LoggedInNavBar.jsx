import { useState, useEffect } from "react";
import facade from "../../facades/apiFacade.js";
import { useNavigate } from "react-router-dom";

const LoggedInNavBar = ({ setLoggedIn }) => {
  const navigate = useNavigate();

  const logout = () => {
    facade.logout();
    setLoggedIn(false);
    navigate("/");
  };

  return (
    <div className="login-container">

        <div className="btn-login">
          <a style={{ paddingRight: "10px" }}>Hello, {facade.getUsername()}<i className="fa fa-fw fa-user"></i></a>
          <button onClick={logout}>Logout</button>
        </div>
    </div>
  );
};

export default LoggedInNavBar;
