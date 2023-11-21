const apiKey = '7b7ef5525923c20e64095301906c5da9'; 
const city = document.querySelector('#city');
const temperature = document.querySelector('#temperature');
const description = document.querySelector('#condition');
const searchInput = document.querySelector('#searchInput');
const searchButton = document.querySelector('#searchButton');
const time = document.querySelector('#time');
const humidity = document.querySelector('#humidity');
const sunrise = document.querySelector('#sunrise');
const sunset = document.querySelector('#sunset');
const windSpeed = document.querySelector('#windspeed');
const date = document.querySelector('#date');
const icon = document.querySelector('#icon');

searchButton.addEventListener('click', () => {
    const searchValue = searchInput.value.trim();

    if (searchValue === '') {
        alert('Bitte gib einen Standort ein.');
        return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Fehler beim Abrufen der Wetterdaten');
            }
            return response.json();
        })
        .then(weatherData => {
            console.log(weatherData);
            const cityName = weatherData.name;
            const temp = Math.round(weatherData.main.temp);
            const condition = weatherData.weather[0].description;
            const hum = weatherData.main.humidity;
            const sunriseTime = new Date(weatherData.sys.sunrise * 1000);
            const sunsetTime = new Date(weatherData.sys.sunset * 1000);
            const speed = weatherData.wind.speed;
            const weatherCondition = weatherData.weather[0].main;

            city.textContent = `${cityName}`;
            temperature.textContent = `${temp}°C`;
            description.textContent = `${condition}`;
            humidity.textContent = `${hum}%`;

            const seconds = weatherData.dt;
            const timeDate = new Date(seconds * 1000);
            const formattedTime = timeDate.toLocaleTimeString();
            const dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

            console.log(timeDate.toLocaleString().slice(0, 10));

            time.textContent = `${formattedTime.slice(0, 5)}`;
            sunrise.textContent = `${sunriseTime.toLocaleTimeString().slice(0, 5)}`;
            sunset.textContent = `${sunsetTime.toLocaleTimeString().slice(0, 5)}`;
            windSpeed.textContent = `${weatherCondition} ${speed} km/h`;
            date.textContent = `${dayNames[timeDate.getDay()]} ${timeDate.toLocaleString().slice(0, 10)}`;
            // icon.textContent = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
        })
        .catch(error => {
            console.error('Fehler:', error.message || 'Unbekannter Fehler');
        });
});
