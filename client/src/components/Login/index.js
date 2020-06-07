import React, { useContext, useState } from 'react';
import { authContext } from '../../contexts/authContext';
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from '../../constants';
import { Redirect, Link } from 'react-router-dom';
import ApiService from '../../_services/apiService';
import './login.scss';

const Login = () => {
  const { authStatus, dispatch } = useContext(authContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    ApiService.login(email, password).then(token => token ? dispatch({ type: LOGIN_SUCCESS, payload: token }) : dispatch({ type: LOGIN_FAILURE }));
  }

  return (
    <div className="login">
      {authStatus.isLogged ?
        (
          <Redirect to='/' />
        )
        :
        (
          <div className="login__loginForm">
            <p className="login__mainText">Login</p>
            <form onSubmit={handleSubmit}>
              <input className="login__loginForm--field" type="text" placeholder="email" value={email}
                onChange={(e) => setEmail(e.target.value)} required />
              <input className="login__loginForm--field" type="password" placeholder="password" value={password}
                onChange={(e) => setPassword(e.target.value)} required />
              <input className="login__loginForm--submit" type="submit" value="submit" />
            </form>
            <p className="login__register">Not registered? <Link to={'/register'}>Create an account</Link></p>
          </div>
        )
      }
    </div >
  )
};

export default Login;