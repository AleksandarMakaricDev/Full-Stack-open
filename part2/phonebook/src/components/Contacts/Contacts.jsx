import React from "react";
import Contact from "./Contact/Contact";

const Contacts = ({ contacts, filterQuery, onContactRemoval }) => {
  if (contacts.length) {
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Number</th>
            <th>Remove Contact</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map(({ id, name, number }) => (
            <Contact
              key={id}
              name={name}
              number={number}
              onContactRemoval={onContactRemoval(id, name)}
            />
          ))}
        </tbody>
      </table>
    );
  }

  if (filterQuery) {
    return <p>No contact name matches the filter query.</p>;
  }

  return <p>No contacts to display. Please add some.</p>;
};

export default Contacts;
