import data from "/public/secrets/secrets.json";
import React, {Component,useEffect,useState} from 'react';
import Geocode from "react-geocode";
import styles from './weatherwidget.module.css';


function Weatherwidget() {
    const [data,setData] = useState([]);

    useEffect(() => {
        const apikey = data.apiKey;

        const successCallback = (position) => {

            const {latitude, longitude} = position.coords;
            // fetch from openweatherapi
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}&units=metric`)
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
            <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`} alt="weather icon"/>
            <h1>{data.main.temp}°C</h1>
            <h2>{data.weather[0].description}</h2>
            <h2>Wind: {data.wind.speed} m/s</h2>
        </div>
    );
}

export default Weatherwidget;