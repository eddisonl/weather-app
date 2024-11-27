"use strict";
const apiKey = "9f6ab8d127ea1a46a421a75e4cbfdd01";
const tempDivInfo = document.getElementById("temp-div");
const weatherInfoDiv = document.getElementById("weather-info");
const weatherIcon = document.getElementById("weather-icon");
const hourlyForecastDiv = document.getElementById("hourly-forecast");
function getWeather() {
  const city = document.getElementById("city").value;
  if (!city) {
    alert("please enter a city");
    return;
  }
  const currentWeatherUrl = `https://api.openweathermap.org/data2.5/weather?q=${city}&appid=${apiKey}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
  // fetch(currentWeatherUrl)
  //   .then((response) => response.json())
  //   .then((data) => {
  //     displayWeather(data);
  //   })
  //   .catch((error) => {
  //     console.error("Error fetching current weather data:", error);
  //     alert("Error fetching current weather data.Please try again.");
  //   });

  fetch(forecastUrl)
    .then((response) => response.json())
    .then((data) => {
      displayHourlyForecast(data.list);
    })
    .catch((error) => {
      console.error("Error fetching current hourly forecast data:", error);
      alert("Error fetching current hourly forecast data.Please try again.");
    });
}
function displayWeather(data) {
  weatherInfoDiv.innerHTML = "";
  hourlyForecastDiv = "";
  tempDivInfo = "";

  if (data.cod === "404") {
    weatherInfoDiv.innerHTML = `<p>${(data, message)}</p>`;
  } else {
    const cityName = data.name;
    const temperature = Math.round(data.main.temp - 273.15);
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
  }
  const temperatureHTML = `<p>${temperature}celcius</p>`;

  tempDivInfo.innerHTML = temperatureHTML;
  weatherInfoDiv.innerHTML = weatherHTML;
  weatherIcon.src = iconUrl;
  weatherIcon.alt = description;

  showImage();
}
function displayHourlyForecast(hourlyData) {
  const next24Hours = hourlyData.slice(0, 8);

  next24Hours.forEach((items) => {
    const dateTime = new Date(items.dt * 1000);
    const hour = dateTime.getHours();
    const temperature = Math.round(items.main.temp - 273.15);
    const iconCode = items.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

    const hourlyItemHtml = `<div class="hourly-item">
    <span>${hour}: 00</span>
    <img src ="${iconUrl}" alt="Hourly Weather Icon">
    <span>${temperature} Celcius</span>
    </div>`;
    hourlyForecastDiv.innerHTML += hourlyItemHtml;
  });
}

function showImage() {
  // const weatherIcon = document.getElementById("weather-icon");
  weatherIcon.style.display = "block";
}
