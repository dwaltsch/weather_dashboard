//import data from '/secrets/secrets.json';
import React, {Component} from 'react';
import Geocode from "react-geocode";

Geocode.setApiKey("")

const successCallback = (position) => {
    const {latitude, longitude} = position.coords;
    Geocode.fromLatLng(latitude, longitude).then(
        (response) => {
            const address = response.results[0].formatted_address;
            let city, state, country;
            for (let i = 0; i < response.results[0].address_components.length; i++) {
                for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
                    switch (response.results[0].address_components[i].types[j]) {
                        case "locality":
                            city = response.results[0].address_components[i].long_name;
                            break;
                        case "administrative_area_level_1":
                            state = response.results[0].address_components[i].long_name;
                            break;
                        case "country":
                            country = response.results[0].address_components[i].long_name;
                            break;
                    }
                }
            }
            console.log(city, state, country);
            console.log(address);
        },
        (error) => {
            console.error(error);
        }
    );
};

const errorCallback = (error) => {
    console.log(error);
};


navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

class Header extends Component {
    render() {
        return (
            <div>
                <h1>Weather in {}</h1>
            </div>
        );
    }
}

export default Header;