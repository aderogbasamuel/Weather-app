fetch("https://api.open-meteo.com/v1/forecast?latitude=6.5244&longitude=3.3792&current_weather=true")
  .then(response => response.json()) // Convert response to JSON
  .then(data => {
    console.log(data); // Show the data in the console
  });
  
  
    