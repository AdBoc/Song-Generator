import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
      <ul>
        <Link to={'/login'}><li>Login</li></Link>
        <Link to={'/register'}><li>Register</li></Link>
        <li>Logout</li>
        <Link to={'/user'}><li>User</li></Link>
        <Link to={'/'}><li>Home</li></Link>
      </ul>
    </div>
  )
};

export default Navbar;
