import { useState, useEffect } from "react";
import facade from "../../facades/apiFacade.js";
import Unauthorized from "../loginComponents/Unauthorized.jsx";

const Profile = ({ loggedIn, setLoggedIn }) => {
  const [dataFromServer, setDataFromServer] = useState("Loading...");

  useEffect(() => {
    // her skal jeg tjekke for rollen og køre den rigitge fetch metode alt efter rollen
    let isLoggedIn = facade.loggedIn();
    if (isLoggedIn) {
      setLoggedIn(true);
      facade.fetchData().then((data) => {
        setDataFromServer(data);
      });
    }
  }, []);

  return (
    <div>
      <>
        {!loggedIn ? (
          <Unauthorized />
        ) : (
          <>
            <h1>Profile</h1>
            <h3>Data Received from server:</h3>
            <h3>
              Welcome {dataFromServer.username} (id: {dataFromServer.id}) / age:{" "}
              {dataFromServer.age}, with role(s):{" "}
              {dataFromServer.roles?.join(", ")}
            </h3>
          </>
        )}
      </>
    </div>
  );
};

export default Profile;
