import './App.css';
import secret from "./secret/secret.json"
import Header from "./components/Header/";
import List from './components/List/';
import Weatherwidget from "./components/Weatherwidget/";
import Moonphase from "./components/Moonphase/";
import Chart from "./components/Chart/"

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Header apiKey={secret.apiKey}></Header>
                <div className='App-body'>
                    <div className="App-body-left-side">
                        <Weatherwidget></Weatherwidget>
                        <Moonphase></Moonphase>
                    </div>
                    <div className='App-body-right-side'>
                        <List></List>
                    </div>
                </div>
                <div className="Chart">
                    <Chart></Chart>
                </div>
            </header>
        </div>
    );
}

export default App;
