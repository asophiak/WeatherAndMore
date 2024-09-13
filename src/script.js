const apiKey = '5e386ed3b066edf3a7ca7cfb6a33aa9d';
const form = document.getElementById('weather-form');
const resultDiv = document.getElementById('weather-result');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const city = document.getElementById('city').value;
    console.log('City entered:' , city);
    getWeather(city);
});

function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    console.log('Fteching weather data for city:, city');
    console.log('API URl: ', url);

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            if (data.cod === "404") {
                resultDiv.innerHTML = `<p>City not found. Please try again.</p>`;
            } else {
                displayWeather(data);  // Call display function to show the weather data
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            resultDiv.innerHTML = `<p>Something went wrong. Please try again later.</p>`;
        });
}

function displayWeather(data) {
    console.log(data);
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;

    resultDiv.innerHTML = `
        <p>City: ${data.name}</p>
        <p>Temperature: ${temperature}°C</p>
        <p>Weather: ${description}</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
    `;
}

