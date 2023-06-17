import axios from "axios";
import { responseCallback } from "../utils/api";

const baseURL = `https://api.openweathermap.org/data/2.5/weather?appid=${import.meta.env.VITE_OWN_API_KEY}&units=metric`;

const getCapitalWather = (capital) => {
  return axios.get(`${baseURL}&q=${capital}`).then(responseCallback);
};

export default {
  getCapitalWather,
};
