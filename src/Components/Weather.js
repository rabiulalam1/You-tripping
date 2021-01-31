import React from 'react';
import './Weather.css';

const Weather = (props) => {
  return (
    <div className="weatherContainer">
      <div className="weatherWidget">
        <div className="weather-one">
          <p>{props.weather.name}</p>
        </div>
        <div className="weather-two">
          <div className="weather-two-one">
            <img
              src={`http://openweathermap.org/img/w/${props.weather.weather?.[0].icon}.png`}
              className="weather_icon"
              alt="weather_icon"
            />
          </div>
          <div className="weather-two-two">
            <p className="weather_degree">{props.weather.main?.temp}&#176;F</p>
            <p className="eatherStatus">
              {props.weather.weather?.[0].description}
            </p>
          </div>
        </div>
        <div className="weather-three">
          <p>Max Temp</p>
          <span>{props.weather.main?.temp_max}&#176;F</span>
          <p>Min Temp</p>
          <span>{props.weather.main?.temp_min}&#176;F</span>
        </div>
        <div className="weather-four">
          <p>Humidity</p>
          <span>{props.weather.main?.humidity}%</span>
        </div>
      </div>
    </div>
  );
};

export default Weather;
