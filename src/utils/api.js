import axios from "axios";

const baseURL = "https://api.weatherapi.com/v1";

const buildQuery = (location) => {
  if (typeof location === "object") {
    return `${location.latitude},${location.longitude}`;
  } else {
    return location;
  }
};

const weatherAPI = {
  getForecastWeather: async (location) => {
    const query = buildQuery(location);
    const response = await axios.get(
      `${baseURL}/forecast.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${query}&days=5`,
    );
    return response.data;
  },
};

export default weatherAPI;
