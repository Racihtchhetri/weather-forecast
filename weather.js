const options ={
    
}
function api() {
    // Fetch current weather
    fetch("https://api.weatherapi.com/v1/current.json?key=ec145e888ee4465aa2651607241802&q=Dehradun")
        .then(res => res.json())
        .then(data => {
            // Display current weather
            displayWeather(data);

            // Fetch forecast data
            return fetch("https://api.weatherapi.com/v1/forecast.json?key=ec145e888ee4465aa2651607241802&q=Dehradun&days=2");
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            // Display forecast weather
            displayForecast(data.forecast.forecastday);
        })
        .catch(error => console.error('Error fetching weather:', error));
}

function displayWeather(data) {
    const weatherIconElement = document.getElementById('weather-ico');
    const weatherCondition = data.current.condition.text.toLowerCase();
    const weatherImageElement = document.getElementById('weather');

    // Clear existing classes and background image
    weatherIconElement.classList.remove('fa-sun', 'fa-cloud', 'fa-rain', 'fa-snow', 'fa-cloud-sun');
    weatherImageElement.style.backgroundImage = '';

    // Add appropriate icon based on weather condition
    if (weatherCondition.includes('clear') || weatherCondition.includes('sunny')) {
        weatherIconElement.classList.add('fa-sun');
        weatherImageElement.style.backgroundImage = "url('weather-ico-img1.png')"; // Corrected image extension
    } else if (weatherCondition.includes('cloud')) {
        weatherIconElement.classList.add('fa-cloud');
        weatherImageElement.style.backgroundImage = "url('weather-ico-img5.png')";
    } else if (weatherCondition.includes('rain')) {
        weatherIconElement.classList.add('fa-rain');
        weatherImageElement.style.backgroundImage = "url('weather-ico-img2.png')";
    } else if (weatherCondition.includes('snow')) {
        weatherIconElement.classList.add('fa-snow');
        weatherImageElement.style.backgroundImage = "url('weather-ico-img6.png')";
    } else {
        weatherIconElement.classList.add('fa-cloud-sun');
        weatherImageElement.style.backgroundImage = "url('weather-ico-img1.png')";
    }

    document.getElementById('weather-temp').textContent = data.current.temp_c;
    document.getElementById('weather-humidity').textContent = data.current.humidity;
    document.getElementById('weather-wind-speed').textContent = data.current.wind_kph;
    document.getElementById('weather-description').textContent = data.current.condition.text;
}

function displayForecast(forecastData) {
// Display forecast for the next day
const nextDayForecast = forecastData[1]; // Assuming you want the next day's forecast
const nextDayIconElement = document.getElementById('weather-ico-next');
const nextDayWeatherCondition = nextDayForecast.day.condition.text.toLowerCase();
const nextDayCardElement = document.getElementById('weather-next');

// Clear existing classes and background image
nextDayIconElement.classList.remove('fa-sun', 'fa-cloud', 'fa-rain', 'fa-snow', 'fa-cloud-sun');
nextDayCardElement.style.backgroundImage = '';

// Add appropriate icon based on weather condition for the next day
if (nextDayWeatherCondition.includes('clear') || nextDayWeatherCondition.includes('sunny')) {
nextDayIconElement.classList.add('fa-sun');
nextDayCardElement.style.backgroundImage = "url('weather-ico-img1.png')";
} else if (nextDayWeatherCondition.includes('cloud')) {
nextDayIconElement.classList.add('fa-cloud');
nextDayCardElement.style.backgroundImage = "url('weather-ico-img5.png')";
} else if (nextDayWeatherCondition.includes('rain')) {
nextDayIconElement.classList.add('fa-rain');
nextDayCardElement.style.backgroundImage = "url('weather-ico-img2.png')";
} else if (nextDayWeatherCondition.includes('snow')) {
nextDayIconElement.classList.add('fa-snow');
nextDayCardElement.style.backgroundImage = "url('weather-ico-img6.png')";
} else {
nextDayIconElement.classList.add('fa-cloud-sun');
nextDayCardElement.style.backgroundImage = "url('weather-ico-img1.png')";
}

document.getElementById('weather-temp-next').textContent = nextDayForecast.day.avgtemp_c;
document.getElementById('weather-humidity-next').textContent = nextDayForecast.day.avghumidity;
document.getElementById('weather-wind-speed-next').textContent = nextDayForecast.day.maxwind_kph;
document.getElementById('weather-description-next').textContent = nextDayForecast.day.condition.text;
}


api(); // Call the function to fetch and display current and forecast weather

