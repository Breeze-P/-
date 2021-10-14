import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './features/main/index'
import Backstage from "./backstage";

function App() {
  return (
    <div className="App">
        <Router>
            <Switch>
                <Route path='/backstage'>
                    <Backstage />
                </Route>
                <Route path='/'>
                    <Home />
                </Route>
            </Switch>
        </Router>
    </div>
  );
}

export default App;
