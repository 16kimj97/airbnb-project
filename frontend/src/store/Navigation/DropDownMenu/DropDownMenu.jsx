import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import './DropDownMenu.css';
import OpenModalButton from '../../components/OpenModelButton/OpenModelButton';
import LoginFormModal from '../../components/LoginFormModal/LoginFormModel';
import SignupFormModal from '../../components/SignupFormModal/SignupFormModal';
import { logout } from '../../session';
import { Link } from 'react-router-dom';

function DropDownMenu({ user, isOpen, toggleDropdown }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  useEffect(() => {
    setShowMenu(isOpen);
  }, [isOpen]);

  const closeMenu = () => {
    setShowMenu(false);
    toggleDropdown();
  };

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(logout());
    closeMenu();
  };

  return (
    <>
      {showMenu && (
        <ul className="profile-dropdown" ref={ulRef}>
          {user ? (
            <>
              <li>Hello, {user.firstName}</li>
              <li>{user.email}</li>
              <li>
                <button onClick={logoutHandler}>Log Out</button>
              </li>
              <li>
                <Link to="/spots/current" onClick={closeMenu}>Manage Spots</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <OpenModalButton
                  buttonText="Log In"
                  onButtonClick={closeMenu}
                  modalComponent={<LoginFormModal />}
                />
              </li>
              <li>
                <OpenModalButton
                  buttonText="Sign Up"
                  onButtonClick={closeMenu}
                  modalComponent={<SignupFormModal />}
                />
              </li>
            </>
          )}
        </ul>
      )}
      <button className="dropdown-toggle" onClick={toggleDropdown}>
        <FaUserCircle />
      </button>
    </>
  );
}

export default DropDownMenu;
