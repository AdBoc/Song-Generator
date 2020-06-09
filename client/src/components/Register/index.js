import React, { useContext, useState } from 'react';
import { authContext } from '../../contexts/authContext'
import { Redirect } from 'react-router-dom';
import apiService from '../../_services/apiService';
import { history } from '../../_helpers/history';
import { useValidation } from '../../hooks/useValidation';
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
  const [checkValidation, setCheckValidation] = useState(false);
  const { validationErrors } = useValidation(fields, checkValidation);

  const handleFields = (e) => {
    const { name, value } = e.target;
    setFields(prev => ({ ...prev, [name]: value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCheckValidation((prev) => !prev);

    if (!validationErrors) {
      const { login, email, password } = fields;
      const response = await apiService.register(login, email, password);
      response === 'Email or Username already exists' ? setApiError(response) : history.push('/login');
    }
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

            <input className="register__registerForm--field" type="text" placeholder="Login" value={fields.login}
              name="login" onChange={handleFields} required />
            {validationErrors.login}

            <input className="register__registerForm--field" type="text" placeholder="Email" value={fields.email}
              name="email" onChange={handleFields} required />
            {validationErrors.email}

            <input className="register__registerForm--field" type="password" placeholder="Password" value={fields.password}
              name="password" onChange={handleFields} required />
            {validationErrors.password}

            <input className="register__registerForm--field" type="password" placeholder="Confirm password" value={fields.confirmPassword}
              name="confirmPassword" onChange={handleFields} required />
            {validationErrors.passwordConfirm}

            {apiError && <p className="register__registerForm--error">{apiError}</p>}
            <input className="register__registerForm--submit" type="submit" value="submit" />
          </form>
        )
      }
    </div>
  )
};

export default Register;