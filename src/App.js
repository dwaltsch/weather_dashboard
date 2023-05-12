import './App.css';
import secret from "./secret/secret.json"
import Header from "./components/Header/";
import List from './components/List/';
import Weatherwidget from "./components/Weatherwidget/";
import Moonphase from "./components/Moonphase/";
import Chart from "./components/Chart/"
import { createContext } from 'react';
import { useWeather } from './hooks/useWeather';

export const APIContext = createContext(null);


function App() {
    const data = useWeather();
    return (
        <APIContext.Provider value={data}>
            <div className="App">
                <header className="App-header">
                    <Header apiKey={secret.apiKey}></Header>
                    <div className='App-body'>
                        <div className="App-body-left-side">
                            <div className="widget">
                                <Weatherwidget></Weatherwidget>
                            </div>
                            <div className="moonbox">
                                <Moonphase></Moonphase>
                            </div>
                        </div>
                        <div className='App-body-right-side'>
                            <div className="weatherlist">
                                <List></List>
                            </div>
                        </div>
                    </div>
                    <div className="Chart">
                        <Chart></Chart>
                    </div>
                </header>
            </div>
        </APIContext.Provider>
    );
}

export default App;
