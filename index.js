document.addEventListener("DOMContentLoaded", (e) =>{


const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "d1a18865a4764e97a15124407242005";


weatherForm.addEventListener("submit", async e =>{    
    e.preventDefault();

    const city = cityInput.value;


    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }else{
        displayError("Please enter a city");
    }
});



async function getWeatherData(city){

    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
    const response = await fetch(apiUrl);
console.log(response);
    if(!response.ok){
        throw new Error ("Could not fetch weather data");
    }

    return await response.json();
    
}


function displayWeatherInfo(data){
console.log(data);
const weatherHtml = `
<h2>Weather in ${data.location.name}, ${data.location.country}</h2>
<p>Temperature: ${data.current.temp_c}°C</p>
<p>Condition: ${data.current.condition.text}</p>
<p>Humidity: ${data.current.humidity}%</p>
<p>Wind Speed: ${data.current.wind_kph} kph</p>
`;
card.innerHTML = weatherHtml;
card.style.display = "flex";



}


function displayError(message){

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);

}
});