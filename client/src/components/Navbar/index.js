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
  }

  return (
    <div className="navbar">
      <ul className="navbar__flex">
        <Link className="navbar__flex__navbarFlex" to={'/'}><li className="navbar__flex--item">Home</li></Link>
        {authStatus.isLogged ?
          (
            <>
              <Link className="navbar__flex__navbarFlex" to={'/user'}><li className="navbar__flex--item">User</li></Link>
              <div className="navbar__flex__navbarFlex"><li className="navbar__flex--item" onClick={logout}>Logout</li></div>
            </>
          ) : (
            <>
              <Link className="navbar__flex__navbarFlex" to={'/register'}><li className="navbar__flex--item">Register</li></Link>
              <Link className="navbar__flex__navbarFlex" to={'/login'}><li className="navbar__flex--item">Login</li></Link>
            </>
          )
        }
      </ul>
    </div >
  )
};

export default Navbar;