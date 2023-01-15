import React, { useState, useEffect } from "react";
import facade from "../../facades/apiFacade.js";
import { useNavigate } from "react-router-dom";

const Login = ({ setLoggedIn, setErrorMsg }) => {
  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);

  const navigate = useNavigate();

  const performLogin = (evt) => {
    evt.preventDefault();
    login(loginCredentials.username, loginCredentials.password);
  };

  const login = async (user, pass) => {
    await facade
      .login(user, pass)
      .then((res) => {
        setLoggedIn(true);
        navigate("/profile");
      })
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => setErrorMsg(e.message));
        } else {
          navigate("/error");
        }
      });
  };

  const onChange = (evt) => {
    setLoginCredentials({
      ...loginCredentials,
      [evt.target.id]: evt.target.value,
    });
  };

  return (
    <div className="login-container">
      <form onChange={onChange}>
        <input type="text" placeholder="Username" id="username" required />{" "}
        <input type="password" placeholder="Password" id="password" required />
        <button onClick={performLogin}>Login</button>
      </form>
    </div>
  );
};

export default Login;
