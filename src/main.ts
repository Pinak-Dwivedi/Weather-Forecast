import "./style.css";
import "./themeSwitch.ts";
import getWeather, { APIErrorType, WeatherDataType } from "./weather.ts";
import { getIconUrl } from "./icons.ts";
import {
  getElement,
  getDateTime,
  setElementContent,
  getDay,
  getDateAndMonth,
  checkIfCurrentHour,
  appendPrecipitationUnit,
  getUVIndexScaleValue,
  appendHumidityUnit,
  appendWindSpeedUnit,
} from "./util.ts";

getWeather()
  .then((weatherData: WeatherDataType) => {
    setCurrentWeather(weatherData);
    setHourlyWeather(weatherData);
    setDailyWeather(weatherData);
    scrollToPresentHourlyCard();
  })
  .catch((error: APIErrorType) => {
    console.error(error);
    console.error(error.reason);
    alert("Counldn't fetch weather");
  });

type HourlyDailyWeatherDataType = {
  time: string[];
  temp?: number[];
  weatherCode: number[];
  feelsLike?: number[];
  humidity?: number[];
  tempHigh?: number[];
  tempLow?: number[];
  feelsLikeHigh?: number[];
  feelsLikeLow?: number[];
  uvIndex: number[];
  windSpeed?: number[];
  isDay?: number[];
  precipitation: number[];
};

function setCurrentWeather(weatherData: WeatherDataType) {
  const {
    time,
    temp,
    weatherCode,
    humidity,
    isDay,
    windSpeed,
    precipitation,
    tempHigh,
    tempLow,
    feelsLikeHigh,
    feelsLikeLow,
    uvIndex,
  } = filterCurrentWeatherData(weatherData);

  const currentTempElement = getElement("current-temp") as HTMLHeadingElement;
  const currentIconElement = getElement("current-icon") as HTMLImageElement;
  const currentDateElement = getElement("current-date") as HTMLDivElement;
  const currentTimeElement = getElement("current-time") as HTMLDivElement;
  const currentTempHighElement = getElement(
    "current-temp-high"
  ) as HTMLDivElement;
  const currentTempLowElement = getElement(
    "current-temp-low"
  ) as HTMLDivElement;
  const currentFeelsLikeHighElement = getElement(
    "current-fl-high"
  ) as HTMLDivElement;
  const currentFeelsLikeLowElement = getElement(
    "current-fl-low"
  ) as HTMLDivElement;
  const currentPrecipitationElement = getElement(
    "current-precipitation"
  ) as HTMLDivElement;
  const currentUVIndexElement = getElement(
    "current-uv-index"
  ) as HTMLDivElement;
  const currentHumidityElement = getElement(
    "current-humidity"
  ) as HTMLDivElement;
  const currentDayNightElement = getElement(
    "current-day-night"
  ) as HTMLDivElement;
  const currentWindSpeedElement = getElement(
    "current-wind-speed"
  ) as HTMLDivElement;

  setElementContent(currentTempElement, temp, true);
  currentIconElement.src = getIconUrl(weatherCode);

  const dateTime = getDateTime(time);

  setElementContent(currentDateElement, dateTime.date);
  setElementContent(currentTimeElement, dateTime.time);
  setElementContent(currentTempHighElement, tempHigh, true);
  setElementContent(currentTempLowElement, tempLow, true);
  setElementContent(currentFeelsLikeHighElement, feelsLikeHigh, true);
  setElementContent(currentFeelsLikeLowElement, feelsLikeLow, true);

  setElementContent(currentPrecipitationElement, precipitation);
  appendPrecipitationUnit(currentPrecipitationElement);

  setElementContent(currentUVIndexElement, getUVIndexScaleValue(uvIndex));

  setElementContent(currentHumidityElement, humidity);
  appendHumidityUnit(currentHumidityElement);

  setElementContent(currentDayNightElement, isDay ? "Day" : "Night");

  setElementContent(currentWindSpeedElement, windSpeed);
  appendWindSpeedUnit(currentWindSpeedElement);
}

