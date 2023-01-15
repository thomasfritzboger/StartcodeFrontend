import {useState} from "react";
import {json} from "react-router-dom";

const AllUsers = (props) => {
    return (
        <div>
            <h3 style={{ textAlign: "center" }}>Users</h3>
            <table
                style={{ marginRight: "auto", marginLeft: "auto", border: "solid 1px" }}
            >
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Age</th>
                    <th>Username</th>
                </tr>
                </thead>
                <tbody>
                {props.allUsers.map((user) => (
                    <UserRow
                        key={user.id}
                        user={user}
                        removeUser={props.removeUser}
                        updateUser={props.updateUser}
                    />
                ))}
                </tbody>
            </table>
        </div>
    );
};

const UserRow = ({  user, removeUser, updateUser }) => {
    const [toggleEditable,setToggleEditable] = useState(false);
    const [userRow,setUserRow] = useState({
        age:user.age,
        username: user.username
    })
    const onInputChange = (event) => {
        const value = event.target.value;
        const key = event.target.id;
        setUserRow({...userRow, [key]: value})
    }

    return (
        <tr>
            <td>{user.id}</td>
            <td>
                {toggleEditable ? <input type="number" value={userRow.age} onChange={onInputChange} id="age"/> : userRow.age}
            </td>
            <td>
                {toggleEditable ? <input value={userRow.username} onChange={onInputChange} id="username"/> : userRow.username}
            </td>

            <td>
                <button onClick={(event) => removeUser(user.id, event)}>Remove</button>
            </td>
            <td>
                {toggleEditable ? (
                    <button
                        onClick={(event) => {
                            const userDTO = {
                                age: userRow.age,
                                username : userRow.username
                            }

                            updateUser(userDTO,user.id,event);

                            setToggleEditable(!toggleEditable);
                        }}
                    >
                        Save
                    </button>
                ) : (
                    <button onClick={() => setToggleEditable(!toggleEditable)}>
                        Edit
                    </button>
                )}
            </td>
            <td>{JSON.stringify(userRow)}</td>
        </tr>

    );
};

export default AllUsers;
