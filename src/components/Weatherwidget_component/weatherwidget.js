import React, {useEffect, useState} from 'react';
import styles from './weatherwidget.module.css';
import secret from '../../secret/secret.json';

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
            fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${secret.apiKey}&units=metric`)
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

    if (!data.current) {
        return <div>loading...</div>
    }

    return (
        <div className={styles.container}>
            <img src={`http://openweathermap.org/img/wn/${data.current.weather[0].icon}@4x.png`} alt="weather icon"/>
            <h1>{data.current.temp}°C</h1>
            <h2>Luftfeuchtigkeit: {data.current.humidity} %</h2>
            <h2>{data.current.weather[0].description}</h2>
            <h2>Wind: {data.current.wind_speed} m/s Richtung {getWindDirection(data.current.wind_deg)}</h2>
            <h2>
                Regenwahrscheinlichkeit{' '}
                {typeof data.hourly[0].rain !== 'undefined' ? data.hourly[0].rain['1h'] : 0} %
            </h2>
        </div>
    );
}

export default Weatherwidget;