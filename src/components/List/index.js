import React, {useEffect, useState} from "react";
import DAILY_FORECAST from "./DailyForecast/index.js";
import secret from "../../secret/secret.json";

export default function List() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const successCallback = (position) => {
            const {latitude, longitude} = position.coords;
            // fetch from openweatherapi
            fetch(
                `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,alerts,hourly&units=metric&appid=${secret.apiKey}`
            )
                .then((response) => response.json())
                .then((list) => {
                    setData(list.daily);
                });
        };

        const errorCallback = (error) => {
            console.error(error);

        };

        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    }, []);
    console.log(data)
    if (!data) {
        return <p>Loading...</p>;
    }
    let count = 0;
    return (
        <div>
            {data.map(({dt,temp, wind_speed,feels_like  , weather}) => {
                return (
                    <DAILY_FORECAST
                        day={new Date(dt * 1000).toLocaleDateString("de-DE")}
                        daytime={new Date(dt * 1000).toLocaleTimeString("de-DE")}
                        temperature={temp.day + " °C"}
                        weatherIcon={`http://openweathermap.org/img/wn/${weather[0].icon}.png`}
                        wind={wind_speed}
                        tempFeelsLike={feels_like.day}
                    />
                );
            },count++)}
        </div>
    );
}