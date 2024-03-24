import { NavLink } from 'react-router-dom';
import { FaShip } from 'react-icons/fa';
import './ProfileButton.css';

function ProfileButton() {
  return (
    <NavLink to="/" className="profile-button-link">
      <FaShip className="profile-button-icon" /> OpBnB
    </NavLink>
  );
}

export default ProfileButton;
