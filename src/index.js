import { forecastSection, form, historySection, todaySection } from "./lib";
import apiService from "./services/api.service";
import renderService from "./services/render.service";

const historyStorage = JSON.parse(localStorage.getItem("history")) || [];

let coords;
let currentWeather;
let noonForcastData;

function addCityToHistoryStorage(cityName, coords) {
  const cityNameLowered = cityName.toLowerCase();

  if (!historyStorage.find((city) => city.name === cityNameLowered)) {
    historyStorage.push({ name: cityNameLowered, coords });
    localStorage.setItem("history", JSON.stringify(historyStorage));
  }
}

async function renderWeather(coords) {
  currentWeather = await apiService.getCurrentWeather(coords);
  noonForcastData = await apiService.getNoonForecastData(coords);

  renderService.renderCurrentWeather(currentWeather, todaySection);
  renderService.renderForecast(noonForcastData, forecastSection);
}

renderService.renderHistoryButtons(historyStorage, historySection);

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const city = e.target.city.value;

  coords = await apiService.getCoords(city);

  addCityToHistoryStorage(city, coords);
  renderService.renderHistoryButtons(historyStorage, historySection);

  renderWeather(coords);
});

historySection.addEventListener("click", async (e) => {
  const clicked = e.target;

  if (clicked.tagName === "BUTTON") {
    renderWeather({
      lat: clicked.dataset.lat,
      lon: clicked.dataset.lon,
    });
  }
});

// window.addEventListener("load", () => {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition((position) => {
//       const lon = position.coords.longitude;
//       const lat = position.coords.latitude;
//       const URL =
//         `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&` +
//         `lon=${lon}&appid=${APIkey}`;

//       fetch(URL)
//         .then((res) => {
//           return res.json();
//         })
//         .then((data) => {
//           console.log(data);
//           console.log(new Date().getTime());
//           const dat = new Date(data.dt);
//           console.log(dat.toLocaleString());
//           console.log(new Date().getMinutes());
//           weatherReport(data);
//         });
//     });
//   }
// });

// function searchByCity() {
//   const place = document.getElementById("input").value;
//   const urlsearch = `http://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${APIkey}`;

//   fetch(urlsearch)
//     .then((res) => {
//       return res.json();
//     })
//     .then((data) => {
//       console.log(data);
//       weatherReport(data);
//     });
//   document.getElementById("input").value = "";
// }

// function getHistory() {
//   let history = localStorage.getItem("search-history");
//   history = JSON.parse(history);
//   console.log(history);
//   history.forEach((place) => cities.push(place));
//   console.log(cities);
// }
// getHistory();

// const createRecentCity = function () {
//   const listItemEl = document.createElement("li");
//   listItemEl.className = "recentSearch";

//   // add city id as custom attribute
//   listItemEl.setAttribute("data-city-id", recentCityCounter);

//   const cityInfoEl = document.createElement("h3");
//   cityInfoEl.className = "cityInfo";
//   cityInfoEl.innerHTML = "<h3 class='cityName'>";
// };

// function weatherReport(data) {
//   const urlcast =
//     `http://api.openweathermap.org/data/2.5/forecast?q=${data.name}&` +
//     `appid=${APIkey}&units=imperial`;

//   fetch(urlcast)
//     .then((res) => {
//       return res.json();
//     })
//     .then((forecast) => {
//       console.log(forecast.city);
//       // hourForecast(forecast);
//       dayForecast(forecast);

//       console.log(data);
//       document.getElementById("currentCityWeather").innerText =
//         data.name + ", " + data.sys.country;
//       console.log(data.name + "," + data.sys.country);

//       console.log(Math.floor(data.main.temp - 273));
//       document.getElementById("Ctemp").innerText =
//         Math.floor(data.main.temp * 1.8 - 459.67) + " °F";

//       document.getElementById("Chumd").innerText =
//         "Humidity: " + data.main.humidity + "%";
//       console.log(data.main.humidity);

//       document.getElementById("Cwind").innerText =
//         "Wind Speed: " + Math.floor(data.wind.speed / 0.44704) + "mph";
//       console.log(data.wind.speed);

//       const icon1 = data.weather[0].icon;
//       const iconURL = "http://api.openweathermap.org/img/w/" + icon1 + ".png";
//       document.getElementById("img").src = iconURL;
//     });
// }

// function dayForecast(forecast) {
//   document.getElementById("futureWeather").innerHTML = "";
//   for (let i = 7; i < forecast.list.length; i += 7) {
//     console.log(forecast.list[i]);
//     const div = document.createElement("div");
//     div.setAttribute("class", "dayF");

//     const day = document.createElement("p");
//     day.setAttribute("class", "date");
//     day.innerText = new Date(forecast.list[i].dt * 1000).toLocaleDateString();
//     div.appendChild(day);

//     const temp = document.createElement("p");
//     temp.innerText = Math.floor(forecast.list[i].main.temp_max) + " °F";
//     div.appendChild(temp);

//     const wind = document.createElement("p");
//     wind.innerText = Math.floor(forecast.list[i].wind.speed) + " mph";
//     div.appendChild(wind);

//     const hum = document.createElement("p");
//     hum.innerText = Math.floor(forecast.list[i].main.humidity) + " %";
//     div.appendChild(hum);

//     const description = document.createElement("p");
//     description.setAttribute("class", "desc");
//     description.innerText = forecast.list[i].weather[0].description;
//     div.appendChild(description);

//     const icon = document.createElement("img");
//     description.setAttribute(
//       "src",
//       "http://api.openweathermap.org/img/w/",
//       ".png",
//       "id",
//       "img"
//     );
//     description.innerText = forecast.list[i].weather[0].icon;
//     div.appendChild(icon);

//     document.getElementById("futureWeather").appendChild(div);
//   }
// }

