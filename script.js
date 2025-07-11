document.addEventListener('DOMContentLoaded',() => {

    const cityInput = document.querySelector('#city-input');
    const getWeatherBtn = document.querySelector('#get-weather-btn');
    const loadingcontainer = document.querySelector(".loading-container");
    const weatherInfo = document.querySelector('.weather-info');
    const cityNameDisplay = document.querySelector('#city-name');
    const countryIcon = document.querySelector('#city-icon');
    const weattherdesc = document.querySelector('#weather-desc');
    const weatherIcon =  document.querySelector('#weather-icon');
    const temp = document.querySelector('#temperature');
    const windspeed = document.querySelector('#windspeed');
    const humidity = document.querySelector('#humidity');
    const clouds = document.querySelector('#Clouds');
    const errorMessage = document.querySelector('#error-message');

    const API_KEY = "899619daf321d7dc47d5cec20f71bd1f";

    getWeatherBtn.addEventListener('click',async () => {
        const city = cityInput.value.trim();

        if(!city) return;

        errorMessage.classList.remove("active");
        weatherInfo.classList.remove("active");
        loadingcontainer.classList.add("active");


        try {
             const weatherData = await fetchweatherInfo(city);
             displayWeatherData(weatherData);
        }
        catch(error) {
            showError();
        }
    })

    async function fetchweatherInfo(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

        const response = await fetch(url);

        if(!response.ok) {
            throw new Error("City Not Found");
        }
        const data = await response.json();
        return data;
    }


    async function  displayWeatherData(weatherData) {
    
     cityNameDisplay.innerText = weatherData?.name;
     countryIcon.src =  `https://flagcdn.com/144x108/${weatherData?.sys?.country.toLowerCase()}.png`;
     weattherdesc.innerText = weatherData?.weather?.[0]?.description;
     weatherIcon.src = `https://openweathermap.org/img/w/${weatherData?.weather?.[0]?.icon}.png`;
     temp.innerText = `${weatherData?.main?.temp} °C`;
     windspeed.innerText = `${weatherData?.wind?.speed} m/s`;
     humidity.innerText = `${weatherData?.main?.humidity}%`;
     clouds.innerText =  `${weatherData?.clouds?.all}%`;

     loadingcontainer.classList.remove("active");
     weatherInfo.classList.add("active");     
              
    }

    function showError() {

      loadingcontainer.classList.remove("active"); 
        weatherInfo.classList.remove("active");
        errorMessage.classList.add("active");       
    }

});