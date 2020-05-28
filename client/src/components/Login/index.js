import React, { useContext, useState } from 'react';
import { authContext } from '../../contexts/authContext';
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from '../../constants';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import './login.scss'

const Login = () => {
  const { authStatus, dispatch } = useContext(authContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:2137/user/login', {
      email,
      password
    })
      .then(response => {
        const token = response.data.token
        localStorage.setItem('token', JSON.stringify(token));
        dispatch({ type: LOGIN_SUCCESS, payload: token });
      })
      .catch(error => {
        dispatch({ type: LOGIN_FAILURE })
      });
  }

  return (
    <div className="login">
      {authStatus.isLogged ?
        (
          <Redirect to='/' />
        )
        :
        (
          <div className="login--loginForm">
            <p className="login--mainText">Login</p>
            <form onSubmit={handleSubmit}>
              <input className="login--loginForm__field" type="text" placeholder="email" value={email}
                onChange={(e) => setEmail(e.target.value)} required />
              <input className="login--loginForm__field" type="password" placeholder="password" value={password}
                onChange={(e) => setPassword(e.target.value)} required />
              <input className="login--loginForm__submit" type="submit" value="submit" />
            </form>
            <p className="login--register">Not registered? <Link to={'/register'}>Create an account</Link></p>
          </div>
        )
      }
    </div >
  )
};

export default Login;
//w login success moge zrobic setToken w storage
//zrobic link do register