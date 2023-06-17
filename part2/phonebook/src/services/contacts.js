import axios from "axios";

const baseURL = "http://localhost:3001/persons";

const responseCallback = (response) => response.data;

const getAllContacts = () => {
  return axios.get(baseURL).then(responseCallback);
};

const addContact = (contact) => {
  return axios.post(baseURL, contact).then(responseCallback);
};

const deleteContact = (contactId) => {
  return axios.delete(`${baseURL}/${contactId}`).then(responseCallback);
};

const updateContact = (contactId, updatedContact) => {
  return axios
    .put(`${baseURL}/${contactId}`, updatedContact)
    .then(responseCallback);
};

export default { getAllContacts, addContact, deleteContact, updateContact };
