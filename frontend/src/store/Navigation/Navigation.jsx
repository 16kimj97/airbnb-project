import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <nav className="navbar">
      <ul>
        <li>
          <NavLink to="/" className="navbar-link">Home</NavLink>
        </li>
        {isLoaded && sessionUser ? <ProfileButton /> : (
          <>
            <li>
              <NavLink to="/login" className="navbar-link">Log In</NavLink>
            </li>
            <li>
              <NavLink to="/signup" className="navbar-link">Sign Up</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
