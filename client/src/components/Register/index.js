import React, { useContext, useState } from 'react';
import { authContext } from '../../contexts/authContext'
import { Redirect } from 'react-router-dom';
import apiService from '../../_services/apiService';
import { history } from '../../_helpers/history';

const Register = () => {
  const { authStatus } = useContext(authContext);
  const [email, setEmail] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    apiService.register(login, email, password);
    history.push('/');
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
            <input type="text" placeholder="login" value={login}
              onChange={(e) => setLogin(e.target.value)} required />
            <input type="text" placeholder="email" value={email}
              onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="password" value={password}
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