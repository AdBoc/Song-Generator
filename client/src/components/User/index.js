import React, { useState, useContext } from 'react';
import { authContext } from '../../contexts/authContext';
import ApiService from '../../_services/apiService';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    ApiService.updateUser(authStatus.token, login, email, newPassword, confirmNewPassword);
  }

  const handleChange = fieldName => () => {
    setToggleChange(prev => ({ ...prev, [fieldName]: !prev[fieldName] }));
  }

  return (
    <div>

      <div onClick={handleChange('toggleUsername')}>Login</div>
      {
        toggleChange.toggleUsername &&
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="user" value={login} onChange={(e) => { setLogin(e.target.value) }} />
          <input type="submit" value="submit" />
        </form>
      }

      <div onClick={handleChange('toggleEmail')}>Email</div>
      {
        toggleChange.toggleEmail &&
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
          <input type="submit" value="submit" />
        </form>
      }

      <div onClick={handleChange('togglePassword')}>Password</div>
      {
        toggleChange.togglePassword &&
        <form onSubmit={handleSubmit}>
          <input type="password" placeholder="new password" value={newPassword} onChange={(e) => { setNewPassword(e.target.value) }} />
          <input type="submit" value="submit" />
          <input type="password" placeholder="confirm new password" value={confirmNewPassword} onChange={(e) => { setConfirmNewPassword(e.target.value) }} />
          <input type="submit" value="submit" />
        </form>
      }

    </div>
  )
}

export default User;
// Przesylac w propsach i zrobic trzy te same komponenty tak, ze sa reusable
// Jak sie chowa to powinien byc czyszczony const handleChange = fieldName => () => {setToggleChange(prev => ({ ...prev, [fieldName]: !prev[fieldName] }) setFieldName(''););}
// albo wszystko czysci i daje na false ecksDII

//moge dac pole na required i w api to toggleChange.toggleUsername powinno byc na true