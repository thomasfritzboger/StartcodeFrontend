import { useState, useEffect } from "react";
import facade from "../facades/apiFacade";

const Owners = () => {
  const [owners, setOwners] = useState([]);

  useEffect(() => {
    facade.getOwners((ownersFromDB) => {
      setOwners(ownersFromDB);
    });
  }, []);

  return (
    <div>
      <h3 style={{ textAlign: "center" }}>Owners</h3>
      <table
        style={{ marginRight: "auto", marginLeft: "auto", border: "solid 1px" }}
      >
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {owners.map((owner) => (
            <OwnerRow key={owner.id} owner={owner} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const OwnerRow = ({ owner }) => {
  return (
    <tr>
      <td>{owner.id}</td>
      <td>{owner.name}</td>
    </tr>
  );
};

export default Owners;
