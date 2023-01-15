import { useState, useEffect } from "react";
import { Form } from "react-router-dom";
import facade from "../facades/apiFacade";

function Boats() {
  const initialBoatState = { name: "", harbor_id: 0 };
  const [boat, setBoat] = useState(initialBoatState);
  const [boats, setBoats] = useState([]);
  const [harbors, setHarbors] = useState([]);
  const initialHarborState = { name: "", harbor_id: 0 };
  const [harbor, setHarbor] = useState(initialHarborState);

  useEffect(() => {
    facade.getHarbors((harbors) => {
      setHarbors(harbors);
    });
    // facade.getBoats((boats) => {
    //   setBoats(boats);
    // });

    async function fetchBoats() {
      const response = await facade.getBoats();
      setBoats([...response]);
    }
    fetchBoats();
  }, []);

  const onInputChange = (event) => {
    const key = event.target.id;
    const value = event.target.value;
    setBoat({ ...boat, [key]: value });
    console.log(boat);
  };

  const onSubmit = (event) => {
    alert(`Boat with name ${boat.name} is created`);

    facade
      .createBoat(boat, (boatFromEndpoint) => {
        setBoats([...boats, boatFromEndpoint]);
      })
      .then(setBoat(initialBoatState))
      .then(setHarbor(initialBoatState));

    event.preventDefault();
  };

  const updateHarborOnBoat = async (boatId, harborId) => {
    await facade.putHarborOnBoat(boatId, harborId);

    // facade.getBoats((boats) => {
    //   setBoats(boats);
    // });

    const response = await facade.getBoats().then((res) => console.log(res));

    setBoats([...response]);

    // setBoats({ name: "ANDREAS", harbor_id: 2 });
  };

  const deleteBoat = (boatId) => {
    facade.deleteBoat(boatId, () => {
      setBoats(
        boats.filter((boat) => {
          return boat.id !== boatId;
        })
      );
    });
  };

  return (
    <div>
      <h3 style={{ textAlign: "center" }}>Boat</h3>

      <form style={{ textAlign: "center" }}>
        <input
          id="name"
          type="text"
          placeholder="Name"
          value={boat.name}
          onChange={onInputChange}
          required
        />

        <select
          id="harbor_id"
          name="harborlist"
          type="number"
          onChange={onInputChange}
        >
          <option value="" disabled selected>
            Select a Harbor
          </option>
          {harbors.map((harbor) => (
            <HarborOption key={harbor.id} harbor={harbor} />
          ))}
        </select>

        <button type="submit" onClick={onSubmit}>
          Create
        </button>
      </form>

      <h3 style={{ textAlign: "center" }}> All Boats</h3>
      <table
        style={{ marginRight: "auto", marginLeft: "auto", border: "solid 1px" }}
      >
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Harbor</th>
            <th>Owners</th>
          </tr>
        </thead>
        <tbody>
          {boats?.map((boat) => (
            <BoatRow
              key={boat.id}
              boat={boat}
              deleteBoat={deleteBoat}
              harbors={harbors}
              updateHarborOnBoat={updateHarborOnBoat}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

const BoatRow = ({ boat, deleteBoat, harbors, updateHarborOnBoat }) => {
  const [toggleEditable, setToggleEditable] = useState(false);
  const [boatRow, setBoatRow] = useState({
    name: boat.name,
    harbor: boat.harbor,
  });
  const [harbor_id, setHarborId] = useState(0);

  const onInputChange = (event) => {
    const key = event.target.id;
    const value = event.target.value;
    setHarborId(value);
    setBoatRow({ ...boatRow, [key]: value });
  };

  return (
    <tr>
      <td>{boat.id}</td>
      <td>{boat.name}</td>
      <td>
        {toggleEditable ? (
          <select id="harbor_id" type="number" onChange={onInputChange}>
            {harbors.map((harbor) =>
              boat.harbor.id === harbor.id ? (
                <option key={harbor.id} value={harbor.id}>
                  {harbor.name}
                </option>
              ) : (
                <option key={harbor.id} value={harbor.id}>
                  {harbor.name}
                </option>
              )
            )}
          </select>
        ) : (
          boatRow.harbor.name
        )}
      </td>
      <td></td>
      <td>
        <button onClick={() => deleteBoat(boat.id)}>Delete</button>
      </td>
      <td>
        {toggleEditable ? (
          <button
            onClick={(event) => {
              const harborDTO = {
                id: harbor_id,
              };
              updateHarborOnBoat(boat.id, harborDTO.id);
              setToggleEditable(!toggleEditable);
            }}
          >
            Save
          </button>
        ) : (
          <button
            onClick={(event) => {
              setToggleEditable(!toggleEditable);
            }}
          >
            Edit Harbor
          </button>
        )}
      </td>
    </tr>
  );
};

const HarborOption = ({ harbor, boatHarborId }) =>
  boatHarborId === harbor.id ? (
    <option key={harbor.id} value={harbor.id}>
      {harbor.name}
    </option>
  ) : (
    <option key={harbor.id} value={harbor.id}>
      {harbor.name}
    </option>
  );

export default Boats;
