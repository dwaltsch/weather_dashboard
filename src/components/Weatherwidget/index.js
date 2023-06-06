import styles from './Weatherwidget.module.css';
import {APIContext} from "../../App.js";
import {useContext} from 'react';

function getWindDirection(deg) {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(deg / (360 / directions.length)) % directions.length;
    return directions[index];
}

function WeatherwidgetComponent() {
    const data = useContext(APIContext);
    if (!data.current) {
        return ("Loading")
    }
    return (
        <div className={styles.container}>
            <img src={`http://openweathermap.org/img/wn/${data.current.weather[0].icon}@4x.png`} alt="weather icon"
                 width={"200px"} height={"200px"}/>
            <h1>{parseInt(data.current.temp.toFixed(1))}°C</h1>
            <h2>{data.current.weather[0].description}</h2>
            <h2>Luftfeuchtigkeit: {data.current.humidity} %</h2>
            <h2>Wind: {Math.round(parseFloat(data.current.wind_speed))} m/s
                Richtung {getWindDirection(data.current.wind_deg)}</h2>
            <h2>
                Wahrscheinlichkeit{' '}
                {data.hourly[0].pop !== 0 ? Math.round(data.hourly[0].pop * 100) : 0} %
            </h2>
            <h2 style={{margin: 'auto', display: 'flex', justifyContent: 'center'}}>
                Menge{' '}
                {typeof data.hourly[0].rain !== 'undefined' ? data.hourly[0].rain['1h'] : 0} mm
            </h2>
        </div>
    );
}

export default WeatherwidgetComponent;