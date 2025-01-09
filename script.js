const apiKey = "a632d421c458b84a697390ce20bfce35";
const getWeatherBtn = document.getElementById("getWeatherBtn");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");

getWeatherBtn.addEventListener("click",()=> {
    const cityName = cityInput.value.trim();
    if (cityName === ""){
        weatherResult.innerHTML = "Please enter a city name";
        return;
    }

    fetchWeather(cityName);
});

function fetchWeather(city) {
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    fetch(apiurl)
    .then((response)=> {
        if (!response.ok) {
            throw new Error("City not found");
        }
        return response.json();
    })
    .then((data) =>{
        displayWeather(data);
    })
    .catch((error) => {
        weatherResult.innerHTML = error.message;
    });
}

function displayWeather(data) {
    const{name,main,weather} = data;
    const temperature = main.temp;
    const description = weather[0].description;

    weatherResult.innerHTML = `
        <p><strong>City:</strong> ${name}</p>
        <p><strong>Temperature:</strong> ${temperature}°C</p>
        <p><strong>Condition:</strong> ${description}</p>
    `;
}