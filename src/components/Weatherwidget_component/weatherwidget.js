import React, {useEffect, useState} from 'react';
import styles from './weatherwidget.module.css';
import secret from '../../secrets/secrets.json';

function getWindDirection(deg) {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(deg / (360 / directions.length)) % directions.length;
    return directions[index];
}

function Weatherwidget() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const successCallback = (position) => {
            const {latitude, longitude} = position.coords;
            // fetch from openweatherapi
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${secret.apiKey}&units=metric`)
                .then(response => response.json())
                .then(data => {
                    setData(data);
                })
        };

        const errorCallback = (error) => {
            console.log(error);
        };
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    }, []);

    if (!data.main) {
        return <div>loading...</div>
    }

    return (
        <div className={styles.container}>
            <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`} alt="weather icon"/>
            <h1>{data.main.temp}°C</h1>
            <h2>{data.weather[0].description}</h2>
            <h2>Luftfeuchtigkeit: {data.main.humidity} %</h2>
            <h2>Wind: {data.wind.speed} m/s Richtung {getWindDirection(data.wind.deg)}</h2>
        </div>
    );
}

export default Weatherwidget;