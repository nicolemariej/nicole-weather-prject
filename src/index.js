function formatTime(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day}`;
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `  
            <div class="col-2">
              ${day}
              <br />
              <img
                src="https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png"
                alt="partly cloudy"
              />
              <div class="forcast-temperature">
                <span class="forcast-max">20° </span
                ><span class="forcast-min"> 10°</span>
              
            </div>
          </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiKey = "12f35b27492677297a3092d359a9b88f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let cityElement = document.querySelector("#city");
  let description = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let currentTemperature = document.querySelector("#current-temperature");
  let dateElement = document.querySelector("#current-day");
  let timeElement = document.querySelector("#current-time");
  let currentIconElement = document.querySelector("#current-weather-image");

  celsiusTemperature = response.data.main.temp;

  currentTemperature.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  humidityElement.innerHTML = response.data.main.humidity;
  description.innerHTML = response.data.weather[0].description;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  timeElement.innerHTML = formatTime(response.data.dt * 1000);
  currentIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  currentIconElement.setAttribute(
    "alt",
    `http://openweathermap.org/img/wn/${response.data.weather[0].description}@2x.png`
  );

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "12f35b27492677297a3092d359a9b88f";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#current-temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  currentTemperature.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("sydney");
