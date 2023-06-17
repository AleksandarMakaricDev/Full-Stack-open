import React from "react";

const Contact = ({ name, number, onContactRemoval }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{number}</td>
      <td>
        <button onClick={onContactRemoval}>Remove</button>
      </td>
    </tr>
  );
};

export default Contact;
