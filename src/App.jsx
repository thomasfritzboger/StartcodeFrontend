import { useState } from "react";
import { Routes, Route, UNSAFE_RouteContext } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/navLinks/Home.jsx";
import Users from "./components/Users.jsx";
import Contact from "./components/navLinks/Contact.jsx";
import Error from "./components/navLinks/Error.jsx";
import Profile from "./components/navLinks/Profile.jsx";
import facade from "./facades/apiFacade";
import SimpleUsers from "./components/SimpleUsers.jsx";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  return (
    <>
      <Header
        setLoggedIn={setLoggedIn}
        loggedIn={loggedIn}
        setErrorMsg={setErrorMsg}
        roles={facade.getRoles()}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="users" element={<Users />} />
        <Route
          path="contact"
          element={
            <Contact
              name={"Thomas Fritzbøger"}
              address={{
                street: "Kanalvej 5A",
                town: "Lyngby",
                country: "Denmark",
              }}
            />
          }
        />
        <Route path="simple-users" element={<SimpleUsers />} />
        <Route
          path="profile"
          element={<Profile loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
        />
        <Route path="error" element={<Error errorMsg={errorMsg} />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
};

export default App;
