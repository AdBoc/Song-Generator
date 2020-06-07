import React, { useContext, useState } from 'react';
import { authContext } from '../../contexts/authContext'
import { Redirect } from 'react-router-dom';
import apiService from '../../_services/apiService';
import { history } from '../../_helpers/history';
import './register.scss';

const Register = () => {
  const { authStatus } = useContext(authContext);
  const [email, setEmail] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    apiService.register(login, email, password).then(response => response === 'Email or Username already exists' ? setError(response) : history.push('/login'));
  }

  return (
    <div className="register">
      {authStatus.isLogged ?
        (
          <Redirect to='/login' />
        )
        :
        (
          <form className="register__registerForm" onSubmit={handleSubmit}>
            <p className="register__mainText">Create account</p>
            <input className="register__registerForm--field" type="text" placeholder="login" value={login}
              onChange={(e) => setLogin(e.target.value)} required />
            <input className="register__registerForm--field" type="text" placeholder="email" value={email}
              onChange={(e) => setEmail(e.target.value)} required />
            <input className="register__registerForm--field" type="password" placeholder="password" value={password}
              onChange={(e) => setPassword(e.target.value)} required />
            {error && <p className="register__registerForm--error">{error}</p>}
            <input className="register__registerForm--submit" type="submit" value="submit" />
          </form>
        )
      }
    </div>
  )
};

export default Register;