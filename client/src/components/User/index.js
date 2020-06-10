import React, { useState, useContext, useEffect } from 'react';
import { authContext } from '../../contexts/authContext';
import ApiService from '../../_services/apiService';
import UserForm from './UserForm';
import './user.scss';

const User = () => {

  const initialState = {
    toggleUsername: false,
    togglePassword: false,
    toggleEmail: false
  };

  const initialStateField = {
    login: '',
    email: '',
    newPassword: '',
    confirmNewPassword: ''
  };

  const { authStatus } = useContext(authContext);
  const [toggleChange, setToggleChange] = useState(initialState);
  const [error, setError] = useState('');
  const [userData, setUserData] = useState('');
  const [fields, setFields] = useState(initialStateField);

  useEffect(() => {
    if (authStatus.token)
      ApiService.getUser(authStatus.token).then(response => { setUserData(response) });
  }, [authStatus.token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { login, email, newPassword, confirmNewPassword } = fields
    const response = await ApiService.updateUser(authStatus.token, login, email, newPassword, confirmNewPassword);
    response === 'Email or Username already exists' ? setError(response) : setError('');
  }

  const handleChange = fieldName => () => {
    setToggleChange(prev => ({ ...prev, [fieldName]: !prev[fieldName] }));
  }

  const handleFields = (e) => {
    const { name, value } = e.target;
    setFields(prev => ({ ...prev, [name]: value }));
  }

  return (
    <div className="user">
      <p className="user__mainText"> Change multiple elements at the same time by clicking on fields</p>
      <UserForm
        handleFields={handleFields}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        toggleChange={toggleChange}
        userData={userData}
        fields={fields}
        error={error}
      />
    </div>
  )
}

export default User;