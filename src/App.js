import './App.css';
import secret from "./secret/secret.json"
import Header from "./components/Header/";
import Weatherwidget from "./components/Weatherwidget/";
import Moonphase from "./components/Moonphase/";
import Casino from "./components/Casino/";

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
                    </div>
                    <div className='App-body-right-side'>
                        <div className="weatherlist">
                            <Casino></Casino>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default App;
