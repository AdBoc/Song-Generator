import React, { useContext, useEffect } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { history } from './_helpers/history';

import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';

import { authContext } from './contexts/authContext'

function App() {
  const { authStatus, login } = useContext(authContext);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      login()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router history={history}>
      <div className="App">
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route component={() => <div>Route Does Not Exist</div>} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;