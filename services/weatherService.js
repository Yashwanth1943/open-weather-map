import axios from "axios";
import { API_KEY } from "../config/env.js";

export const getWeather = async (city) => {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
    const response = await axios.get(url);

    return response.data.weather[0].main;
  } catch (error) {
    console.error(`❌ Error fetching weather for ${city}: ${error.response?.data?.message || error.message}`);
    return null;
  }
};