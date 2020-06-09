import React, { useContext, useEffect } from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { history } from './_helpers/history';

import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import User from './components/User';
import NavBar from './components/Navbar';

import { PrivateRoute } from './_helpers/privateRoute';
import { authContext } from './contexts/authContext';
import { AUTHORIZE } from './constants';

import './App.css';

function App() {
  const { dispatch } = useContext(authContext);

  useEffect(() => {
    let token = localStorage.getItem('token');
    if (token) {
      token = token.replace(/^"(.*)"$/, '$1');
      dispatch({ type: AUTHORIZE, payload: token })
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router history={history}>
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <PrivateRoute path='/user' component={User} />
          <Route component={() => <Redirect to="/" />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;