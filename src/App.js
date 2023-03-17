import './App.css';
import Header from "./components/Header";
import List from './components/List_component/List';

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <Header></Header>
          <List></List>
      </header>
    </div>
  );
}

export default App;
