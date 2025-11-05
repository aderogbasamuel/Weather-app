fetch("https://api.open-meteo.com/v1/forecast?latitude=6.5244&longitude=8.3792&current=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,wind_speed_10m&timezone=auto")
  .then(response => response.json()) // Convert response to JSON
  .then(data => {
    console.log(data); // Show the data in the console
  });
  
  
    