// let gotPosition = function(pos) {
//   let lat = pos.coords.latitude;
//   let long = pos.coords.longitude;
//   getForecast(lat, long);
// }

// document.getElementById("searchBtn").addEventListener("click",()=>{
//   var city = document.getElementById("input").ariaValue;

//   var urlsearch = ``
// })

// let getForecast = function(lat, long) {
//   let url = "api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + long + "&appid=" + "1feeae181c216523cb0b0ff24fd0683b";
// }
//   let parseWeather = function (weatherText) {
//     let weatherJSON = JSON.parse(weatherText);
//     let dailyForecast = weatherJSON.daily;
// console.log(dailyForecast);
//     for (x = 0; x < dailyForecast.length; x++) {
//       let day = dailyForecast[x];
//       let today = new Date().getDay() + x;
//       if (today > 6) {
//         today = today - 7;
//       }
//       let dayOfWeek = getDayOfWeek(today);
//       let description = day.weather[0].description;
//       let icon = day.weather[0].icon;
//       let highTemp = kToF(day.temp.max);
//       let lowTemp = kToF(day.temp.min);
//       let humidity = day.humidity;
//       let windSpeed = day.wind_speed;
//       displayWeatherDay(
//         dayOfWeek,
//         description,
//         icon,
//         highTemp,
//         lowTemp,
//         humidity,
//         windSpeed
//       );
//     }
//   };

//   let kToF;
// }

// const api = "1feeae181c216523cb0b0ff24fd0683b";
// var searchInput = document.getElementById("seachInput");
// var searchInputsubmit = document.getElementById("submit");
// var city;
// var cities = [];

// var recentSearchCounter = 0;

// function to search for a city
// function getCity(event) {
//   event.preventDefault();
//   console.log(searchInput.value);
//   city = searchInput.value.trim();
//   cities.push(city);
//   localStorage.setItem("search-history", JSON.stringify(cities));
//   const queryURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${api}`;
//   fetch(queryURL)
//     .then((response) => response.json())
//     .then((data) => getWeather(data));
// }

// write a function that checks local storage for search history and populates cities array with results
// function getHistory() {
//   let history = localStorage.getItem("search-history");
//   history = JSON.parse(history);
//   //   console.log(history);
//   history.forEach((place) => cities.push(place));
//   console.log(cities);
// }
// getHistory();
// write a function to add searched city to local storage

// const createRecentCity = function () {
//   const listItemEl = document.createElement("li");
//   listItemEl.className = "recentSearch";

//   // add city id as custom attribute
//   listItemEl.setAttribute("data-city-id", recentCityCounter);

//   const cityInfoEl = document.createElement("h3");
//   cityInfoEl.className = "cityInfo";
//   cityInfoEl.innerHTML = "<h3 class='cityName'>";
// };

// write a function to get weather for city
// function getWeather(cityArr) {
//   console.log(cityArr);
//   const lat = cityArr[0].lat;
//   const lon = cityArr[0].lon;
//   const openWeatherUrl = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${api}`;
//   fetch(openWeatherUrl)
//     .then((response) => response.json())
//     .then((data) => renderWeather(data));
// }
// searchInputSubmit.addEventListener("click", getCity);

// write a function to store recently-searched cities

// write a function to fetch and display recently-searched cities

// write a function to render weather
// function renderWeather(forecast) {
//   console.log(forecast);
//   const temp = forecast.current.temp;
//   const wind = forecast.current.wind_speed;
//   const uvi = forecast.current.uvi;
//   const humidity = forecast.current.humidity;
//   const icon = forecast.current.weather[0].icon;
//   const unixDate = forecast.current.dt;
//   const dateObject = new Date(unixDate * 1000);
//   console.log(dateObject);
//   const dateDisplayed = dateObject.toLocaleString("en-US", {
//     timeZoneName: "short",
//   });

//   dateDisplayed = dateDisplayed.split(",");
//   console.log(dateDisplayed);

//   const currentWeatherTemplate = `
//     <h2 class="col-md-12">${city} ${dateDisplayed[0]} <img class="icon"></h2>
//     <div class="col-md-12"
//         <p>Temp: ${temp}</p>
//         <p>Wind: ${wind} mph</p>
//         <p>UV Index: ${uvi}</p>
//         <p>Humidity: ${humidity}%</p>
//     `;

// attempt at consolidating variables/innerHTML below
//   const futureWeatherTemplateArr = [];
//   for (let i = 1; i < 6; i++) {
//     const futureTemp = forecast.daily[i].temp.day;
//     const futureWind = forecast.daily[i].wind_speed;
//     const futureHum = forecast.daily[i].humidity;
//     const futureUnixDate = forecast.daily[i].dt;
//     const futureDateObject = new Date(futureUnixDate * 1000);
//     const futureDateDisplayed = futureDateObject.toLocaleString("en-US", {
//       timeZoneName: "short",
//     });

//     futureDateDisplayed = futureDateDisplayed.split(",");
//     const futureIcon = forecast.daily[i].weather.icon;

//     const futureWeatherTemplate = `
//         <div class="forecast card h-100">
//             <div class="date card-title">${futureDateDisplayed[0]}</div>
//                 <img class="icon">
//                 <p>Temp: ${futureTemp}</p>
//                 <p>Wind: ${futureWind} mph</p>
//                 <p>Humidity: ${futureHum}%</p>
//             </div>
//         </div>
//         `;

//     futureWeatherTemplateArr.push(futureWeatherTemplate);
//   }

//   const currentWeather = document.querySelector("#currentWeather");
//   currentWeather.innerHTML = currentWeatherTemplate;

//   const futureWeather = document.querySelector("#futureWeather");
//   futureWeather.innerHTML = futureWeatherTemplateArr;
// }
