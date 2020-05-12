import React, { useContext } from 'react';
import { authContext } from '../../contexts/authContext'

const Home = () => {
  const { authStatus, login, logout } = useContext(authContext)
  console.log(authStatus.isLogged)
  return (
    <div>
      <p>Welcome to GoBarbra</p>
      <p>TextField</p>
      <p>Send button</p>
      <p>Download song button</p>
      {authStatus.isLogged ? <button onClick={() => logout()}>logout</button> : <button onClick={() => { login() }}>login</button>}
    </div>
  )
}

export default Home;