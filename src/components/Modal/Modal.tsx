import React from "react";
import { HourlyForecast } from "../../hooks/useForecst";
import { DailyForecast } from "../../hooks/useForm";
import { ReactComponent as IconMenu } from "../assets/Close.svg";
import Card from "../Card/Card";
import HourlyCard from "../HourlyCard/HourlyCard";
import HourlyCardList from "../HourlyCardList/HourlyCardList";
import styles from "./modal.module.css";

type ModalType = {
  close: () => void;
  details: boolean;
  forecast: DailyForecast;
  location: string;
  hourly: Array<HourlyForecast>;
};

const Modal = ({ close, details, forecast, location, hourly }: ModalType) => {
  return (
    <div className={`${styles.backdrop} ${!details ? styles.is_hidden : ""}`}>
      <div className={styles.modal}>
        <Card forecast={forecast} city={location} button={false}></Card>
        <div className={styles.more_info}>
          <div className={styles.details}>
            <p className={styles.details_item}>
              <span>Pressure</span>
              <span className={styles.details_item_value}>
                {forecast.pressure} mb
              </span>
            </p>
            <p className={styles.details_item}>
              <span>Humidity</span>
              <span className={styles.details_item_value}>
                {forecast.humidity} %
              </span>
            </p>
            <p className={styles.details_item}>
              <span>Wind-speed</span>

              <span className={styles.details_item_value}>
                {forecast.wind_speed} km/h
              </span>
            </p>
            <p className={styles.details_item}>
              <span>Max temperature</span>
              <span className={styles.details_item_value}>
                {Math.round(forecast.temp.max - 273)} C
              </span>
            </p>
            <p className={styles.details_item}>
              <span>Min temperature</span>
              <span className={styles.details_item_value}>
                {Math.round(forecast.temp.min - 273)} C
              </span>
            </p>
            <p className={styles.details_item}>
              <span>Feels like</span>
              <span className={styles.details_item_value}>
                {Math.round(forecast.feels_like.day - 273)} C
              </span>
            </p>
          </div>
          {/* <HourlyCard forecast={hourly[0]}></HourlyCard> */}
          <HourlyCardList list={hourly}></HourlyCardList>
        </div>

        <button type="button" className={styles.modal_btn} onClick={close}>
          <IconMenu className={styles.modal_icon}></IconMenu>
        </button>
      </div>
    </div>
  );
};

export default Modal;
