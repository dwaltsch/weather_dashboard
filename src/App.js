import './App.css';
import Header from "./components/Header";
import List from './components/List_component/List';
import Weatherwidget from "./components/weatherwidget";

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <Header></Header>
          <List></List>
<Weatherwidget></Weatherwidget>
      </header>
    </div>
  );
}

export default App;
