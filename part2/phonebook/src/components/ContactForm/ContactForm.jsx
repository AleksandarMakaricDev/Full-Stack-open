import React from "react";

const ContactForm = ({
  onContactSubmission,
  newContactName,
  onNewContactName,
  newContactNumber,
  onNewContactNumber,
}) => {
  return (
    <form onSubmit={onContactSubmission}>
      <fieldset>
        <legend>Add new contact</legend>
        <ul>
          <li>
            <label htmlFor="name">Name: </label>
            <input
              id="name"
              value={newContactName}
              onChange={onNewContactName}
            />
          </li>
          <li>
            <label htmlFor="number">Number: </label>
            <input
              id="number"
              type="tel"
              value={newContactNumber}
              onChange={onNewContactNumber}
            />
          </li>
          <li>
            <button type="submit">Add</button>
          </li>
        </ul>
      </fieldset>
    </form>
  );
};

export default ContactForm;
