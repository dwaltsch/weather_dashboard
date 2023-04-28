import React, {useEffect, useState} from 'react';
import styles from './Moonphase.module.css';
import secret from '../../secret/secret.json';

function moon_phase_recommendations(moon_phase_percent) {
    if (moon_phase_percent <= 5) {
        return "Neumond - Konzentriere dich darauf, Absichten zu setzen und neue Projekte zu starten. Vermeide es, große Entscheidungen zu treffen.";
    } else if (moon_phase_percent <= 10) {
        return "Zunehmender Mond - Setze deine Ziele in die Tat um. Pflanze Samen und beginne Projekte. Vermeide es, impulsiv zu sein.";
    } else if (moon_phase_percent <= 15) {
        return "Erstes Viertel - Stelle dich Herausforderungen. Triff Entscheidungen und handle. Vermeide es, zu konfrontativ zu sein.";
    } else if (moon_phase_percent <= 20) {
        return "Zunehmender Halbmond - Verfeinere deine Ziele und Strategien. Konzentriere dich auf Wachstum und Fortschritt. Vermeide es, zu stur zu sein.";
    } else if (moon_phase_percent <= 25) {
        return "Vollmond - Feiere deine Erfolge. Zeige Dankbarkeit und genieße den Moment. Vermeide es, zu emotional zu sein.";
    } else if (moon_phase_percent <= 30) {
        return "Abnehmender Halbmond - Bewertet deinen Fortschritt und nimm Anpassungen vor. Lass los, was dir nicht mehr dient. Vermeide es, zu selbstkritisch zu sein.";
    } else if (moon_phase_percent <= 35) {
        return "Letztes Viertel - Lass los, was dir nicht mehr dient. Reflektiere über gelernte Lektionen. Vermeide es, zu hart mit dir selbst zu sein.";
    } else if (moon_phase_percent <= 40) {
        return "Abnehmender Mond - Ruhe dich aus und lade deine Batterien auf. Konzentriere dich auf Selbstpflege und spirituelle Praktiken. Vermeide es, große Entscheidungen zu treffen.";
    } else if (moon_phase_percent <= 45) {
        return "Neumond - Konzentriere dich darauf, Absichten zu setzen und neue Projekte zu starten. Vermeide es, große Entscheidungen zu treffen.";
    } else if (moon_phase_percent <= 50) {
        return "Zunehmender Mond - Setze deine Ziele in die Tat um. Pflanze Samen und beginne Projekte. Vermeide es, impulsiv zu sein.";
    } else if (moon_phase_percent <= 55) {
        return "Erstes Viertel - Stelle dich Herausforderungen. Triff Entscheidungen und handle. Vermeide es, zu konfrontativ zu sein.";
    } else if (moon_phase_percent <= 60) {
        return "Zunehmender Halbmond - Verfeinere deine Ziele und Strategien. Konzentriere dich auf Wachstum und Fortschritt. Vermeide es, zu stur zu sein.";
    } else if (moon_phase_percent <= 65) {
        return "Vollmond - Feiere deine Erfolge. Zeige Dankbarkeit und genieße den Moment. Vermeide es, zu emotional zu sein.";
    } else if (moon_phase_percent <= 70) {
        return "Abnehmender Halbmond - Bewertet deinen Fortschritt und nimm Anpassungen vor. Lass los, was dir nicht mehr dient. Vermeide es, zu selbstkritisch zu sein.";
    } else if (moon_phase_percent <= 75) {
        return "Fast Vollmond - Nutze die Energie des bevorstehenden Vollmonds, um deine Pläne zu beschleunigen. Vermeide es, dich zu überfordern und gönne dir genügend Ruhepausen."
    }
}

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
            <h2>Mondphase</h2>
            <img class="moonimage" style={{height: '75px'}}
                 src={`https://www.timeanddate.de/scripts/moon.php?i=${data.daily[0].moon_phase}&p=10&r=0.883`}
                 alt="weather icon"/>
            <h3>{((data.daily[0].moon_phase) * 100).toFixed(0)} % beleuchtet</h3>
            <p>{moon_phase_recommendations((data.daily[0].moon_phase) * 100)}</p>
        </div>
    );
}

export default Moonphase;