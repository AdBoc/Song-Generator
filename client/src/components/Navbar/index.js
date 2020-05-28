import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  LOGOUT
} from '../../constants';
import { authContext } from '../../contexts/authContext';
import './navbar.scss';

const Navbar = () => {
  const { authStatus, dispatch } = useContext(authContext);

  const logout = () => {
    dispatch({ type: LOGOUT })
    window.location.reload();
  }

  return (
    <div className="navbar">
      <ul className="navbar--flexbox">
        <Link to={'/'}><li className="navbar--item">Home</li></Link>
        {authStatus.isLogged ?
          (
            <>
              <Link to={'/user'}><li className="navbar--item">User</li></Link>
              <li className="navbar--item" onClick={logout}>Logout</li>
            </>
          ) : (
            <Link to={'/login'}><li className="navbar--item" >Login</li></Link>
          )
        }
      </ul>
    </div >
  )
};

export default Navbar;
//register moze znikac jak ktos zalogowany