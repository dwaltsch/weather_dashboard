//import data from '/secrets/secrets.json';
import React, {useEffect, useState} from 'react';

function Header(props) {
    const [data, setData] = useState([]);

    useEffect(() => {
        const successCallback = (position) => {
            const {latitude, longitude} = position.coords;
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${props.apikey}&units=metric`)
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