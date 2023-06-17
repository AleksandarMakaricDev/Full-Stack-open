import React, { useEffect, useState } from "react";
import weatherServices from "../../services/weather";
import {
  isNonEmptyArray,
  isObject,
  isValidNonEmptyString,
  isValidThreeCharacterString,
} from "../../utils/validators";

const Weather = ({ capital, onSuccess, onError }) => {
  const [weatherDetails, setWeatherDetails] = useState();
  const [isLoading, setIsLoading] = useState(false);

  if (!isValidNonEmptyString(capital)) {
    return null;
  }

  useEffect(() => {
    setIsLoading(true);

    weatherServices
      .getCapitalWather(capital)
      .then((fetchedWeather) => {
        let formattedWeather;
        if (isObject(fetchedWeather)) {
          formattedWeather = {
            temp: fetchedWeather.main?.temp,
            weather: fetchedWeather.weather,
            wind: fetchedWeather.wind?.speed,
          };

          onSuccess(`Weather status for ${capital} acquired successfully!`);
        } else {
          formattedWeather = null;
          onError(
            `Acquiring weather status for ${capital} failed! Please try again in a bit.`
          );
        }

        setWeatherDetails(formattedWeather);
      })
      .catch(() =>
        onError(
          `Acquiring weather status for ${capital} failed! Please try again in a bit.`
        )
      )
      .finally(() => setIsLoading(false));
  }, []);

  const getWeatherDetailsImage = (weatherDetail) => {
    if (isValidThreeCharacterString(weatherDetail?.icon)) {
      return (
        <img
          key={weatherDetail.icon}
          src={`https://openweathermap.org/img/wn/${weatherDetail.icon}@2x.png`}
          alt={weatherDetail?.alt || "Weather icon."}
        />
      );
    }

    return null;
  };

  return (
    <>
      {isLoading ? (
        <p>Loading capital weather...</p>
      ) : (
        <div>
          <h3>Weather in {capital}</h3>
          {typeof weatherDetails?.temp === "number" && (
            <p>
              <b>Temperature:</b> {weatherDetails.temp}°C
            </p>
          )}
          {isNonEmptyArray(weatherDetails?.weather) &&
            weatherDetails.weather.map((wD) => getWeatherDetailsImage(wD))}
          {typeof weatherDetails?.wind === "number" && (
            <p>
              <b>Wind speed:</b> {weatherDetails.wind}m/s
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default Weather;
