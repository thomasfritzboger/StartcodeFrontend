import { useState, useEffect } from "react";
import facade from "../facades/apiFacade";
import AllUsers from "./AllUsers.jsx";

function Users() {
  const [user, setUser] = useState({ age: 0, username: "", password: "" });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    facade.getUsers((users) => {
      setUsers(users);
    });
  }, [facade]);

  const onInputChange = (event) => {
    const key = event.target.id;
    const value = event.target.value;
    setUser({ ...user, [key]: value });
  };

  const onSubmit = (event) => {
    facade.createUser(user, (userFromEndpoint) => {
      setUsers([...users, userFromEndpoint]);
    });
    setUser({ age: 0, password: "", username: "" });
    event.preventDefault();
  };

  const updateUser = (user, userId, event) => {
    facade.putUser(user, userId, (userFromApi) => {
      console.log(userFromApi + "!!!!!!!");
      setUsers(users.map((user) => (user.id !== userId ? user : userFromApi)));
    });
    event.preventDefault();
  };

  const removeUser = (userId, event) => {
    facade.deleteUser(userId, (userId) => {
      setUsers(users.filter((user) => user.id !== userId));
    });
    event.preventDefault();
  };

  return (
    <div>
      <h3 style={{ textAlign: "center" }}>Create User</h3>
      <form style={{ textAlign: "center" }}>
        <input
          id="age"
          type="number"
          placeholder="Age"
          value={user.age}
          onChange={onInputChange}
          required
        />
        <input
          id="password"
          type="text"
          placeholder="Password"
          value={user.password}
          onChange={onInputChange}
          required
        />
        <input
          id="username"
          type="text"
          placeholder="Username"
          value={user.username}
          onChange={onInputChange}
          required
        />
        <button type="submit" onClick={onSubmit}>
          Create
        </button>
      </form>

      <AllUsers
        allUsers={users}
        removeUser={removeUser}
        updateUser={updateUser}
      />
    </div>
  );
}

export default Users;
