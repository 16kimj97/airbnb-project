import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import OpenModalButton from '../components/OpenModelButton/OpenModelButton';
import LoginFormModal from '../components/LoginFormModal/LoginFormModel';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  const sessionLinks = sessionUser ? (
    <li>
      <ProfileButton user={sessionUser} />
    </li>
  ) : (
    <>
      <li>
        <OpenModalButton
          buttonText="Log In"
          modalComponent={<LoginFormModal />}
          className="navbar-link" // Added className
        />
      </li>
      <li>
        <NavLink to="/signup" className="navbar-link">Sign Up</NavLink>
      </li>
    </>
  );

  return (
    <nav className="navbar"> {/* Added navbar class */}
      <ul>
        <li>
          <NavLink to="/" className="navbar-link">Home</NavLink>
        </li>
        {isLoaded && sessionLinks}
      </ul>
    </nav>
  );
}

export default Navigation;
