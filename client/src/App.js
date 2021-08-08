import { useState, useEffect } from 'react'
import Home from './pages/Home'
import User from './utils/UserAPI'
import Login from './pages/Login'

import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'



function App() {
  const [meState, setMeState] = useState({
    me: {},
    isLoggedIn: true
  })
  const getMe = () => {
    User.me()
      .then(({ data: me }) => {
        if (me) {
          setMeState({ me, isLoggedIn: true })
        } else {
          getMe()
        }
      })
      .catch(err => {
        console.error(err)
        setMeState({ ...meState, isLoggedIn: false })
      })
  }

  const handleLogOut = () => {
    localStorage.removeItem('token')
    setMeState({ me: {}, isLoggedIn: false })
    window.location = '/login'
  }

  useEffect(() => {
    getMe()
  }, [])

  const updateMe = () => {
    User.me()
      .then(({ data: me }) => {
        console.log(me)
        setMeState({ me, isLoggedIn: true })
      })
      .catch(err => {
        console.error(err)
        setMeState({ ...meState, isLoggedIn: false })
      })
  }

  const PrivateRoute = ({ children, ...rest }) => {
    return (
      <Route
        {...rest}
        render={({ location }) => meState.isLoggedIn
          ? (
            children
          )
          : (
            <Redirect to={{
              pathname: '/login',
              state: { from: location }
            }}
            />
          )}
      />
    )
  }
  return (
    <Router>
        <div>
            <Switch>
          <Route exact path='/Home'>
            <Home />
          </Route>
          <Route exact path='/'>
            <Login updateMe={updateMe} />
          </Route>
            </Switch>
        </div>
    </Router>
  );
}

export default App;
