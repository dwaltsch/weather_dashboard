import React, { Component, useEffect, useState } from 'react';
import Geocode from "react-geocode";
import styles from './weatherwidget.module.css';
import secret from '../../secret/secret.json';

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

    if(!data.main){
        return <div>loading...</div>
    }

    return (
        <div className={styles.container}>
            <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`} alt="weather icon"/>
            <h1>{data.main.temp}°C</h1>
            <h2>{data.weather[0].description}</h2>
            <h2>Wind: {data.wind.speed} m/s</h2>
        </div>
    );
}

export default Weatherwidget;