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

// show real weather and city

function displayWeather(response) {

    console.log(response.data.temperature.current);
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(response.data.temperature.current);
    let cityElement = document.querySelector("#actual-city");
    cityElement.innerHTML = response.data.city;
    let descriptionElement = document.querySelector("#description");
    descriptionElement.innerHTML = response.data.condition.description;
    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = response.data.temperature.humidity;
    let windElement = document.querySelector("#wind");
    windElement.innerHTML = Math.round(response.data.wind.speed);
    let iconElement = document.querySelector("#h1-icon");
    iconElement.setAttribute("src", `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`);
    iconElement.setAttribute("alt", response.data.condition.description)

}




let apiKey = "dcdf4529bd3tb420ca3d3f41eaod213b";
let query = "New York";
let units = "metric";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${query}&key=${apiKey}&units=${units}`;
console.log(apiUrl); 

axios.get(apiUrl).then(displayWeather);





