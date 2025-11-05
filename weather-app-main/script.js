
const weatherConditions = {
  0: { name: "Clear sky", icon: "sunny.png" },
  1: { name: "Mainly clear", icon: "sunny.png" },
  2: { name: "Partly cloudy", icon: "icon-partly-cloudy.webp" },
  3: { name: "Overcast", icon: "cloudy.png" },
  45: { name: "Foggy", icon: "fog.png" },
  48: { name: "Depositing rime fog", icon: "fog.png" },
  51: { name: "Light drizzle", icon: "drizzle.png" },
  61: { name: "Slight rain", icon: "rain.png" },
  63: { name: "Moderate rain", icon: "rain.png" },
  65: { name: "Heavy rain", icon: "rain.png" },
  71: { name: "Slight snow", icon: "snow.png" },
  80: { name: "Rain showers", icon: "rain.png" },
  95: { name: "Thunderstorm", icon: "thunder.png" },
};

window.onload = getUserLocation

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
  }else{
    alert('not found')
  }
}


function getWeather(lat, lon, fromLocation = false) {
const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,weathercode&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`;
  fetch(apiUrl).then((response) => response.json()).then((data) => {
    const current = data.current_weather;
    const condition=weatherConditions[current.weathercode] || { name: "Unknown", icon: "unknown.png" };
document.getElementById('icon').src=`assets/images/${condition.icon}`;
document.getElementById('icon').alt=`assets/images/${condition.name}`;

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
    
    document.getElementById('temp').innerHTML=`${current.temperature}°C`
    
    reverseGeocode(lat,lon)
  }).catch((error) => console.log(error))
}

// === Reverse geocode to get city & country ===
function reverseGeocode(lat, lon) {
  const geoUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`;

  fetch(geoUrl)
    .then(response => response.json())
    .then(data => {
      const city = data.city || data.locality || "Unknown City";
      const country = data.countryName || "Unknown Country";
      document.getElementById("location").innerText = `${city}, ${country}`;
      console.log(`${city}, ${country}`);
    })
    .catch(error => console.log("Could not fetch location name.", error));
}
//getWeather(6.5244, 3.3792, true); // Lagos coordinates