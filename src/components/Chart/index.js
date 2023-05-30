import React, { useEffect, useState } from "react";
import styles from "./Chart.modules.css";
import secret from "../../secret/secret.json";

import { Line } from "react-chartjs-2";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend);

function Index() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const successCallback = (position) => {
      const { latitude, longitude } = position.coords;
      // fetch from openweatherapi
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${secret.apiKey}&units=metric&cnt=5`
      )
        .then((response) => response.json())
        .then(({ list }) => {
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

  let dateArray = [];
  let temperatureArray = [];
  let temperatureFeelsLike = [];
  data.map(({ dt, main }) => {
    dateArray.push(new Date(dt * 1000).toLocaleTimeString("de-DE"));
    temperatureArray.push(main.temp);
    temperatureFeelsLike.push(main.feels_like);
    return;
  });
  const dataForChart = {
    labels: [
      dateArray[0],
      dateArray[1],
      dateArray[2],
      dateArray[3],
      dateArray[4],
    ],
    datasets: [
      {
        label: "Temperatur",
        data: [
          temperatureArray[0],
          temperatureArray[1],
          temperatureArray[2],
          temperatureArray[3],
          temperatureArray[4],
        ],
        backgroundColor: "transparent",
        borderColor: "#555555",
        pointBorderColor: "transparent",
        pointBorderWidth: 4,
      },
      {
        label: "Gefühlte Temperatur",
        data: [
          temperatureFeelsLike[0],
          temperatureFeelsLike[1],
          temperatureFeelsLike[2],
          temperatureFeelsLike[3],
          temperatureFeelsLike[4],
        ],
        backgroundColor: "transparent",
        borderColor: "white",
        pointBorderColor: "transparent",
        pointBorderWidth: 4,
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          color: "Black",
          font: {
            weight: "bold",
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(0,0,0,0.5)",
          lineWidth: 1,
        },
        ticks: {
          color: "#000000",
        },
      },
      y: {
        grid: {
          color: "rgba(0,0,0,0.5)",
          lineWidth: 1,
        },
        ticks: {
          stepSize: 2,
          color: "#000000",
        },
      },
    },
  };
  return <Line className={styles.Chart} data={dataForChart} options={options}></Line>;
}

export default Index;
