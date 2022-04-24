import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({capital}) => {
  const [weather, setWeather] = useState([])
  const [isLoading, setLoading] = useState(true);

  const api_key = process.env.REACT_APP_API_KEY
  
  const hook1 = () => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}`)
      .then(response => {
        console.log('promise fulfilled')
        setWeather(response.data);
        setLoading(false);
    
      })
  }

  useEffect(hook1, [api_key,capital]);

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  return (
    <div>
      <h2>Weather in {capital}</h2>
      <div>temperature {(weather.main.temp - 273).toFixed(2)} ℃</div>
      <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="" />
      <div>wind {weather.wind.speed} m/s</div>
    </div>
  );
}


export default Weather