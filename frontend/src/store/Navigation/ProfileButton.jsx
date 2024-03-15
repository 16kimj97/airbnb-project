import { useDispatch } from 'react-redux';
import { FaCarrot } from 'react-icons/fa';
import * as sessionActions from '../../store/session';

function ProfileButton() {
  const dispatch = useDispatch();

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  const buttonStyle = {
    marginRight: '10px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  };

  const iconStyle = {
    color: 'orange',
    fontSize: '25px',
  };

  return (
    <>
      <button style={buttonStyle} onClick={logout}>
        <FaCarrot style={iconStyle} />
      </button>
    </>
  );
}

export default ProfileButton;
