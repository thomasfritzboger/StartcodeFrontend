import React from "react";
import facade from "../facades/apiFacade";
import { useEffect, useState } from "react";

const SimpleUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    facade.getUsers((allUsers) => {
      setUsers(allUsers);
    });
  }, [facade]);

  return (
    <div>
      <h3 style={{ textAlign: "center" }}>All users</h3>
      <table
        style={{ marginRight: "auto", marginLeft: "auto", border: "solid 1px" }}
      >
        <thead>
          <tr>
            <th>User id</th>
            <th>Username</th>
            <th>Age</th>
            <th>Roles</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.age}</td>
              <td>{user.roles.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SimpleUsers;
