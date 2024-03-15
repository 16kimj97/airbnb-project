import { useState } from 'react';
import * as sessionActions from '../../session'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import './LoginForm.css';


function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data?.errors) setErrors(data.errors);
      }
    );
  };

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
        <button type="submit" className="login-form-submit">Log In</button>
      </form>
    </div>
  );
}


export default LoginFormPage;
