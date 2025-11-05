// -------------- Helpers --------------
function safeLog(...args) {
  console.log("[WeatherKnow]", ...args);
}

function showMessage(msg) {
  const el = document.getElementById("date");
  if (el) el.innerText = msg;
  else safeLog("No #date element to show message:", msg);
}

// -------------- Get user location --------------
function getUserLocation() {
  if (!navigator.geolocation) {
    safeLog("Geolocation not supported by browser.");
    showMessage("Geolocation not supported");
    return;
  }

  safeLog("Requesting user location...");
  navigator.geolocation.getCurrentPosition(
    (position) => {
      safeLog("Got position:", position.coords.latitude, position.coords.longitude);
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      getWeather(lat, lon, true);
    },
    (error) => {
      safeLog("Geolocation error:", error);
      showMessage("Location blocked or unavailable — try searching manually");
      // optionally you can call a fallback here, like showing a search input
    },
    { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 }
  );
}

// -------------- Get weather from Open-Meteo --------------
function getWeather(lat, lon, fromLocation = false) {
  safeLog("Fetching weather for", lat, lon);

  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,weathercode&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`;

  fetch(apiUrl)
    .then((response) => {
      safeLog("Fetch response status:", response.status);
      return response.json();
    })
    .then((data) => {
      safeLog("API data:", data);

      if (!data) {
        throw new Error("No data returned from API");
      }

      // current_weather should exist
      const current = data.current_weather;
      if (!current) {
        throw new Error("current_weather missing in API response");
      }

      // Make sure the target element exists before updating it
      const dateEl = document.getElementById("date");
      if (!dateEl) {
        safeLog("Element with id='date' not found in DOM");
      } else {
        // Format the date from the API time string
        // current.time is ISO string like "2025-11-05T12:00"
        const todayDate = new Date(current.time).toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        dateEl.innerText = todayDate;
      }

      // Example: show temp if you have #temp element
      const tempEl = document.getElementById("temp");
      if (tempEl && typeof current.temperature === "undefined" && typeof current.temperature_2m !== "undefined") {
        // older examples use temperature_2m
        tempEl.innerText = `${current.temperature_2m}°C`;
      } else if (tempEl && typeof current.temperature !== "undefined") {
        tempEl.innerText = `${current.temperature}°C`;
      }

      // If you passed fromLocation and want place name, you can call reverse geocode here.
      if (fromLocation) {
        // reverseGeocode(lat, lon)  // implement if you want
      }
    })
    .catch((err) => {
      safeLog("Error in getWeather():", err);
      showMessage("Error fetching weather. See console for details.");
    });
}

// -------------- Manual test helper (useful while debugging) --------------
function testWithSample() {
  // Lagos coordinates — use this to test without location permission
  const lat = 6.5244;
  const lon = 3.3792;
  getWeather(lat, lon, false);
}

// -------------- Start --------------
window.onload = () => {
  // Ensure DOM is ready and elements exist
  safeLog("Window loaded. Starting geolocation...");
  getUserLocation();

  // Uncomment to run a manual test if geolocation isn't working
  // testWithSample();
};