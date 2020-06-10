import React, { useContext, useState } from 'react';
import { authContext } from '../../contexts/authContext'
import { Redirect } from 'react-router-dom';
import apiService from '../../_services/apiService';
import { history } from '../../_helpers/history';
import { validator } from '../../_helpers/validator';
import RegisterField from './RegisterField/index';
import './register.scss';

const Register = () => {

  const initialState = {
    login: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  const { authStatus } = useContext(authContext);
  const [fields, setFields] = useState(initialState)
  const [apiError, setApiError] = useState('');
  const [validationErrors, setValidationErrors] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validator(fields);
    setValidationErrors(errors);

    if (!errors) {
      const { login, email, password } = fields;
      const response = await apiService.register(login, email, password);
      response === 'Email or Username already exists' ? setApiError(response) : history.push('/login');
    }
  }

  const handleFields = (e) => {
    const { name, value } = e.target;
    setFields(prev => ({ ...prev, [name]: value }));
  }

  return (
    <div className="register">
      {authStatus.isLogged ?
        (
          <Redirect to='/login' />
        )
        :
        (
          <form className="register__registerForm" onSubmit={handleSubmit} noValidate>
            <p className="register__mainText">Create account</p>

            <RegisterField handleFields={handleFields} fields={fields} validationErrors={validationErrors} placeholder="Login" name="login" type="text" />
            <RegisterField handleFields={handleFields} fields={fields} validationErrors={validationErrors} placeholder="Email" name="email" type="email" />
            <RegisterField handleFields={handleFields} fields={fields} validationErrors={validationErrors} placeholder="Password" name="password" type="password" />
            <RegisterField handleFields={handleFields} fields={fields} validationErrors={validationErrors} placeholder="Confirm Password" name="confirmPassword" type="password" />

            {apiError && <p className="register__registerForm--error">{apiError}</p>}
            <input className="register__registerForm--submit" type="submit" value="submit" />
          </form>
        )
      }
    </div>
  )
};

export default Register;