// show current time

let date = new Date();
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Thuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let hour = [date.getHours()];
  if (hour < 10) {
    hour = `0 ${hour}`;
  }
  let minutes = [date.getMinutes(2)];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let currentDay = days[date.getDay()];

  return `${currentDay} ${hour}:${minutes}`;
}
let now = document.querySelector("#actual-date-time");
now.innerHTML = formatDate(date);

// change time to name of each day

function formatDay(timestamp) {
let date = new Date(timestamp * 1000);
let day = date.getDay();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

return days[day];
}

// replace forecast fron HTML to JS

function displayForecast(response) {
    let forecast = response.data.daily;
    console.log(response.data.daily);
    let forecastElement = document.querySelector("#forecast");
    let forecastHTML = `<div class="row">`;
    
    forecast.forEach(function(forecastDay, index) {
        if (index < 6) {
        forecastHTML = forecastHTML + `
    
                    <div class="col-2">
                        <div class="weather-forecast-date">
                         ${formatDay(forecastDay.time)}
                        </div>
                           <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${forecastDay.condition.icon}.png" 
                           alt="" 
                           class="sun-icon" width="50"/>
                        <div class="weather-forecast-temperature">
                           <span class="weather-forecast-temperature-max">
                            ${Math.round(forecastDay.temperature.maximum)}°
                            </span>
                           <span class="weather-forecast-temperature-min"> 
                            ${Math.round(forecastDay.temperature.minimum)}°
                           </span>
                      </div>
                    </div>
    `;
        }
    });

    
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
    console.log(forecastHTML); 
}

// display 6 days forecast
function getForecast(coordinates) {
    console.log(coordinates);
    let apiKey = "dcdf4529bd3tb420ca3d3f41eaod213b";
    let units = "metric";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=${units}`;
    console.log(apiUrl);
    axios.get(apiUrl).then(displayForecast);
}





// show real weather and city

function displayWeather(response) {

    console.log(response.data);
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#actual-city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let iconElement = document.querySelector("#h1-icon");

    celsiusTemperature = response.data.temperature.current
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    cityElement.innerHTML = response.data.city;
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = response.data.temperature.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    iconElement.setAttribute("src", `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`);
    iconElement.setAttribute("alt", response.data.condition.description);
    getForecast(response.data.coordinates);

}

function search(city) {
    let apiKey = "dcdf4529bd3tb420ca3d3f41eaod213b";
    let units = "metric";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(displayWeather);
    
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#enter-city");
    search(cityInputElement.value);
    
}

function searchLocation(position) {
    console.log(position);
    let apiKey = "dcdf4529bd3tb420ca3d3f41eaod213b";
    let units = "metric";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${position.coords.longitude}&lat=${position.coords.latitude}&key=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(search);
    
}
  
function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
    console.log(position);
}

function showFahrenheitTemperature(event) {
    event.preventDefault();
    let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);

}
function showCelsiusTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);


}

let celsiusTemperature = null;


let form = document.querySelector("#search-city");
form.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#actual-location");
  currentLocationButton.addEventListener("click", getCurrentLocation);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);
  search("London");
  