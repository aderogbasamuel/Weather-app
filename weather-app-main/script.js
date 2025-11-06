const weatherConditions = {
  0: { name: "Clear sky", icon: "icon-sunny.webp" },
  1: { name: "Mainly clear", icon: "icon-sunny.webp" },
  2: { name: "Partly cloudy", icon: "icon-partly-cloudy.webp" },
  3: { name: "Overcast", icon: "icon-overcast.webp" },
  45: { name: "Foggy", icon: "icon-fog.webp" },
  48: { name: "Depositing rime fog", icon: "fog.png" },
  51: { name: "Light drizzle", icon: "icon-drizzle.webp" },
  61: { name: "Slight rain", icon: "icon-rain.webp" },
  63: { name: "Moderate rain", icon: "icon-rain.webp" },
  65: { name: "Heavy rain", icon: "icon-storm.webp" },
  71: { name: "Slight snow", icon: "icon-snow.webp" },
  80: { name: "Rain showers", icon: "icon-storm.webp" },
  95: { name: "Thunderstorm", icon: "icon-storm.webp" },
};

window.addEventListener('DOMContentLoaded', getUserLocation);
function getUserLocation() {
  // Tab to edit
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      getWeather(lat, lon, true)
      console.log(lon)
    },
      (error) => {
        console.log(error)
      }
    )
  } else {
    alert('not found')
  }
}

function showWeatherEffect(condition) {
  // Select all elements that have the 'weatherBg' class, even if they have multiple classes
  const elements = document.querySelectorAll('.weatherBg');

  // Hide all weather elements
  elements.forEach(el => el.classList.remove('active'));

  console.log(condition);

  // Map conditions to element IDs
  const weatherMap = {
    sunny: [0, 1],
    rainy: [61, 63, 65, 80],
    snowy: [71, 73, 75]
  };

  // Find the target element ID
  let targetId = 'cloudy'; // default fallback
  for (const [key, values] of Object.entries(weatherMap)) {
    if (values.includes(condition)) {
      targetId = key;
      break;
    }
  }

  // Add 'active' class to the target element
  const target = document.getElementById(targetId);
  if (target) target.classList.add('active');
}

/*
function getWeather(lat, lon, fromLocation = false) {
  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,weathercode&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`;
  fetch(apiUrl).then((response) => response.json()).then((data) => {
    const current = data.current_weather;
    const condition = weatherConditions[current.weathercode] || { name: "Unknown", icon: "unknown.png" };
    showWeatherEffect(current.weathercode);
    document.getElementById('icon').src = `assets/images/${condition.icon}`;
    document.getElementById('icon').alt = `assets/images/${condition.name}`;
    
    console.log(condition)
    const dateCount = document.getElementById('date');
    const todayDate = new Date(current.time).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    dateCount.innerHTML = todayDate;
    console.log(todayDate)
    
    document.getElementById('temp').innerHTML = `${current.temperature}°`
    
    reverseGeocode(lat, lon)
  }).catch((error) => console.log(error))
}*/
async function getWeather(lat, lon, fromLocation = false) {
  try {
    // const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,wind_speed_10m,weathercode&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`;
    const apiUrl = "https://api.open-meteo.com/v1/forecast?latitude=6.5244&longitude=8.3792&current=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,wind_speed_10m,weathercode&timezone=auto"


    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data)
    const current = data.current;
    if (!current) throw new Error("No current weather data found.");

    const condition =
      weatherConditions[current.weathercode] || {
        name: "Unknown",
        icon: "unknown.png",
      };

    // 🔹 Show background animation
    showWeatherEffect(current.weathercode);

    // 🔹 Set weather icon + temp
    const iconEl = document.getElementById("icon");
    iconEl.src = `assets/images/${condition.icon}`;
    iconEl.alt = condition.name;
    document.getElementById("temp").textContent = `${current.temperature_2m}°`;

    // 🔹 Show date
    const dateCount = document.getElementById("date");
    const todayDate = new Date(current.time).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    dateCount.textContent = todayDate;

    // 🔹 Find correct hour index
    const feelsLike = current.apparent_temperature;
    const humidity = current.relative_humidity_2m;
    const precipitation = current.precipitation;
    const wind = current.wind_speed_10m;
    console.log(feelsLike, humidity, precipitation, wind)
    document.getElementById('feels_like').textContent = feelsLike ? `${feelsLike}°` : '--';
    document.getElementById('humidity').textContent = humidity ? `${humidity}%` : '--';
    document.getElementById('precipitation').textContent = `${precipitation} mm` ?? "--";
    document.getElementById('windspeed').textContent = wind ? `${wind} km/h` : '--';

    // 🔹 Update UI
    console.log(current)
    console.log("Weather data updated successfully!");

    reverseGeocode(lat, lon);
  } catch (error) {
    console.error("Weather fetch failed:", error);
  }
}
// === Reverse geocode to get city & country =
function reverseGeocode(lat, lon) {
  const geoUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`;

  fetch(geoUrl)
    .then((response) => response.json())
    .then((data) => {
      const city = data.city || data.locality || "Unknown City";
      const country = data.countryName || "Unknown Country";
      document.getElementById("location").innerText = `${city}, ${country}`;
      console.log(`${city}, ${country}`);
    })
    .catch((error) =>
      console.error("Could not fetch location name.", error)
    );
}
//getWeather(6.5244, 3.3792, true); // Lagos coordinates

