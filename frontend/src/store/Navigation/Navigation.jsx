import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import OpenModalButton from '../components/OpenModelButton/OpenModelButton';
import LoginFormModal from '../components/LoginFormModal/LoginFormModel';
import SignupFormModal from '../components/SignupFormModal/SignupFormModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCarrot } from '@fortawesome/free-solid-svg-icons';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <NavLink to="/" className="navbar-link">
          <FontAwesomeIcon icon={faCarrot} className="icon" />
        </NavLink>
      </div>
      <div className="navbar-right">
        {isLoaded && !sessionUser ? (
          <>
            <OpenModalButton
              buttonText="Log In"
              modalComponent={<LoginFormModal />}
              className="navbar-link login-button"
            />
            <OpenModalButton
              buttonText="Sign Up"
              modalComponent={<SignupFormModal />}
              className="navbar-link signup-button"
            />
          </>
        ) : (
          <ProfileButton user={sessionUser} />
        )}
      </div>
    </nav>
  );
}

export default Navigation;
