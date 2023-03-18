import React from "react";
import { HourlyForecast } from "../../hooks/useForecst";
import styles from "./hourlyCard.module.css";

type HourlyCardType = {
  forecast: HourlyForecast;
};

const HourlyCard = ({ forecast }: HourlyCardType) => {
  const time = new Date(Number(forecast.dt) * 1000);
  return (
    <div className={styles.hour_box}>
      <h3 className={styles.hour}>{time.getHours()}:00</h3>
      <p className={styles.hour_temp}>
        {Math.round(forecast.main.temp - 273)} C
      </p>
      <img
        className={styles.hour_img}
        src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
        alt=""
      />
      <p className={styles.hour_weather}>{forecast.weather[0].main}</p>
    </div>
  );
};

export default HourlyCard;
