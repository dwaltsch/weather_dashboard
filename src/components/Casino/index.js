import React, {useEffect, useState} from 'react';
import styles from './Casino.module.css';
import secret from '../../secret/secret.json';
import { v4 as uuidv4 } from 'uuid';

function getUniqueId() {
    let uniqueId = localStorage.getItem('myUniqueId');
    if (!uniqueId) {
        uniqueId = uuidv4();
        localStorage.setItem('myUniqueId', uniqueId);
    }
    return uniqueId;
}

function Casino() {
    const [data, setData] = useState([]);

    useEffect(() => {
            // fetch from openweatherapi
            fetch(`http://localhost:5000/loadfunds?uuid=${getUniqueId()}`)
                .then(response => response.json())
                .then(data => {
                    setData(data);
                    console.log(data);
                })

    }, []);

    if (!data.current) {
        return <div>loading...</div>
    }

    return (
        <div className={styles.container}>
            <h2>Erstelle deine eigene Wettervorhersage</h2>
        </div>
    );
}

export default Casino;