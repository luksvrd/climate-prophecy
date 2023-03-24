function createCurrentWeatherHeader({ cityName, description, icon }) {
  const header = document.createElement("header");
  header.classList.add("text-white");

  const title = document.createElement("h2");
  const iconEl = document.createElement("img");

  title.textContent = cityName + " " + new Date().toLocaleDateString();
  // title.classList.add("text-white");

  iconEl.src = `http://openweathermap.org/img/wn/${icon}.png`;
  iconEl.alt = description;
  iconEl.classList.add("text-black");

  header.appendChild(title);
  header.appendChild(iconEl);

  return header;
}

function createForecastH2() {
  const h2 = document.createElement("h2");
  h2.textContent = "5-Day Forecast";
  h2.classList.add("text-2xl", "font-bold", "text-center", "p-1");

  return h2;
}

function createForecastList(forecastData) {
  const list = document.createElement("ul");
  list.style.display = "flex";
  list.style.flexWrap = "wrap";
  list.style.justifyContent = "space-around";

  forecastData.forEach((day) => {
    const listItem = document.createElement("li");
    listItem.classList.add("m-1", "text-center", "border-4", "border-indigo-200", "border-x-indigo-500");
    const h3 = document.createElement("h3");
    const img = document.createElement("img");

    h3.textContent = new Date(day.dt_txt).toLocaleDateString();
    img.src = `http://openweathermap.org/img/wn/${day.weather[0].icon}.png`;
    img.alt = day.weather[0].description;

    const weatherList = createWeatherList({
      temp: day.main.temp,
      windSpeed: day.wind.speed,
      humidity: day.main.humidity,
    });

    listItem.appendChild(h3);
    listItem.appendChild(img);
    listItem.appendChild(weatherList);

    list.appendChild(listItem);
  });

  return list;
}

function createWeatherList({ temp, windSpeed, humidity }) {
  const list = document.createElement("ul");

  const tempEl = document.createElement("li");
  const windSpeedEl = document.createElement("li");
  const humidityEl = document.createElement("li");

  tempEl.textContent = `Temperature: ${temp} °F`;
  windSpeedEl.textContent = `Wind Speed: ${windSpeed} MPH`;
  humidityEl.textContent = `Humidity: ${humidity}%`;

  list.appendChild(tempEl);
  list.appendChild(windSpeedEl);
  list.appendChild(humidityEl);

  return list;
}

export default {
  renderCurrentWeather(weather, el) {
    el.innerHTML = "";

    const { name: cityName, main, weather: weatherData } = weather;

    const { temp, humidity } = main;
    const { description, icon } = weatherData[0];
    const { speed: windSpeed } = weather.wind;

    el.appendChild(createCurrentWeatherHeader({ cityName, description, icon }));
    el.appendChild(createWeatherList({ temp, windSpeed, humidity }));
  },

  renderForecast(forecast, el) {
    el.innerHTML = "";

    const h2 = createForecastH2();
    const list = createForecastList(forecast);

    el.appendChild(h2);
    el.appendChild(list);
  },

  renderHistoryButtons(history, el) {
    el.innerHTML = "";

    history.forEach((city) => {
      const button = document.createElement("button");

      button.setAttribute("type", "button");
      button.textContent = city.name;
      button.dataset.lat = city.coords.lat;
      button.dataset.lon = city.coords.lon;

      button.classList.add("block", "w-full", "my-2", "rounded", "bg-blue-500", "text-white");

      el.appendChild(button);
    });
  },
};