import React, { useState, useContext, useEffect } from 'react';
import { authContext } from '../../contexts/authContext';
import ApiService from '../../_services/apiService';
import './user.scss';

const User = () => {
  const initialState = {
    toggleUsername: false,
    togglePassword: false,
    toggleEmail: false
  };

  const { authStatus } = useContext(authContext);
  const [toggleChange, setToggleChange] = useState(initialState);
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState('');

  const [userData, setUserData] = useState('');

  useEffect(() => {
    if (authStatus.token)
      ApiService.getUser(authStatus.token).then(response => { setUserData(response) });
  }, [authStatus.token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await ApiService.updateUser(authStatus.token, login, email, newPassword, confirmNewPassword);
    response === 'Email or Username already exists' ? setError(response) : setError('');
  }

  const handleChange = fieldName => () => {
    setToggleChange(prev => ({ ...prev, [fieldName]: !prev[fieldName] }));
  }

  return (
    <div className="user">
      <p className="user__mainText"> Change multiple elements at the same time by clicking on fields</p>
      <form className="user__form" onSubmit={handleSubmit}>
        <div className="user__form--field" onClick={handleChange('toggleUsername')}>Login: {userData.login}</div>
        {
          toggleChange.toggleUsername &&
          <input className="user__form--inputField" type="text" placeholder="user" value={login} minLength="9" onChange={(e) => { setLogin(e.target.value) }} />
        }

        <div className="user__form--field" onClick={handleChange('toggleEmail')}>Email: {userData.email}</div>
        {
          toggleChange.toggleEmail &&
          <input className="user__form--inputField" type="text" placeholder="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
        }

        <div className="user__form--field" onClick={handleChange('togglePassword')}>Password</div>
        {
          toggleChange.togglePassword &&
          <>
            <input className="user__form--inputField" type="password" placeholder="new password" minLength="9" value={newPassword} onChange={(e) => { setNewPassword(e.target.value) }} />
            <input className="user__form--inputField" type="password" placeholder="confirm new password" minLength="9" value={confirmNewPassword} onChange={(e) => { setConfirmNewPassword(e.target.value) }} />
          </>
        }
        {error && <p>{error}</p>}
        <input className="user__form--submit" type="submit" value="submit" />
      </form>
    </div>
  )
}

export default User;