import { useState } from 'react';
import * as sessionActions from '../../session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../../context/Modal';
import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const handleDemoLogin = () => {
    const demoCredentials = { credential: 'Demo-lition', password: 'password' };
    setErrors({});
    dispatch(sessionActions.login(demoCredentials))
      .then(closeModal)
  };

  const isDisabled = credential.length < 4 || password.length < 6;

  return (
    <div className="login-form-container">
      <h1 className="login-form-title">Log In</h1>
      <form onSubmit={handleSubmit}>
        <label className="login-form-label">
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            className="login-form-input"
            required
          />
        </label>
        <label className="login-form-label">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-form-input"
            required
          />
        </label>
        {errors.credential && <p className="login-form-error">{errors.credential}</p>}
        <button type="submit" className="login-form-submit" disabled={isDisabled}>Log In</button>
        <button type="button" className="demo-login-form-submit" onClick={handleDemoLogin}>Log in as Demo User</button>
      </form>
    </div>
  );
}

export default LoginFormModal;
