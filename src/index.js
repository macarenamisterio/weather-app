function showCityWeather(response) {
  let now = new Date();
  console.log(response.data);
  document.getElementById(
    "date-time"
  ).innerHTML = `Today is ${now.toLocaleString()}`;
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#h").innerHTML = response.data.main.humidity;
  document.querySelector("#w").innerHTML = response.data.wind.speed;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  // figure out how to add the icon
  document.querySelector("#weather-icon").innerHTML =
    response.data.weather[0].icon;
}

function searchCity(city) {
  let apiKey = "99f763cf958e5832295c470b28782d08";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showCityWeather);
}

function handleSubmit(event) {
  debugger;
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function getLocation(position) {
  let apiKey = "99f763cf958e5832295c470b28782d08";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showCityWeather);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let button = document.querySelector("button");
button.addEventListener("click", currentLocation);

searchCity("Santiago");
