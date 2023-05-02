import React, {useEffect, useState} from "react";

import secret from "../../secret/secret.json";

import {Line} from "react-chartjs-2";
import {CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement,} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend);

function Index() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const successCallback = (position) => {
            const {latitude, longitude} = position.coords;
            // fetch from openweatherapi
            fetch(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${secret.apiKey}&units=metric&cnt=5`
            )
                .then((response) => response.json())
                .then(({list}) => {
                    setData(list);
                });
        };

        const errorCallback = (error) => {
            console.error(error);

        };

        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    }, []);
    if (!data) {
        return <p>Loading...</p>;
    }
    console.log(data)

    let dateArray = [];
    let temperatureArray = [];
    let temperatureFeelsLike = [];
    data.map(({dt, main}) => {
        dateArray.push(new Date(dt * 1000).toLocaleTimeString("de-DE"));
        temperatureArray.push(main.temp)
        temperatureFeelsLike.push(main.feels_like)
    })
    const dataForChart = {
        labels: [dateArray[0], dateArray[1], dateArray[2], dateArray[3], dateArray[4]],
        datasets: [
            {
                label: "Temperatur",
                data: [temperatureArray[0], temperatureArray[1], temperatureArray[2], temperatureArray[3], temperatureArray[4]],
                backgroundColor: "#555555",
                borderColor: "#555555",
                pointBorderColor: "transparent",
                pointBorderWidth: 4,
            },
            {
                label: "Gefühlte Temperatur",
                data: [temperatureFeelsLike[0], temperatureFeelsLike[1], temperatureFeelsLike[2], temperatureFeelsLike[3], temperatureFeelsLike[4]],
                backgroundColor: "white",
                borderColor: "white",
                pointBorderColor: "transparent",
                pointBorderWidth: 4,
            }
        ],
    };
    const options = {
        plugins: {
            legend: {
                position: 'bottom',
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {

                ticks: {
                    stepSize: 2,

                }
            }
        },
    };
    return <Line data={dataForChart} options={options}></Line>;
}

export default Index;
