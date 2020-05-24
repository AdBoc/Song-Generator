import React, { useContext, useState } from 'react';
import { authContext } from '../../contexts/authContext'
import {
  REGISTER_SUCCESS,
  REGISTER_FAILURE
} from '../../constants';
import axios from 'axios';
import { history } from '../../_helpers/history';

const Register = () => {
  const { authStatus, dispatch } = useContext(authContext);
  const [email, setEmail] = useState('');
  const [username, setUser] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:2137/user/register', {
      username,
      email,
      password
    })
      .then(response => {
        dispatch({ type: REGISTER_SUCCESS })
        history.push('/');
      })
      .catch(error => {
        dispatch({ type: REGISTER_FAILURE })
      });
  }

  return (
    <div>
      {authStatus.isLogged ?
        (
          <p> You are logged in </p>
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
    </div>
  )
};

export default Register;
//ZORBIC PAYLOAD Z ERROR dispatch({ type: REGISTER_FAILURE, payload: error })