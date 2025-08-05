const cityInput = document.querySelector(".search-city");
const searchBtn = document.querySelector(".btn");

// Trigger search when clicking the button
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city !== "") {
    updateWeatherInfo(city);
    cityInput.value = "";
    cityInput.blur();
  }
});

// Trigger search when pressing Enter key
cityInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const city = cityInput.value.trim();
    if (city !== "") {
      updateWeatherInfo(city);
      cityInput.value = "";
      cityInput.blur();
    }
  }
});

// Utility: format JS Date as 'Day, DD Mon'
function getFormattedDate(date = new Date()) {
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const day = dayNames[date.getDay()];
  const dd = String(date.getDate()).padStart(2, "0");
  const mon = monthNames[date.getMonth()];

  return `${day}, ${dd} ${mon}`;
}

// Placeholder for weather API call
function getFetchData(cityName) {
  console.log("Fetching data for:", cityName);

  // Dummy response structure
  return {
    city: cityName,
    date: getFormattedDate(),
    temperature: 29,
    condition: "Clouds",
    humidity: "55%",
    windSpeed: "2 m/s",
    forecast: [
      {
        date: getFormattedDate(new Date(Date.now() + 86400000)),
        temp: "30 °C",
        img: "weather/thunderstorm.svg",
      },
      {
        date: getFormattedDate(new Date(Date.now() + 2 * 86400000)),
        temp: "28 °C",
        img: "weather/clouds.svg",
      },
      {
        date: getFormattedDate(new Date(Date.now() + 3 * 86400000)),
        temp: "27 °C",
        img: "weather/rain.svg",
      },
      {
        date: getFormattedDate(new Date(Date.now() + 4 * 86400000)),
        temp: "31 °C",
        img: "weather/clear.svg",
      },
    ],
  };
}

// Main UI updater
function updateWeatherInfo(cityName) {
  const data = getFetchData(cityName);

  document.querySelector(".country-date").textContent = data.city;
  document.querySelector(".current-date").textContent = data.date;
  document.querySelector(".temp").textContent = `${data.temperature} °C`;
  document.querySelector(".condition-txt").textContent = data.condition;
  document.querySelector(".humidity-value-text").textContent = data.humidity;
  document.querySelectorAll(".humidity-value-text")[1].textContent =
    data.windSpeed;
  document.querySelector(".weather-img").src = data.forecast[0]?.img;

  // Clear and repopulate forecast items
  const forecastContainer = document.querySelector(".forecast-item-container");
  forecastContainer.innerHTML = "";
  data.forecast.forEach((day) => {
    const item = document.createElement("div");
    item.classList.add("forecast-item");
    item.innerHTML = `
      <h5 class="forecast-item-date regular">${day.date}</h5>
      <img src="${day.img}" class="forecast-item-img">
      <h5 class="forecast-item-temp">${day.temp}</h5>
    `;
    forecastContainer.append(item);
  });

  // Show weather section, hide messages
  document.querySelector(".wheather-info").style.display = "block";
  document.querySelector(".mesages").style.display = "none";
  document.querySelector(".not-fond").style.display = "none";
}
