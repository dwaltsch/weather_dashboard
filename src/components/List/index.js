import React, {useEffect, useState} from "react";
import DailyForecast from "./DailyForecast/index.js";
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
    if (!data) {
        return <p>Loading...</p>;
    }
    return (
        <div>
            {data.map(({dt,temp, wind_speed,feels_like , weather}, i) => {
                return (
                    <DailyForecast
                        day={new Date(dt * 1000).toLocaleDateString("de-DE")}
                        daytime={new Date(dt * 1000).toLocaleTimeString("de-DE")}
                        temperature={temp.day + " °C"}
                        weatherIcon={`http://openweathermap.org/img/wn/${weather[0].icon}.png`}
                        wind={wind_speed}
                        key={i}
                        tempFeelsLike={feels_like.day}
                    />
                );
            })}
        </div>
    );
}