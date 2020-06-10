import React, { useContext, useState } from 'react';
import { authContext } from '../../contexts/authContext';
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from '../../constants';
import LoginForm from './LoginForm';
import { Redirect, Link } from 'react-router-dom';
import ApiService from '../../_services/apiService';
import { validator } from '../../_helpers/validator';
import './login.scss';

const Login = () => {
  const { authStatus, dispatch } = useContext(authContext);
  const [fields, setFields] = useState({ email: '', password: '' });
  const [validationErrors, setValidationErrors] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validator(fields);
    setValidationErrors(errors);

    if (!errors) {
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
            <LoginForm handleSubmit={handleSubmit} fields={fields} validationErrors={validationErrors} handleFields={handleFields} />
            <p className="login__register">Not registered? <Link to={'/register'}>Create an account</Link></p>
          </div>
        )
      }
    </div >
  )
};

export default Login;