const apiKey="323ee47d28660eb2d25b100c531e85c5";
const WeatherDataEl= document.getElementById("weather-data");
const cityInputEl=document.getElementById("city-name");
const formEl= document.querySelector("form");

formEl.addEventListener("submit",(event)=>{
    event.preventDefault();
    const cityVal=cityInputEl.value;
    getWeatherData(cityVal);
});

async function getWeatherData(name){
    try{
        const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${apiKey}&units=metric`);

        if(!response.ok){
            throw new Error("Network response was not OK");
        }
        const data= await response.json();

        const temperature= Math.round(data.main.temp);
        const description= data.weather[0].description;
        const icon= data.weather[0].icon;
        const details= [
            `Feels like: ${Math.round(data.main.feels_like)}°C`,
            `Humidity: ${data.main.humidity}%`,
            `Wind Speed: ${data.wind.speed} m/s`
        ];

        WeatherDataEl.querySelector(".icon").innerHTML=`<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;
        WeatherDataEl.querySelector(".temperature").textContent=`${temperature}°C`;
        WeatherDataEl.querySelector(".description").textContent=`${description}`;
        WeatherDataEl.querySelector(".details").innerHTML= 
        details.map((detail)=> `<div>${detail}</div>`).join("");
    }
    catch(Error){
        wrong_name= document.createElement('h1');
        wrong_name.textContent= '!-- Wrong City Name --!';
        WeatherDataEl.appendChild(wrong_name);
    }
}