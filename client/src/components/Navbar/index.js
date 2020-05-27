import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  LOGOUT
} from '../../constants';
import { authContext } from '../../contexts/authContext';

const Navbar = () => {
  const { authStatus, dispatch } = useContext(authContext);

  const logout = () => {
    dispatch({ type: LOGOUT })
    window.location.reload();
  }

  return (
    <div>
      <ul>
        <Link to={'/'}><li>Home</li></Link>
        {authStatus.isLogged ?
          (
            <>
              <Link to={'/user'}><li>User</li></Link>
              <li onClick={logout}>Logout</li>
            </>
          ) : (
            <>
              <Link to={'/register'}><li>Register</li></Link>
              <Link to={'/login'}><li>Login</li></Link>
            </>
          )
        }
      </ul>
    </div>
  )
};

export default Navbar;
//register moze znikac jak ktos zalogowany