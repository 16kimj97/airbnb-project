// import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import OpenModalButton from '../components/OpenModelButton/OpenModelButton';
import LoginFormModal from '../components/LoginFormModal/LoginFormModel';
import SignupFormModal from '../components/SignupFormModal/SignupFormModal';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <ProfileButton user={sessionUser}/>
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
        ) : null}
      </div>
    </nav>
  );
}

export default Navigation;
