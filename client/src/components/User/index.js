import React, { useState } from 'react';
import axios from 'axios';
// import ChangeField from './changeField';

const User = () => {
  const initialState = {
    toggleUsername: false,
    togglePassword: false,
    toggleEmail: false
  }

  const [toggleChange, setToggleChange] = useState(initialState);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    let token = localStorage.getItem('token');
    if (token) token = token.replace(/^"(.*)"$/, '$1');

    axios.put('http://localhost:2137/user/update', {
      ...(username ? { username: username } : {}),
      ...(email ? { email: email } : {}),
      ...(password ? { password: password } : {})
    }, {
      headers: {
        'Authorization': "Bearer " + token
      }
    }).then(response => {
      console.log('put was send!');
    }).catch(error => {
      console.log(error);
    })
  }

  const handleChange = fieldName => () => {
    setToggleChange(prev => ({ ...prev, [fieldName]: !prev[fieldName] }));
  }

  return (
    <div>

      <div onClick={handleChange('toggleUsername')}>Username</div>
      {
        toggleChange.toggleUsername &&
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="user" value={username} onChange={(e) => { setUsername(e.target.value) }} />
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
          <input type="text" placeholder="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
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