function setHourlyWeather(weatherData: WeatherDataType) {
  const hourlyWeatherData = filterHourlyWeatherData(weatherData);

  const hourlyCardsContainer = getElement(
    "hourly-segment-cards-container"
  ) as HTMLDivElement;

  const hourlyCardTemplate = getElement(
    "hourly-temp-card-template"
  ) as HTMLTemplateElement;

  const documentFragment = document.createDocumentFragment();

  // The api is getting 168 hours i.e. 24 * 7 hours of data but I am only consuming 24 hours of data
  for (let i = 0; i < 24; i++) {
    setCardValues(
      hourlyCardTemplate,
      documentFragment,
      hourlyWeatherData,
      "hourly",
      i
    );
  }

  hourlyCardsContainer.innerHTML = "";
  hourlyCardsContainer.append(documentFragment);
}

function setDailyWeather(weatherData: WeatherDataType) {
  const dailyWeatherData = filterDailyWeatherData(weatherData);

  const dailyCardsContainer = getElement(
    "daily-segment-cards-container"
  ) as HTMLDivElement;

  const dailyCardTemplate = getElement(
    "daily-temp-card-template"
  ) as HTMLTemplateElement;

  const documentFragment = document.createDocumentFragment();

  for (let i = 0; i < 7; i++) {
    setCardValues(
      dailyCardTemplate,
      documentFragment,
      dailyWeatherData,
      "daily",
      i
    );
  }

  dailyCardsContainer.innerHTML = "";
  dailyCardsContainer.append(documentFragment);
}

function filterCurrentWeatherData(weatherData: WeatherDataType) {
  const {
    current: {
      time: time,
      temperature_2m: temp,
      weather_code: weatherCode,
      relative_humidity_2m: humidity,
      is_day: isDay,
      wind_speed_10m: windSpeed,
      precipitation,
    },
    daily: {
      temperature_2m_max: [tempHigh],
      temperature_2m_min: [tempLow],
      apparent_temperature_max: [feelsLikeHigh],
      apparent_temperature_min: [feelsLikeLow],
      uv_index_max: [uvIndex],
    },
  } = weatherData;

  return {
    time,
    temp,
    weatherCode,
    humidity,
    isDay,
    windSpeed,
    precipitation,
    tempHigh,
    tempLow,
    feelsLikeHigh,
    feelsLikeLow,
    uvIndex,
  };
}

function filterHourlyWeatherData(weatherData: WeatherDataType) {
  const {
    hourly: {
      time,
      temperature_2m: temp,
      relative_humidity_2m: humidity,
      apparent_temperature: feelsLike,
      precipitation_probability: precipitation,
      weather_code: weatherCode,
      wind_speed_10m: windSpeed,
      uv_index: uvIndex,
      is_day: isDay,
    },
  } = weatherData;

  return {
    time,
    temp,
    humidity,
    feelsLike,
    precipitation,
    weatherCode,
    windSpeed,
    uvIndex,
    isDay,
  };
}

function filterDailyWeatherData(weatherData: WeatherDataType) {
  const {
    daily: {
      time,
      weather_code: weatherCode,
      temperature_2m_max: tempHigh,
      temperature_2m_min: tempLow,
      apparent_temperature_max: feelsLikeHigh,
      apparent_temperature_min: feelsLikeLow,
      uv_index_max: uvIndex,
      precipitation_sum: precipitation,
    },
  } = weatherData;

  return {
    time,
    weatherCode,
    tempHigh,
    tempLow,
    feelsLikeHigh,
    feelsLikeLow,
    uvIndex,
    precipitation,
  };
}

