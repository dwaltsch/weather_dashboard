//import data from '/secrets/secrets.json';
import React, {Component,useEffect,useState} from 'react';
import Geocode from "react-geocode";


function Header() {
    const [data,setData] = useState([]);

    useEffect(() => {
        const apikey = ""

        const successCallback = (position) => {

            const {latitude, longitude} = position.coords;
            // fetch from openweatherapi
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}&units=metric`)
                .then(response => response.json())
                .then(data => {
                    setData(data);
                })
        };

        const errorCallback = (error) => {
            console.log(error);
        };


        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    }, []);

    return (
        <div>
            <h1>Wetter in {data.name}</h1>
        </div>
    );
}

export default Header;