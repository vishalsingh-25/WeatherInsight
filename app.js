let body = document.querySelector("body");
let searchBar = document.getElementById("searchBar");
let searchBox = document.getElementById("searchBox");
let searchBtn = document.getElementById("searchBtn");
let cityName = document.getElementById("city-name");
let date = document.getElementById("date");
let temp = document.getElementById("temp");
let description = document.getElementById("description");
let weatherImg = document.getElementById("weather-img");
let pricip = document.getElementById("pricip");
let hiLow = document.getElementById("hiLow");
let humidity = document.getElementById("humidity");
let pressure = document.getElementById("pressure");
let windSpeed = document.getElementById("windSpeed");
let mainContainer = document.querySelector(".main-container");
let now = new Date();

window.onload = () => {
  navigator.geolocation.getCurrentPosition(gotLocation, failedToGet);
};

function gotLocation(position) {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
      position.coords.latitude +
      "&lon=" +
      position.coords.longitude +
      "&appid=dc175459d9777731997433c27811ba75&units=metric"
  )
    .then((weather) => {
      return weather.json();
    })
    .then(displayResult);
}

function failedToGet() {
  alert("Failed to get your location");
}

searchBtn.onclick = () => {
  getResult(searchBox.value);
};

searchBox.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    getResult(searchBox.value);
  }
});

function getResult(city) {
  if (city.length == 0) {
    alert("please enter valid city name");
  } else {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&appid=dc175459d9777731997433c27811ba75&units=metric&cnt=7"
    )
      .then((weather) => {
        return weather.json();
      })
      .then(displayResult);

    searchBox.value = "";
  }
}

function displayResult(weather) {
  if (weather.cod == 404) {
    alert("City not found");
  }
  cityName.innerHTML = weather.name;
  temp.innerHTML = Math.round(weather.main.temp) + "°C";
  hiLow.innerHTML =
    Math.round(weather.main.temp_min) +
    "°C / " +
    Math.round(weather.main.temp_max) +
    "°C";
  pricip.innerHTML = weather["weather"][0]["main"];

  humidity.innerHTML = weather.main.humidity + "%";

  pressure.innerHTML = weather.main.pressure + "hPa";

  windSpeed.innerHTML = weather.wind.speed + "m/s";

  let iconId = weather["weather"][0]["icon"];
  weatherImg.src = "img/icon/" + iconId + ".png";
  if (iconId.slice(-1) == "n") {
    body.classList.add("dark");
    mainContainer.classList.add("stars");
  } else {
    body.classList.remove("dark");
    mainContainer.classList.remove("stars");
  }

  date.innerHTML = currentData(now);
}

function currentData(d) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thrusday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} , ${date} ${month} ${year}`;
}
