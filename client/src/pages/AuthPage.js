import React, {useContext, useEffect, useState} from 'react';
import {useHttp} from '../hooks/http.hook';
import {useAlert} from '../hooks/alert.hook';
import {Alert} from '../components/Alert';
import {AuthContext} from '../context/authContext';

export const AuthPage = () => {
  const auth = useContext(AuthContext);
  const {request, loading, error, clearError} = useHttp();
  const {alert, showAlert}  = useAlert();

  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    showAlert(error);
    clearError();
  }, [error, showAlert, clearError]);

  useEffect(() => {

  });

  const onInputChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onRegisterClick = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', {...form});
      showAlert(data.message);
    } catch (e) {}
  };

  const onLoginClick = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {...form});
      auth.login(data.token, data.userId);
    } catch (e) {}
  };

  return (
    <div className='container text-center'>
      <h1>Short your link!</h1>

      <div className="card" style={{ width: "500px", margin: "0 auto" }}>
        <div className="card-body">
          <h5 className="card-title">Authorization</h5>
          <div className='text-left'>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                className="form-control"
                placeholder="Enter email"
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={onInputChange}
              />
              <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                className="form-control"
                placeholder="Password"
                type="password"
                id="password"
                name="password"
                value={form.password}
                onChange={onInputChange}
              />
            </div>
          </div>
          <button
            className="btn btn-primary"
            disabled={loading}
            onClick={onLoginClick}
          >
            Login
          </button>
          <button
            className="btn ml-3"
            disabled={loading}
            onClick={onRegisterClick}
          >
            Register
          </button>
        </div>
      </div>

      <Alert text={alert} />
    </div>
  )
};
