import React, {useEffect, useState} from 'react'
import styles from "./DailyForecast.module.css";

export default function DailyForecast({day, daytime, temperature, weatherIcon}) {

    return (
        <div className={styles.forecastList}>
            <div className={styles.time}>
                <span>{day}</span>
                <span>{daytime}</span>
            </div>
            <p>{temperature}</p>
            <img src={weatherIcon} alt="weather icon"/>
        </div>
    );
}