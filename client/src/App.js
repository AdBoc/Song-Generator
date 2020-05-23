import React, { useContext, useEffect } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { history } from './_helpers/history';

import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';

import { authContext } from './contexts/authContext'
import { AUTHORIZE } from './constants';

function App() {
  const { dispatch } = useContext(authContext);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch({ type: AUTHORIZE })
    } // eslint-disable-next-line react-hooks/exhaustive-deps
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

//JESLI WYSLE W PAYLOADZIE TOKEN TO MEGE GO SETOWAC W REDUCERZE I PRZECHOWYWAC W CONTEXCIE BEZ ZABAWY W REGEXY ABY GO ZDOBYC