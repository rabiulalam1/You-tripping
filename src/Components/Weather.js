import React from "react";

const Weather = (props) => {
  return (
    <div>
      <h3>Weather:</h3>
      <p>{props.weather.weather?.[0].description}</p>
      <ul>
        <li>Current Temp: {props.weather.main?.temp}</li>
        <li>Feels Like: {props.weather.main?.feels_like}</li>
        <li>Humidity: {props.weather.main?.humidity}</li>
        <li>Wind Speed: {props.weather.wind?.speed}mph</li>
        <li>Max Temp: {props.weather.main?.temp_max}</li>
        <li>Min Temp: {props.weather.main?.temp_min}</li>
      </ul>
    </div>
  );
};

export default Weather;
