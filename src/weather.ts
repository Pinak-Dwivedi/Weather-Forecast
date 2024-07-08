// https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,weather_code,wind_speed_10m,uv_index,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,uv_index_max,precipitation_sum&timezone=Asia%2FBangkok

import { removeBodyBlur } from "./util";

const url = new URL(import.meta.env.VITE_API_URL);
const urlSearchParams = url.searchParams;

export type WeatherDataType = {
  current: {
    time: string;
    interval: number;
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    is_day: number;
    precipitation: number;
    weather_code: number;
    wind_speed_10m: number;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    relative_humidity_2m: number[];
    apparent_temperature: number[];
    precipitation_probability: number[];
    weather_code: number[];
    wind_speed_10m: number[];
    uv_index: number[];
    is_day: number[];
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    apparent_temperature_max: number[];
    apparent_temperature_min: number[];
    uv_index_max: number[];
    precipitation_sum: number[];
  };
};

export type APIErrorType = {
  error: boolean;
  reason: string;
};

async function fetchWeather(
  latitude: number,
  longitude: number,
  timezone: string
): Promise<WeatherDataType | APIErrorType> {
  try {
    urlSearchParams.set("latitude", latitude.toString());
    urlSearchParams.set("longitude", longitude.toString());
    urlSearchParams.set("timezone", timezone.toString());

    const res = await fetch(url);

    if (res.ok) {
      const data: WeatherDataType = await res.json();
      return data;
    }

    throw await res.json();
  } catch (error) {
    throw error;
  }
}

export default function getWeather(): Promise<WeatherDataType | any> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        removeBodyBlur();

        fetchWeather(latitude, longitude, timezone)
          .then((weatherData) => {
            resolve(weatherData as WeatherDataType);
          })
          .catch((error) => {
            reject(error as APIErrorType);
          });
      },
      (error) => {
        removeBodyBlur();
        console.error(error.message);
        alert("Sorry couldn't access your location!");
      },
      {
        enableHighAccuracy: true,
      }
    );
  });
}
