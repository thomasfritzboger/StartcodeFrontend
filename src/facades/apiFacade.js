import URL from "../settings";

const handleHttpErrors = async (res) => {
  if (!res.ok) {
    return await Promise.reject({ status: res.status, fullError: res.json() });
  }
  if (res.status === 204) {
    return;
  }
  console.log(res);
  return await res.json();
};

function apiFacade() {
  const setToken = (token) => {
    localStorage.setItem("jwtToken", token);
  };

  const getToken = () => {
    return localStorage.getItem("jwtToken");
  };

  const setRoles = (roles) => {
    localStorage.setItem("roles", roles);
  };

  const getRoles = () => {
    console.log(localStorage.getItem("roles"));

    return localStorage.getItem("roles")
      ? localStorage.getItem("roles").split(",")
      : [];
  };

  const setUsername = (username) => {
    return localStorage.setItem("username", username);
  };

  const getUsername = () => {
    return localStorage.getItem("username");
  };

  const loggedIn = () => {
    const loggedIn = getToken() != null;
    return loggedIn;
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("roles");
    localStorage.removeItem("username");
  };

  const parseJwt = async (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  const login = async (user, password) => {
    const options = makeOptions("POST", true, {
      username: user,
      password: password,
    });

    return await fetch(URL + "login", options)
      .then(handleHttpErrors)
      .then((res) => {
        setToken(res.token);
        return parseJwt(res.token);
      })
      .then((response) => {
        setRoles(response.roles);
        setUsername(response.name);
        window.localStorage.setItem("isLoggedIn", true);
      });
  };

  const createUser = async (user, callback) => {
    const options = makeOptions("POST", true, user);
    return await fetch(URL + "users/", options)
      .then(handleHttpErrors)
      .then((data) => callback(data));
  };

  const createBoat = async (boat, callback) => {
    const options = makeOptions("POST", true, boat);
    return await fetch(URL + "boats/", options)
      .then(handleHttpErrors)
      .then((data) => callback(data));
  };

  const putUser = async (user, userId, callback) => {
    const options = makeOptions("PUT", true, user);
    return await fetch(URL + "users/" + userId, options)
      .then(handleHttpErrors)
      .then((data) => callback(data));
  };

  const putHarborOnBoat = async (boatId, harborId) => {
    const options = makeOptions("PUT", true);

    return await fetch(
      URL + "boats/" + boatId + "/harbor/" + harborId,
      options
    ).then(handleHttpErrors);
  };

  const deleteUser = async (userId, callback) => {
    const options = makeOptions("DELETE", true);
    return await fetch(URL + "users/" + userId, options)
      .then(handleHttpErrors)
      .then(() => callback(userId));
  };

  const deleteBoat = async (boatId, callback) => {
    const options = makeOptions("DELETE", true);
    return await fetch(URL + "boats/" + boatId, options)
      .then(handleHttpErrors)
      .then(() => callback(boatId));
  };

  const getUsers = async (callback) => {
    const options = makeOptions("GET", true);

    return await fetch(URL + "users/", options)
      .then(handleHttpErrors)
      .then((data) => callback(data));
  };

  // const getBoats = async (callback) => {
  //   const options = makeOptions("GET", true);
  //   return await fetch(URL + "boats/", options)
  //     .then(handleHttpErrors)
  //     .then((data) => callback(data));
  // };

  const getBoats = async () => {
    const options = makeOptions("GET", true);
    return await fetch(URL + "boats/", options).then(handleHttpErrors);
  };

  const getOwners = async (callback) => {
    const options = makeOptions("GET", true);
    return await fetch(URL + "owners/", options)
      .then(handleHttpErrors)
      .then((data) => callback(data));
  };

  const getHarbors = async (callback) => {
    const options = makeOptions("GET", true);
    return await fetch(URL + "harbors/", options)
      .then(handleHttpErrors)
      .then((data) => callback(data));
  };

  const fetchData = async () => {
    const options = makeOptions("GET", true); //True add's the token to the headers doing a check if user is logged in and if the addToken parameter is true, which it is here
    const roles = getRoles();

    // then try getting for admin
    if (roles.includes("admin")) {
      return await fetch(URL + "users/me", options).then(handleHttpErrors);
    }

    // try getting for user
    if (roles.includes("user")) {
      return await fetch(URL + "users/me", options).then(handleHttpErrors);
    }
  };

  const makeOptions = (method, addToken, body) => {
    var opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    };
    if (addToken && loggedIn()) {
      opts.headers["x-access-token"] = getToken();
      console.log(getToken());
    }
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  };

  return {
    makeOptions,
    setToken,
    getToken,
    loggedIn,
    login,
    logout,
    fetchData,
    getUsername,
    createUser,
    createBoat,
    putUser,
    putHarborOnBoat,
    deleteUser,
    deleteBoat,
    getRoles,
    getUsers,
    getOwners,
    getBoats,
    getHarbors,
  };
}
const facade = apiFacade();
export default facade;
