import Home from './pages/Home'
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'



function App() {
  return (
    <Router>
        <div>
            <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
            </Switch>
        </div>
    </Router>
  );
}

export default App;
