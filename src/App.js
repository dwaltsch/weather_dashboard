import './App.css';
import Header from "./components/Header_component/Header";
import List from './components/List_component/List';
import Weatherwidget from "./components/Weatherwidget_component/weatherwidget";
import Moonphase from "./components/Moonphase_component/moonphase";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Header></Header>
                <Weatherwidget></Weatherwidget>
                <Moonphase></Moonphase>
                <List></List>
            </header>
        </div>
    );
}

export default App;
