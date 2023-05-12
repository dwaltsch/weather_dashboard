import styles from './Moonphase.module.css';
import { APIContext } from "../../App.js";
import { useContext } from 'react';

function moon_phase_recommendations(moon_phase_percent) {
    if (moon_phase_percent <= 5) {
        return "Neumond - Setze Absichten, starte neue Projekte, vermeide große Entscheidungen.";
    } else if (moon_phase_percent <= 20) {
        if (moon_phase_percent <= 10) {
            return "Zunehmender Mond - Setze Ziele um, beginne Projekte, vermeide Impulsivität.";
        } else if (moon_phase_percent <= 15) {
            return "Erstes Viertel - Stelle dich Herausforderungen, triff Entscheidungen, handle, vermeide Konfrontation.";
        } else {
            return "Zunehmender Halbmond - Verfeinere Ziele und Strategien, konzentriere dich auf Wachstum und Fortschritt, vermeide Sturheit.";
        }
    } else if (moon_phase_percent <= 65) {
        if (moon_phase_percent <= 25) {
            return "Vollmond - Feiere Erfolge, zeige Dankbarkeit, genieße den Moment, vermeide Überemotion.";
        } else if (moon_phase_percent <= 35) {
            return "Abnehmender Halbmond - Bewertet Fortschritt, nimm Anpassungen vor, lass los, vermeide Selbstkritik.";
        } else {
            return "Fast Vollmond - Nutze die Energie des bevorstehenden Vollmonds, um deine Pläne zu beschleunigen. Vermeide Überforderung, gönne dir genügend Ruhepausen.";
        }
    } else {
        if (moon_phase_percent <= 80) {
            return "Letztes Viertel - Lass los, reflektiere gelernte Lektionen, vermeide Selbstkritik.";
        } else {
            return "Abnehmender Mond - Ruhe dich aus, lade Batterien auf, konzentriere dich auf Selbstpflege und Spiritualität, vermeide große Entscheidungen.";
        }
    }
}

function Moonphase() {
    const data = useContext(APIContext);
    if (!data.current) {
        return <div>loading...</div>
    }

    return (
        <div className={styles.container}>
            <img className="moonimage" style={{
                height: '65px',
                width: '65px',
                margin: 'auto',
                display: 'flex',
                left: '0',
                justifyContent: 'left',
                padding: '18px'
            }}
                 src={`https://www.timeanddate.de/scripts/moon.php?i=${data.daily[0].moon_phase}&p=10&r=0.883`}
                 alt="weather icon"/>
            <h2>Mondphase</h2>
            <h3 style={{

            }}
            >{((data.daily[0].moon_phase) * 100).toFixed(0)} % beleuchtet
            </h3>
            <p style={{
                fontSize: '15px',
                margin: '10px',
                textAlign: 'center',

            }}>{moon_phase_recommendations((data.daily[0].moon_phase) * 100)}</p>
        </div>
    );
}

export default Moonphase;