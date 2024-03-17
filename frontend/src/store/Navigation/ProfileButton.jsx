import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaCarrot } from 'react-icons/fa';
import './ProfileButton.css';

function ProfileButton() {
  return (
    <NavLink to="/" className="profile-button-link">
      <FaCarrot className="profile-button-icon" />
    </NavLink>
  );
}

export default ProfileButton;
