import React from "react";
import { Forecast, DailyForecast } from "../../hooks/useForm";
import { background, weekday, month, weatherDescription } from "./index";
import ColdSky from "../assets/coldClearSky.jpg";
import WarmSky from "../assets/warmClearSky.jpg";
import HotSky from "../assets/hotClearSky.jpg";
import Clouds from "../assets/clouds.jpg";
import Rain from "../assets/Rain.jpg";
import Snow from "../assets/snow.jpg";
import Drizzle from "../assets/Drizzle.jpg";
import Mist from "../assets/Mist.jpg";
import Tornado from "../assets/Tornado.jpg";
import Thunderstorm from "../assets/Thunderstorm.jpg";
import "./card.css";

export function weatherImage(weather: string, temp: number): string {
  let result: string = "";
  switch (weather) {
    case "Thunderstorm":
      result = Thunderstorm;
      break;
    case "Tornado":
      result = Tornado;
      break;
    case "Drizzle":
      result = Drizzle;
      break;
    case "Rain":
      result = Rain;
      break;
    case "Snow":
      result = Snow;
      break;
    case "Mist" ||
      "Smoke" ||
      "Sand" ||
      "Haze" ||
      "Dust" ||
      "Fog" ||
      "Ash" ||
      "Squall":
      result = Mist;
      break;
    case "Clear":
      if (background(temp) === "hot") {
        result = HotSky;
      } else if (background(temp) === "warm") {
        result = WarmSky;
      } else {
        result = ColdSky;
      }
      break;
    case "Clouds":
      result = Clouds;
      break;
  }
  return result;
}

interface CardType {
  forecast: DailyForecast;
  city: string;
  more?: (date: Date, index: number, city: string) => void;
  index?: number;
  button: boolean;
}
const Card = ({
  forecast,
  city,
  more = () => {},
  index = 0,
  button,
}: CardType) => {
  const date = new Date(Number(forecast.dt) * 1000);
  return (
    <div className={`${button ? "card-container" : "card-modal-container"}`}>
      <div
        className={`card ${background(forecast.temp.day)} ${
          !button ? "modal-container" : ""
        }`}
      >
        <div className={`card-front ${!button ? "modal-card" : ""}`}>
          <h3 className={`card-title ${!button ? "modal-card-title" : ""}`}>
            {weekday[date.getDay()]}
          </h3>
          <p className={`card-date ${!button ? "modal-card-date" : ""}`}>
            {date.getDate()}th of {month[date.getMonth()]}
          </p>
          <p
            className={`card-location ${!button ? "modal-card-location" : ""}`}
          >
            {city}
          </p>
          <p className={`card-temp ${!button ? "modal-card-temp" : ""}`}>
            {Math.round(forecast.temp.day) - 273} C
          </p>
          <img
            className={`card-icon ${!button ? "modal-card-icon" : ""}`}
            src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
            alt=""
          />
          <p className={`card-weather ${!button ? "modal-card-weather" : ""}`}>
            {forecast.weather[0].main}
          </p>
        </div>
        <div className={`${button ? "card-back" : "hidden"}`}>
          <h3 className={`weather-title is-hidden`}>
            {forecast.weather[0].description}
          </h3>
          <img
            className={`card-back-image`}
            src={weatherImage(forecast.weather[0].main, forecast.temp.day)}
            alt=""
          />
          <p className={`weather-description is-hidden`}>
            {weatherDescription(forecast.weather[0].main, forecast.temp.day)}
          </p>
          <button
            className="card-button"
            type="button"
            onClick={() => more(date, index, city)}
          >
            More information
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
