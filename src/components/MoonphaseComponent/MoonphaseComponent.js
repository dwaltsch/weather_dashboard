import React, {useEffect, useState} from 'react';
import styles from './MoonphaseComponent.module.css';
import secret from '../../secret/secret.json';

function Moonphase() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const successCallback = (position) => {
            const {latitude, longitude} = position.coords;
            // fetch from openweatherapi
            fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${secret.apiKey}&units=metric&lang=de`)
                .then(response => response.json())
                .then(data => {
                    //console.log(data)
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
            <h2>Momentane Mondphase</h2>
            <p>{((1-data.daily[0].moon_phase)*100).toFixed(2)} %</p>
        </div>
    );
}

export default Moonphase;