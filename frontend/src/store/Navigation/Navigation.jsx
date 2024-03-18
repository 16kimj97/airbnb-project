import { useState } from 'react';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import OpenModalButton from '../OpenModelButton/OpenModelButton';
import LoginFormModal from '../LoginFormModal/LoginFormModel';
import SignupFormModal from '../SignupFormModal/SignupFormModal';
import DropdownMenu from './DropDownMenu/DropDownMenu';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <ProfileButton user={sessionUser} />
      </div>
      <div className="navbar-right">
        <DropdownMenu user={sessionUser} isOpen={isDropdownOpen} toggleDropdown={toggleDropdown}>
          {isLoaded && !sessionUser && (
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
          )}
        </DropdownMenu>
      </div>
    </nav>
  );
}

export default Navigation;
