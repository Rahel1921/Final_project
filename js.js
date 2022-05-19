function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[dayIndex];
  return `${day} ${hours}:${minutes}`;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
function forcast(response) {
  let daily = response.data.daily;
  let weatherForcast = document.querySelector("#forcast");

  let forcastHtml = `<div class ="row">`;
  daily.forEach(function (forecastDay, index) {
    if (index < 6) {
      forcastHtml =
        forcastHtml +
        `
          
              <div class="col-2">
                <div class="weather-date">${formatDay(forecastDay.dt)}</div>
                  <img src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png" alt=""width="46">
                  <div class="weather-temp">
                 <span id="degree-max">${Math.round(
                   forecastDay.temp.max
                 )}°</span>
                  <span id="degree-min">${Math.round(
                    forecastDay.temp.min
                  )}°</span>
              </div>
              </div>
              
            `;
    }
  });

  forcastHtml = forcastHtml + `</div>`;

  weatherForcast.innerHTML = forcastHtml;
}
function getWeather(coordinates) {
  console.log(coordinates);
  let apiKey = "27c1088608a4e6aab19c47ba35fcbd2b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(forcast);
}

function displayWeatherCondition(response) {
  console.log(response);
  document.querySelector("#city").innerHTML = response.data.name;
  let iconElement = document.querySelector("#icons");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  celTemp = response.data.main.temp;
  document.querySelector("#temp").innerHTML = Math.round(celTemp);

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;

  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector(".description").innerHTML =
    response.data.weather[0].description;
  getWeather(response.data.coord);
}

function searchCity(city) {
  let apiKey = "27c1088608a4e6aab19c47ba35fcbd2b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "27c1088608a4e6aab19c47ba35fcbd2b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let celTemp = null;

let Form = document.querySelector("#form");
Form.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector(".location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Ethiopia");
