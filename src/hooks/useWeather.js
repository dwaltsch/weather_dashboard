import React, { useEffect, useState } from "react";
import secret from "../secret/secret.json";

export const useWeather = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
      const successCallback = (position) => {
        const { latitude, longitude } = position.coords;
        // fetch from openweatherapi
        fetch(
          `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${secret.apiKey}&units=metric&lang=de`
        )
          .then((response) => response.json())
          .then((list) => {
            setData(list);
          });
      };

      const errorCallback = (error) => {
        console.error(error);
      };

      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    }, []);
    if (!data) {
      return <p>Loading...</p>;
    }
  return data;
};
