import React from "react";
import { HourlyForecast } from "../../hooks/useForecst";

import HourlyCard from "../HourlyCard/HourlyCard";
import styles from "./hourlyCardList.module.css";
type HourlyList = {
  list: Array<HourlyForecast>;
};

const HourlyCardList = ({ list }: HourlyList) => {
  return (
    <div className={styles.hourly_list}>
      {list.map((item, index) => (
        <HourlyCard key={index} forecast={item}></HourlyCard>
      ))}
    </div>
  );
};

export default HourlyCardList;
