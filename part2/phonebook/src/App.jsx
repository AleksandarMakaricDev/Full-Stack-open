import { useEffect, useState } from "react";
import contactsServices from "./services/contacts";
import Filter from "./components/Filter/Filter";
import ContactForm from "./components/ContactForm/ContactForm";
import Contacts from "./components/Contacts/Contacts";
import Notification from "./components/Notification/Notification";
import { modifierStates } from "./types/constants";

let timeout;

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterQuery, setFilterQuery] = useState("");
  const [notification, setNotification] = useState();

  const resetValues = () => {
    setNewName("");
    setNewNumber("");
  };

  const resetNotification = () => {
    timeout = setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const errorHandler = (message) => {
    setNotification({
      message: message || "Something went wrong! Please try again in a bit.",
      type: modifierStates.error,
    });
    resetNotification();
  };
  const successHandler = (message) => {
    setNotification({
      message: message || "Success!",
      type: modifierStates.success,
    });
    resetNotification();
  };

  useEffect(() => {
    contactsServices
      .getAllContacts()
      .then((contacts) => setPersons(contacts))
      .catch(() =>
        errorHandler("Fetching contacts failed. Please try again in a bit.")
      );
  }, []);

  useEffect(() => timeout && clearTimeout(timeout), []);

  const handleNewContactName = ({ target: { value } }) => {
    setNewName(value);
  };

  const handleNewContactNumber = ({ target: { value } }) => {
    setNewNumber(value);
  };

  const handleFilterQuery = ({ target: { value } }) => {
    setFilterQuery(value);
  };

  const handleContactSubmission = (event) => {
    event.preventDefault();

    const formattedNewName = newName.trim();
    const formattedNewNumber = newNumber.trim();

    const nameExists = () =>
      persons.some(({ name }) => name === formattedNewName);

    const nameAndNumberExist = () =>
      persons.some(
        ({ name, number }) =>
          name === formattedNewName && number === formattedNewNumber
      );

    if (!formattedNewName) {
      alert("Please enter a name.");
    } else if (!formattedNewNumber) {
      alert("Please enter a phone number.");
    } else if (nameAndNumberExist()) {
      alert(
        "A person under the entered name and number already exists in the contacts."
      );
    } else if (nameExists()) {
      const isConfirmed = window.confirm(
        `${formattedNewName} is already added to contacts. Do you want to replace the old number with a new one?`
      );

      if (!isConfirmed) {
        return;
      }

      const existingContactId = persons.find(
        (p) => p.name === formattedNewName
      )?.id;

      const contactToUpdate = {
        name: formattedNewName,
        number: formattedNewNumber,
      };

      contactsServices
        .updateContact(existingContactId, contactToUpdate)
        .then((updatedContact) => {
          setPersons((prev) => {
            const newPersons = prev.map((p) =>
              p.id === updatedContact.id ? updatedContact : p
            );

            return newPersons;
          });

          successHandler(`Successfully updated contact ${formattedNewName}.`);

          resetValues();
        })
        .catch(() =>
          errorHandler(
            `Updating contact ${formattedNewName} failed. Please try again in a bit.`
          )
        );
    } else {
      const newContact = {
        name: formattedNewName,
        number: formattedNewNumber,
      };

      contactsServices
        .addContact(newContact)
        .then((contact) => {
          setPersons((prev) => {
            const newPersons = prev.concat(contact);

            return newPersons;
          });

          successHandler(`Successfully added contact ${formattedNewName}.`);

          resetValues();
        })
        .catch(() =>
          errorHandler(
            `Adding contact ${formattedNewName} failed. Please try again in a bit.`
          )
        );
    }
  };

  const handleContactRemoval = (contactId, name) => () => {
    const isConfirmed = window.confirm(`Remove ${name} from contacts?`);

    if (!isConfirmed) {
      return;
    }

    contactsServices
      .deleteContact(contactId)
      .then((deletedContact) => {
        if (typeof deletedContact === "object") {
          setPersons((prev) => {
            const newPersons = prev.filter((p) => p.id !== contactId);

            return newPersons;
          });

          successHandler(`Successfully deleted contact ${name}.`)
        }
      })
      .catch(() =>
        errorHandler(
          `Deleting contact ${name} failed. Please try again in a bit.`
        )
      );
  };

  const filteredContacts = () => {
    return persons.filter(({ name }) =>
      name.toLowerCase().includes(filterQuery.toLowerCase())
    );
  };

  return (
    <main>
      <Notification notification={notification} />
      <h1>Phonebook</h1>
      <section>
        <Filter
          filterQuery={filterQuery}
          handleFilterQuery={handleFilterQuery}
          disabled={persons.length === 0}
        />
      </section>
      <section>
        <h2>New contact</h2>
        <ContactForm
          onContactSubmission={handleContactSubmission}
          newContactName={newName}
          onNewContactName={handleNewContactName}
          newContactNumber={newNumber}
          onNewContactNumber={handleNewContactNumber}
        />
      </section>
      <section>
        <h2>Numbers</h2>
        <Contacts
          contacts={filteredContacts()}
          filterQuery={filterQuery}
          onContactRemoval={handleContactRemoval}
        />
      </section>
    </main>
  );
};

export default App;
