import React from "react";
import "./Weather.css";

const Weather = (props) => {
  return (
    <div className="weatherContainer">
      <div className="weatherWidget">
        <div className="weatherTop">
          <img
            src={`http://openweathermap.org/img/w/${props.weather.weather?.[0].icon}.png`}
            className="weatherIcon img-fluid ${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,| }"
            alt="weather-icon"
          />
          <h5 className="weatherStatus">
            {props.weather.weather?.[0].description}
          </h5>
        </div>

        <div className="weatherMid">
          <h5 className="weatherCity">{props.weather.name}</h5>
          <h5 className="weatherDegree">{props.weather.main?.temp}&#176;F</h5>
        </div>
        <div className="weatherBottom">
          <div>
            <div>
              Wind Speed <span>{props.weather.wind?.speed}mph</span>
            </div>
            <div>
              Max Temp <span>{props.weather.main?.temp_max}&#176;F</span>
            </div>
          </div>
          <div>
            <div>
              Min Temp <span>{props.weather.main?.temp_min}&#176;F</span>
            </div>
            <div>
              Humidity <span>{props.weather.main?.humidity}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
