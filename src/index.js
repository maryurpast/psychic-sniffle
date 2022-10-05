function formatDate(date) {
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
  let dayNumber = String(date.getDate()).padStart(2, "0");
  let month = String(date.getMonth() + 1).padStart(2, "0");

  return `${day} ${dayNumber}.${month}`;
}

function searchLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiKey = "355e9d8397df6576cd27184097b1272d";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather?";
  let units = "metric";
  let apiUrl = `${apiEndPoint}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function displayWeatherCondition(response) {
  celsiusTemperature = Math.round(response.data.main.temp);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#city-input").value = null;
  document.querySelector("#temperature").innerHTML = celsiusTemperature;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "355e9d8397df6576cd27184097b1272d";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather?";
  let units = "metric";
  let apiUrl = `${apiEndPoint}q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition); //API call
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  if (!city) {
    alert("Enter a city");
  }
  searchCity(city);
}

//Display Current Date
let currentTime = new Date();
document.querySelector("#day").innerHTML = formatDate(currentTime);

//City Onload + City Search
searchCity("Vinnytsia");

//Submit handling
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

//Current city
let currentCityButton = document.querySelector("#current-city-btn");
currentCityButton.addEventListener("click", getCurrentLocation);
