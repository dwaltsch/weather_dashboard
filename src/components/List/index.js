import React, {useEffect, useState} from "react";
import Daily_forecast from "./DailyForecast/index.js";
import secret from "../../secret/secret.json";

export default function List() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const successCallback = (position) => {
            const {latitude, longitude} = position.coords;
            // fetch from openweatherapi
            fetch(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${secret.apiKey}&units=metric&cnt=5`
            )
                .then((response) => response.json())
                .then(({list}) => {
                    setData(list);
                });
        };

        const errorCallback = (error) => {
            console.error(error);
            return;
        };

        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    }, []);
    console.log(data)
    if (!data) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            {data.map(({dt, main, weather,wind}) => {
                return (
                    <Daily_forecast
                        day={new Date(dt * 1000).toLocaleDateString("de-DE")}
                        daytime={new Date(dt * 1000).toLocaleTimeString("de-DE")}
                        temperature={main.temp + " °C"}
                        weatherIcon={`http://openweathermap.org/img/wn/${weather[0].icon}.png`}
                        wind = {wind.speed}
                        tempFeelsLike = {main.feels_like}
                    />
                );
            })}
        </div>
    );
}