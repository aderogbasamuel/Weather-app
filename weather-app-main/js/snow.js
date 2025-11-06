 // Configuration for snowfall effect
        const snowflakeCount = 70; // Number of snowflakes
        const snowflakeSymbols = ['❄', '❅', '❆']; // Different snowflake symbols for variety
console.log("snow js loaded")
        // Function to generate a random number between min and max
        function random(min, max) {
            return Math.random() * (max - min) + min;
        }

        // Function to create a single snowflake element
        function createSnowflake() {
            const snowflake = document.createElement('div');
            snowflake.classList.add('snowflake');
            snowflake.innerText = snowflakeSymbols[Math.floor(Math.random() * snowflakeSymbols.length)];
            snowflake.style.left = `${random(0, 100)}vw`; // Random horizontal position
            snowflake.style.fontSize = `${random(0.8, 2)}em`; // Random size for variety
            snowflake.style.opacity = random(0.5, 1); // Random opacity for a more natural look

            // Animation properties for falling and drifting
            snowflake.style.animationDuration = `${random(5, 10)}s`; // Random fall speed
            snowflake.style.animationDelay = `${random(0, 15)}s`; // Random start delay
            snowflake.style.setProperty('--horizontal-drift', `${random(-15, 15)}vw`); // Slight horizontal drift
            snowflake.style.setProperty('--rotation', `${random(-360, 360)}deg`); // Random rotation for each flake

            // Randomly add lens flare effect to some snowflakes
            if (Math.random() > 0.8) {
                snowflake.classList.add('flare');
            }

            // Randomly blur some snowflakes to add depth
            if (Math.random() > 0.5) {
                snowflake.classList.add('blurred');
            }

            document.getElementById("snowy").appendChild(snowflake);

            // Remove snowflake after it falls out of view
            snowflake.addEventListener('animationend', () => {
                snowflake.remove();
            });
        }

        // Generate multiple snowflakes
        for (let i = 0; i < snowflakeCount; i++) {
            createSnowflake();
        }

        // Generate new snowflakes continuously for an ongoing effect
        setInterval(createSnowflake, 500);