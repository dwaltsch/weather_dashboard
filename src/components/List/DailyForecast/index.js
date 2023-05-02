import {useState} from "react";
import styles from "./DailyForecast.module.css";

export default function DailyForecast({
                                          day,
                                          daytime,
                                          temperature,
                                          weatherIcon,
                                          wind,
                                          tempFeelsLike
                                      }) {
    const [isElementOpen, setIsElementOpen] = useState(false);
    const toggle = () => {
        setIsElementOpen(!isElementOpen);

    };

    const forecastListStyle = !isElementOpen ? styles.forecastList : `${styles.forecastList} ${styles.forecastListExpanded}`

    return (
        <div className={forecastListStyle} onClick={toggle}>
            <div className={styles.forecastListNotExpanded}>
                <div className={styles.time}>
                    <span>{day}</span>
                    <span>
                {daytime.split(":")[0]}:{daytime.split(":")[1]}
            </span>
                </div>
                <p className={styles.temperature}>{parseInt(temperature)} °C</p>
                <img src={weatherIcon} alt="weather icon"/>
            </div>
            {isElementOpen && (
                <>
                    <span>Windgeschwindigkeit: {Math.round(parseFloat(wind))} m/s</span>
                    <span>Gefühlte Temperatur: {parseInt(tempFeelsLike)} °C</span>
                </>
            )}
        </div>
    );
}
