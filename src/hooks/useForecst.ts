import { Forecast, DailyForecast, baseURL, API_key } from "./useForm";
import React, { useState } from "react";

const hourlyURL: string = "2.5/forecast";

type FetchType = {
  list: Array<HourlyForecast>;
};

export type HourlyForecast = {
  dt: number;
  main: {
    temp: number;
    pressure: number;
    humidity: number;
  };
  weather: Array<{ main: string; description: string; icon: string }>;
  wind: {
    speed: number;
  };
};

type Details = {
  more?: (date: Date, index: number, city: string) => void;
  close: () => void;
  details: boolean;
  card: number;
  hourly: Array<HourlyForecast>;
};

const useForecast: () => Details = () => {
  const data: Array<HourlyForecast> = [
    {
      dt: 0,
      main: {
        temp: 0,
        pressure: 0,
        humidity: 0,
      },
      weather: [{ main: "", description: "", icon: "" }],
      wind: {
        speed: 0,
      },
    },
  ];
  const [details, setDetails] = useState(false);
  const [card, setCard] = useState(0);
  const [hourly, setHourly] = useState(data);

  async function getHourlyForecast<T>(city: string): Promise<T> {
    const res = await fetch(
      `${baseURL}/${hourlyURL}?q=${city}&appid=${API_key}`
    );
    return res.json() as Promise<T>;
  }

  async function more(date: Date, index: number, city: string) {
    setDetails(true);
    setCard(index);
    const result: FetchType = await getHourlyForecast<FetchType>(city);
    let count: number = 0;
    setHourly(
      result.list.filter((item, index) => {
        const itemDate: Date = new Date(Number(item.dt) * 1000);

        if (date.getDate() === new Date().getDate()) {
          count++;
          return itemDate.getDate() === date.getDate() && count <= 4;
        } else {
          return itemDate.getDate() === date.getDate() && index % 2 === 0;
        }
      })
    );
  }
  function close() {
    setDetails(false);
  }

  return { more, close, details, card, hourly };
};

export default useForecast;
