import {useContext} from "react";
import {APIContext} from "../../App.js";
import DailyForecast from "./DailyForecast/index.js";


export default function List() {
    const data = useContext(APIContext);
    return (
        <div>
            {(data.daily || []).map(({dt, temp, wind_speed, feels_like, weather}, i) => {
                return (
                    <DailyForecast
                        day={new Date(dt * 1000).toLocaleDateString("de-DE")}
                        daytime={new Date(dt * 1000).toLocaleTimeString("de-DE")}
                        temperature={temp.day + " °C"}
                        weatherIcon={`http://openweathermap.org/img/wn/${weather[0].icon}.png`}
                        wind={wind_speed}
                        key={i}
                        tempFeelsLike={feels_like.day}
                    />
                );
            })}
        </div>
    );
}