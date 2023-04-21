import './App.css';
import secret from "./secret/secret.json"
import Header from "./components/HeaderComponent/Header.js";
import List from './components/ListComponent/List.js';
import Weatherwidget from "./components/WeatherwidgetComponent/WeatherwidgetComponent.js";
import Moonphase from "./components/MoonphaseComponent/MoonphaseComponent.js";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Header apikey={secret.apiKey}></Header>
                <div className='App-body'>
                    <div className="App-body-left-side">
                        <Weatherwidget></Weatherwidget>
                        <Moonphase></Moonphase>
                    </div>
                    <List></List>
                </div>
            </header>
        </div>
    );
}

export default App;
