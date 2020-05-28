import React, { useState, useContext } from 'react';
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

  const handleSubmit = (e) => {
    e.preventDefault();
    ApiService.updateUser(authStatus.token, login, email, newPassword, confirmNewPassword);
  }

  const handleChange = fieldName => () => {
    setToggleChange(prev => ({ ...prev, [fieldName]: !prev[fieldName] }));
  }

  return (
    <div className="user">
      <form onSubmit={handleSubmit}>
        <div className="user--form__field" onClick={handleChange('toggleUsername')}>Login</div>
        {
          toggleChange.toggleUsername &&
          <input type="text" placeholder="user" value={login} onChange={(e) => { setLogin(e.target.value) }} />
        }

        <div className="user--form__field" onClick={handleChange('toggleEmail')}>Email</div>
        {
          toggleChange.toggleEmail &&
          <input type="text" placeholder="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
        }

        <div className="user--form__field" onClick={handleChange('togglePassword')}>Password</div>
        {
          toggleChange.togglePassword &&
          <>
            <input type="password" placeholder="new password" value={newPassword} onChange={(e) => { setNewPassword(e.target.value) }} />
            <input type="password" placeholder="confirm new password" value={confirmNewPassword} onChange={(e) => { setConfirmNewPassword(e.target.value) }} />
          </>
        }
        <input className="user--form__submit" type="submit" value="submit" />
      </form>
    </div>
  )
}

export default User;
// Przesylac w propsach i zrobic trzy te same komponenty tak, ze sa reusable
// Jak sie chowa to powinien byc czyszczony const handleChange = fieldName => () => {setToggleChange(prev => ({ ...prev, [fieldName]: !prev[fieldName] }) setFieldName(''););}
// albo wszystko czysci i daje na false ecksDII

//moge dac pole na required i w api to toggleChange.toggleUsername powinno byc na true