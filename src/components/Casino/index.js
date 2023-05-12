import React, { useEffect, useState } from 'react';
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

        fetch(`http://localhost:5000/loadfunds?uuid=${getUniqueId()}`)
            .then(response => response.json())
            .then(data => {
                setData(data);
                console.log(data);
            })

    }, []);

    return (
        <div className={styles.container}>
            <h2>Erstelle deine eigene Wettervorhersage</h2>
            <p>Current funds: {data}</p>
            <input type="text" id="bet" name="bet" placeholder="Bet amount"></input>
            <input type="text" id="temp" name="temp" placeholder="Temperature"></input>

            <button onClick={() => {
                fetch(`http://localhost:5000/enterbet?uuid=${getUniqueId()}&bet=${document.getElementById("bet").value}&temp=${document.getElementById("temp").value}`)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                    })
            }
            }>submit</button>
        </div>
    );
}

export default Casino;