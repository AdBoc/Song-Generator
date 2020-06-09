import React, { useContext, useState } from 'react';
import { authContext } from '../../contexts/authContext';
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from '../../constants';
import { Redirect, Link } from 'react-router-dom';
import ApiService from '../../_services/apiService';
import { useValidation } from '../../hooks/useValidation';
import './login.scss';

const Login = () => {
  const { authStatus, dispatch } = useContext(authContext);
  const [fields, setFields] = useState({ email: '', password: '' });
  const { validationErrors, validate } = useValidation(fields);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, login } = fields;
    if (!validationErrors) {
      ApiService.login(email, login).then(token => token ? dispatch({ type: LOGIN_SUCCESS, payload: token }) : dispatch({ type: LOGIN_FAILURE }));
    }
  }

  const handleFields = (e) => {
    const { name, value } = e.target;
    setFields(prev => ({ ...prev, [name]: value }));
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
            <form onSubmit={handleSubmit} noValidate>
              <input className="login__loginForm--field" type="text" placeholder="email" name="email" value={fields.email}
                onChange={handleFields} required />
              {validationErrors.email ? validationErrors.email : null}
              <input className="login__loginForm--field" type="password" placeholder="password" name="password" value={fields.password}
                onChange={handleFields} required />
              {validationErrors.password ? validationErrors.password : null}
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
//moge zrboic wlasne NoValidate do form