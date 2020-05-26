import React, { useContext, useState } from 'react';
import { authContext } from '../../contexts/authContext'
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from '../../constants';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const Login = () => {
  const { authStatus, dispatch } = useContext(authContext);
  const [email, setEmail] = useState('');
  const [username, setUser] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:2137/user/login', {
      username,
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
    <div>
      {authStatus.isLogged ?
        (
          <Redirect to='/' />
        )
        :
        (
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="email" value={email}
              onChange={(e) => setEmail(e.target.value)} required />
            <input type="text" placeholder="username" value={username}
              onChange={(e) => setUser(e.target.value)} required />
            <input type="text" placeholder="password" value={password}
              onChange={(e) => setPassword(e.target.value)} required />
            <input type="submit" value="submit" />
          </form>
        )
      }
    </div >
  )
};

export default Login;

//w login success moge zrobic setToken w storage
//zrobic link do register