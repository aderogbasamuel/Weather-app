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
  }
}

function getWeather(lat, lon, fromLocation = false) {
  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weathercode&hourly=temperature_2m,weathercode&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`;
  fetch(apiUrl).then((response) => response.json()).then((data) => {
    const current = data.current_weather;
    const dateCount = document.getElementById('date');
    const todayDate = new Date(current.time).toLocaleDateString("en-US", {
      weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    dateCount.innerHTML = todayDate;
    console.log(todayDate)
  }).catch((error)=>console.log(error))
}
window.onload = getUserLocation