function setCardValues(
  template: HTMLTemplateElement,
  fragmentElement: DocumentFragment,
  weatherData: HourlyDailyWeatherDataType,
  dailyOrHoury: "daily" | "hourly",
  valueIndex: number
) {
  const {
    time,
    temp,
    weatherCode,
    feelsLike,
    tempHigh,
    tempLow,
    feelsLikeHigh,
    feelsLikeLow,
    humidity,
    uvIndex,
    precipitation,
    windSpeed,
    isDay,
  } = weatherData;

  const cardFragment = template.content.cloneNode(true) as DocumentFragment;

  const cardTitle = getElement(
    "segment-card-title",
    cardFragment
  ) as HTMLDivElement;
  const cardTemp = getElement("segment-card-temp", cardFragment);
  const cardDate = getElement("segment-card-date", cardFragment);
  const cardIcon = getElement(
    "segment-card-icon",
    cardFragment
  ) as HTMLImageElement;
  const cardHumidity = getElement("segment-card-humidity", cardFragment);
  const cardFeelsLike = getElement("segment-card-feels-like", cardFragment);
  const cardPrecipitation = getElement(
    "segment-card-precipitation",
    cardFragment
  ) as HTMLSpanElement;
  const cardWindSpeed = getElement("segment-card-wind-speed", cardFragment);
  const cardUVIndex = getElement(
    "segment-card-uv-index",
    cardFragment
  ) as HTMLSpanElement;
  const cardDayNight = getElement("segment-card-day-night", cardFragment);
  const cardTempHigh = getElement("segment-card-temp-high", cardFragment);
  const cardTempLow = getElement("segment-card-temp-low", cardFragment);
  const cardFeelsLikeHigh = getElement(
    "segment-card-feel-like-high",
    cardFragment
  );
  const cardFeelsLikeLow = getElement(
    "segment-card-feel-like-low",
    cardFragment
  );

  if (dailyOrHoury === "hourly") {
    if (checkIfCurrentHour(time[valueIndex])) addPresentClass(cardFragment);

    setElementContent(cardTitle, getDateTime(time[valueIndex]).time);
    setElementContent(cardTemp, temp![valueIndex], true);

    setElementContent(cardHumidity, humidity![valueIndex]);
    appendHumidityUnit(cardHumidity);

    setElementContent(cardFeelsLike, feelsLike![valueIndex], true);

    setElementContent(cardWindSpeed, windSpeed![valueIndex]);
    appendWindSpeedUnit(cardWindSpeed);

    setElementContent(cardDayNight, isDay![valueIndex] ? "Day" : "Night");
  } else {
    if (valueIndex === 0) {
      setElementContent(cardTitle, "Today");
      addPresentClass(cardFragment);
    } else setElementContent(cardTitle, getDay(time[valueIndex]));

    setElementContent(cardDate, getDateAndMonth(time[valueIndex]));
    setElementContent(cardTempHigh, tempHigh![valueIndex], true);
    setElementContent(cardTempLow, tempLow![valueIndex], true);
    setElementContent(cardFeelsLikeHigh, feelsLikeHigh![valueIndex], true);
    setElementContent(cardFeelsLikeLow, feelsLikeLow![valueIndex], true);
  }

  cardIcon.src = getIconUrl(weatherCode[valueIndex]);

  setElementContent(cardPrecipitation, precipitation[valueIndex]);
  appendPrecipitationUnit(cardPrecipitation);

  setElementContent(cardUVIndex, getUVIndexScaleValue(uvIndex[valueIndex]));

  fragmentElement.append(cardFragment);
}

function addPresentClass(cardFragment: DocumentFragment) {
  const card = getElement("segment-card", cardFragment) as HTMLDivElement;
  card.classList.add("present");
}

function scrollToPresentHourlyCard() {
  const hourlySegmentCardsContainer = getElement(
    "hourly-segment-cards-container"
  ) as HTMLDivElement;

  const presentCard = hourlySegmentCardsContainer.querySelector(
    ".present"
  ) as HTMLDivElement;

  presentCard.scrollIntoView({
    inline: "start",
    behavior: "smooth",
  });
}
