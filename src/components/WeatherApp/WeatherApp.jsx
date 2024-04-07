import React, { useState, useEffect } from 'react';
import "./WeatherApp.css";
import search_icon from "../assets/search.png";
import drizzle_icon from "../assets/drizzle.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import cloud_icon from "../assets/cloud.png";
import humidity_icon from "../assets/humidity.png";
import wind_icon from "../assets/wind.png";

const WeatherApp = () => {
    const [city, setCity] = useState("");
    const api_key = "6e8165351376baae694ded9f6cc8086";
    const [weatherData, setWeatherData] = useState({});
    const [Wicon, setWicon] = useState(cloud_icon);

        const fetchWeatherData = async () => {
            try {
                const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=6e8165351376baae694ded9f6cc80867`;
                const res = await fetch(url);
                const data = await res.json();
                console.log(data);
                setWeatherData(data);

                // Update Wicon based on weather condition
                const icon = weatherData.weather && weatherData.weather[0].icon;
                if (icon === "01d" || icon === "01n") {
                    setWicon(cloud_icon);
                } else if (icon === "02d" || icon === "02n") {
                    setWicon(cloud_icon);
                } else if (icon === "03d" || icon === "03n") {
                    setWicon(drizzle_icon);
                } else if (icon === "04d" || icon === "04n") {
                    setWicon(drizzle_icon);
                } else if (icon === "09d" || icon === "09n") {
                    setWicon(rain_icon);
                } else if (icon === "10d" || icon === "10n") {
                    setWicon(rain_icon);
                } else if (icon === "13d" || icon === "13n") {
                    setWicon(snow_icon);
                } else {
                    setWicon(cloud_icon);
                }
            } catch (error) {
                console.error("Error fetching weather data:", error);
            }
        };

        

    return (
        <div className='container'>
            <div className='top-bar'>
                <input type="text" className='cityInput' placeholder='Search' onChange={(e) => setCity(e.target.value)} />
                <div className='search-icon' onClick={() => fetchWeatherData()}>
                    <img src={search_icon} alt="Search Icon" />
                </div>
            </div>
            <div className='weather-image'>
                <img src={Wicon} alt="Cloud Icon" />
            </div>
            <div className='weather-temp'>
                {weatherData.main && weatherData.main.temp || 24}°C
            </div>
            <div className='weather-location'>
                {weatherData.name || 'London'}
            </div>
            <div className='data-container'>
                <div className='element'>
                    <img src={humidity_icon} className='icons' alt="Humidity Icon" />
                    <div className='data'>
                        <div className='humidity-percent'>
                            {weatherData.main && weatherData.main.humidity || "64"}%
                        </div>
                        <div className='text'>Humidity</div>
                    </div>
                </div>
                <div className='element'>
                    <img src={wind_icon} className='icons' alt="Wind Icon" />
                    <div className='data'>
                        <div className='humidity-percent'>
                            {weatherData.wind && weatherData.wind.speed || "18"} km/h
                        </div>
                        <div className='text'>Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherApp;
