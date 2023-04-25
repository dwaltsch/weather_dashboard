import './App.css';
import secret from "./secret/secret.json"
import Header from "./components/Header/";
import List from './components/List/';
import Weatherwidget from "./components/Weatherwidget/";
import Moonphase from "./components/Moonphase/";

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
