import React from "react";

const Contact = ({ name, address }) => {
  return (
    <div style={{ textAlign: "center" }}>
      Contacts
      <h3>{name}</h3>
      <p>{address.street}</p>
      <p>{address.town}</p>
      <p>{address.country}</p>
    </div>
  );
};

export default Contact;
