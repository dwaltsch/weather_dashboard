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
                <Weatherwidget></Weatherwidget>
                <Moonphase></Moonphase>
                <List></List>
            </header>
        </div>
    );
}

export default App;
