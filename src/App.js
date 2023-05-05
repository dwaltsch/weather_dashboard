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
    );
}

export default App;
