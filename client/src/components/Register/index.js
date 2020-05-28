import React, { useContext, useState } from 'react';
import { authContext } from '../../contexts/authContext'
import { Redirect } from 'react-router-dom';
import apiService from '../../_services/apiService';
import { history } from '../../_helpers/history';
import '../Login/login.scss';

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
    <div className="login">
      {authStatus.isLogged ?
        (
          <Redirect to='/' />
        )
        :
        (
          <form className="login--loginForm" onSubmit={handleSubmit}>
            <p className="login--mainText">Create account</p>
            <input className="login--loginForm__field" type="text" placeholder="login" value={login}
              onChange={(e) => setLogin(e.target.value)} required />
            <input className="login--loginForm__field" type="text" placeholder="email" value={email}
              onChange={(e) => setEmail(e.target.value)} required />
            <input className="login--loginForm__field" type="password" placeholder="password" value={password}
              onChange={(e) => setPassword(e.target.value)} required />
            <input className="login--loginForm__submit" type="submit" value="submit" />
          </form>
        )
      }
    </div>
  )
};

export default Register;
//ZORBIC PAYLOAD Z ERROR dispatch({ type: REGISTER_FAILURE, payload: error })