import React, {useEffect, useState} from 'react';
import styles from './Weatherwidget.module.css';
import secret from '../../secret/secret.json';

function getWindDirection(deg) {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(deg / (360 / directions.length)) % directions.length;
    return directions[index];
}

function WeatherwidgetComponent() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const successCallback = (position) => {
            const {latitude, longitude} = position.coords;
            // fetch from openweatherapi
            fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${secret.apiKey}&units=metric&lang=de`)
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
            <h1>{parseInt(data.current.temp.toFixed(1))}°C</h1>
            <h2>{data.current.weather[0].description}</h2>
            <h2>Luftfeuchtigkeit: {data.current.humidity} %</h2>
            <h2>Wind: {Math.round(parseFloat(data.current.wind_speed))} m/s Richtung {getWindDirection(data.current.wind_deg)}</h2>
            <h2>
                Wahrscheinlichkeit{' '}
                {data.hourly[0].pop !== 0 ? Math.round(data.hourly[0].pop * 100) : 0} %
            </h2>
                <h2 style={{margin: 'auto', display: 'flex', justifyContent: 'right', right:'50px'}}>
                    Menge{' '}
                    {typeof data.hourly[0].rain !== 'undefined' ? data.hourly[0].rain['1h'] : 0} mm
                </h2>
        </div>
    );
}

export default WeatherwidgetComponent;