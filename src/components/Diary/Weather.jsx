import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useCurrentLocation from '../../hooks/useGeoLocation';

const Weather = () => {
  const { location, error } = useCurrentLocation();
  const [weather, setWeather] = useState(null);

  // Get weather information only once when Compent mounts
  useEffect(() => {
    const getWeather = async () => {
      if (location) {
        try {
          const weatherApiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;

          const weatherResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${weatherApiKey}&units=metric`,
          );

          console.log('weatherResponse.data: ', weatherResponse.data);
          const weatherIcon = weatherResponse.data.weather[0].icon;
          const weatherIcondAdrs = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
          const temp = Math.round(weatherResponse.data.main.temp);

          console.log({
            icon: weatherIcondAdrs,
            name: location,
            temp: temp,
          });

          setWeather({
            icon: weatherIcondAdrs,
            name: weatherResponse.data.weather[0].main,
            temp: temp,
          });
        } catch (error) {
          console.error('Failed to fetch weather data: ', error);
        }
      }
    };
    getWeather();
  }, [location]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!weather) {
    return <div>Weather Loading</div>;
  }

  if (!weather || !weather.temp) {
    return <div>No temperature data available</div>;
  }

  return (
    <div>
      <p>WeatherInfo: {weather.name}</p>
      <p>Tempereture: {weather.temp} °C</p>
    </div>
  );
};

export default Weather;
