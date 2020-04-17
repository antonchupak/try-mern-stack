import React, {useContext} from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import {AuthContext} from '../context/authContext';

export const Navbar = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);

  const onLogOutClick = e => {
    e.preventDefault();
    auth.logout();
    history.push('/');
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark" style={{display: 'flex', justifyContent: 'space-between'}}>
      <span className="navbar-brand">Short links</span>

      <ul className="navbar-nav">
        <li className="nav-item"><NavLink className="nav-link" to='/create'>Create</NavLink></li>
        <li className="nav-item"><NavLink className="nav-link" to='/links'>Links</NavLink></li>
        <li className="nav-item"><a className="nav-link" href='/' onClick={onLogOutClick}>Log out</a></li>
      </ul>
    </nav>
  );
};
