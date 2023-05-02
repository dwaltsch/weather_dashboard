import React from 'react'
import {Line} from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
} from "chart.js"

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
)
function Index() {
    const data = {
        labels:["May 12","May 13","May 14","May 15","May 16","May 17"],
        datasets:[{
            data:[8,7.8,9,10,5,9]
        }]
    };
    const options = {};
    return (
        <Line data={data} options={options}></Line>
    )
}

export default Index
