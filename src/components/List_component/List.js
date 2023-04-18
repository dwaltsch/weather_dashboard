import React, { useEffect, useState } from "react";
import Daily_forecast from "./daily_forecast/Daily_forecast";
import secret from "../../secret/secret.json";

function List() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const successCallback = (position) => {
      const { latitude, longitude } = position.coords;
      // fetch from openweatherapi
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely,current,alerts&appid=${secret.apiKey}&units=metric&cb`
      )
        .then((response) => response.json())
        .then(({list}) => setData(list));
    };

    const errorCallback = (error) => {
      console.log(error);
      return;
    };

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }, []);

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {data.map(({ dt, main, weather }) => {
        return (
          <Daily_forecast
            daytime={new Date(dt * 1000).toLocaleDateString("de-DE")}
            temperature={main.temp + " °C"}
            weatherIcon={`http://openweathermap.org/img/wn/${weather[0].icon}.png`}
          />
        );
      })}
    </div>
  );
}

export default List;
