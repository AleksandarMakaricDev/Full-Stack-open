import axios from "axios";
import { responseCallback } from "../utils/api";

const baseURL = "https://studies.cs.helsinki.fi/restcountries/api";

const getCountries = () => {
  return axios.get(`${baseURL}/all`).then(responseCallback);
};

export default {
    getCountries,
};
