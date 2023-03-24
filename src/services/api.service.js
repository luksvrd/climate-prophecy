const API_KEY = "3f6f5de1f0c7db12c84fd8b2b96e64f6";
const API_URL_BASE = "https://api.openweathermap.org";
const API_URL_COORDS = `${API_URL_BASE}/geo/1.0/direct`;
const API_URL_WEATHER = `${API_URL_BASE}/data/2.5/weather`;
const API_URL_FORECAST = `${API_URL_BASE}/data/2.5/forecast`;

export default {
  async getCoords(city) {
    const resp = await fetch(
      `${API_URL_COORDS}?q=${city}&limit=5&appid=${API_KEY}`
    );
    const [firstCity] = await resp.json();
    return { lat: firstCity.lat, lon: firstCity.lon };
  },

  async getCurrentWeather(coords) {
    const resp = await fetch(
      `${API_URL_WEATHER}?lat=${coords.lat}&lon=${coords.lon}&units=imperial&appid=${API_KEY}`
    );
    return resp.json();
  },

  async getNoonForecastData(coords) {
    const resp = await fetch(
      `${API_URL_FORECAST}?lat=${coords.lat}&lon=${coords.lon}&units=imperial&appid=${API_KEY}`
    );

    const data = await resp.json();
    return data.list.filter(({ dt_txt: dateTxt }) =>
      dateTxt.endsWith("12:00:00")
    );
  },
};
