import React, { useEffect, useState } from 'react'
import styles from "./Daily_forecast.module.css";

function Daily_forecast() {
    const [data,setData] = useState({});

    useEffect(() => {
        const apikey = "03dbd3adc6f89a12db0e356d17b92fe9";
        const successCallback = (position) => {

            const {latitude, longitude} = position.coords;
            // fetch from openweatherapi
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely,current,alerts&appid=${apikey}&units=metric`)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    setData(data);
                })
        };

        const errorCallback = (error) => {
            console.log(error);
            return;
        };


        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    }, []);

    if (!data.main) {
        return (<p>Loading...</p>);
    }
    return (
        <div className={styles.forecastList}>
            <p>{new Date(data.dt * 1000).toLocaleDateString("de-DE")}</p>
            <p>{data.main.temp + " °C"}</p>
            <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`} alt="weather icon"/>
        </div>
    );
}

export default Daily_forecast
