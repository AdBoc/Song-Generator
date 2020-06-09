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
  const [checkValidation, setCheckValidation] = useState(false);
  const { validationErrors } = useValidation(fields, checkValidation);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCheckValidation((prev) => !prev);

    console.log('validationErrors in login ' + !validationErrors)
    if (!validationErrors) {
      const { email, password } = fields;
      const token = await ApiService.login(email, password);
      token ? dispatch({ type: LOGIN_SUCCESS, payload: token }) : dispatch({ type: LOGIN_FAILURE });
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
              <p style={{ marginTop: '1rem' }}>Email</p>
              <input
                className={validationErrors.email ? "login__loginForm--field login__loginForm--error" : "login__loginForm--field"}
                type="text"
                placeholder="email"
                name="email"
                value={fields.email}
                onChange={handleFields} />
              {validationErrors.email && <p className="login__loginForm--validationError">{validationErrors.email}</p>}

              <p>Password</p>
              <input
                className={validationErrors.password ? "login__loginForm--field login__loginForm--error" : "login__loginForm--field"}
                type="password"
                placeholder="password"
                name="password"
                value={fields.password}
                onChange={handleFields} />
              {validationErrors.password && <p className="login__loginForm--validationError">{validationErrors.password}</p>}

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