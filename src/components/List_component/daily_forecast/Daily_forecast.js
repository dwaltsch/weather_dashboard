import React, { useEffect, useState } from 'react'
import styles from "./Daily_forecast.module.css";

function Daily_forecast({daytime, temperature, weatherIcon}) {

    return (
        <div className={styles.forecastList}>
            <p>{daytime}</p>
            <p>{temperature}</p>
            <img src={weatherIcon} alt="weather icon"/>
        </div>
    );
}

export default Daily_forecast