import React, { useEffect, useState } from "react";

export const baseURL: string = "https://api.openweathermap.org/data";
export const API_key: string = "2a45a148cdbf5e4d300cca07353bec26";
const cityURL: string = "2.5/weather";
const dailyURL: string = "/3.0/onecall";

export type Forecast = {
  // hourly: Array<HourlyForecast>;
  daily: Array<DailyForecast>;
};

export type DailyForecast = {
  dt: Date;
  temp: { day: number; min: number; max: number; night: number };
  feels_like: { day: number };
  pressure: number;
  humidity: number;
  wind_speed: number;
  weather: Array<{ main: string; description: string; icon: string }>;
};

// export type HourlyForecast = {
//   dt: number;
//   temp: number;
//   feels_like: number;
//   pressure: number;
//   humidity: number;
//   wind_speed: number;

//   weather: [
//     {
//       description: string;
//       icon: string;
//     }
//   ];
// };

type CityCoords = {
  cod: string;
  coord: { lon: number; lat: number };
};

type FormStatus = {
  isError: boolean;
  isComplete: boolean;
  isLoading: boolean;
  forecast: Forecast;
  location: string;
  search: (value: string) => void;
  back: () => void;
  searchGeo: () => void;
};

const useForm: () => FormStatus = () => {
  const data: Forecast = {
    daily: [
      {
        dt: new Date(),
        temp: { day: 0, min: 0, max: 0, night: 0 },
        feels_like: { day: 0 },
        pressure: 0,
        humidity: 0,
        wind_speed: 0,
        weather: [{ main: "", description: "", icon: "" }],
      },
    ],
  };

  const [isComplete, setComplete] = useState(false);
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [forecast, setForecast] = useState(data);
  const [location, setLocation] = useState("");

  async function getCoords<T>(city: string): Promise<T> {
    const res = await fetch(`${baseURL}/${cityURL}?q=${city}&appid=${API_key}`);
    return res.json() as Promise<T>;
  }

  async function getForecast<T>(lon: number, lat: number): Promise<T> {
    const res = await fetch(
      `${baseURL}/${dailyURL}?lat=${lat}&lon=${lon}&exclude=minutely&appid=${API_key}`
    );
    return res.json() as Promise<T>;
  }
  async function getGeolocation<T>(): Promise<T> {
    const res = await fetch("https://ipinfo.io/json?token=5e36e0df861824");
    return res.json() as Promise<T>;
  }

  async function process(value: string) {
    const city = await getCoords<CityCoords>(value);

    if (city.cod === "404") {
      setLoading(false);
      setError(true);
    } else {
      setError(false);

      setLoading(true);

      const response: Forecast = await getForecast<Forecast>(
        city.coord.lon,
        city.coord.lat
      );
      setForecast(response);
      setComplete(true);
      setLoading(false);
      setLocation(value);
    }
  }

  async function search(value: string) {
    setLoading(true);
    if (value === "") {
      setError(true);
      setLoading(false);
    } else {
      await process(value);
    }
  }

  async function searchGeo() {
    setLoading(true);
    const result: { city: string } = await getGeolocation<{ city: string }>();
    await process(result.city);
  }

  function back(): void {
    setComplete(false);
  }

  return {
    isComplete,
    isError,
    isLoading,
    forecast,
    location,
    search,
    back,
    searchGeo,
  };
};
export default useForm;
