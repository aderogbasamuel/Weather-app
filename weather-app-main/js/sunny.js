const sunny = document.getElementById("sunny");
const sun = document.getElementById("sun");
const moon = document.getElementById("moon");


//document.onmousemove = (e) => handleMove(e);

//document.ontouchmove = (e) => handleMove(e.touches[0]);


const clouds = document.getElementById("clouds");

for (var i = 0; i < 6; i++) {
  const cloud = document.createElement("div");
  cloud.classList.add("cloud");
  cloud.style.top = `${Math.floor(Math.random() * (80 - 10) + 10)}vh`;
  cloud.style.opacity = `${Math.random() * (0.8 - 0.4) + 0.4}`;
  cloud.style.transform = `scale(${Math.random() * (1 - 0.4) + 0.4})`;
  cloud.style.animationDelay = `${Math.floor(Math.random() * 19)}s`;
  cloud.style.animationDuration = `${Math.random() * (25 - 19) + 19}s`;
  clouds.appendChild(cloud);
}
