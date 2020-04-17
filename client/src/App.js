import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {useRouts} from './routes';
import {useAuth} from './hooks/auth.hook';
import {AuthContext} from './context/authContext';
import {Navbar} from './components/Navbar';
import {Loader} from './components/Loader';

function App() {
  const { login, logout, userId, token, ready } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRouts(isAuthenticated);

  if (!ready) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated
    }}>
      <Router>
        {isAuthenticated && <Navbar />}
        <div className='container'>
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  )
}

export default App;
