import {useState, useCallback, useEffect} from 'react';

const LOCAL_STORAGE_NAME = 'userData';

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [ready, setReady] = useState(false);
  const [userId, setUserId] = useState(null);

  const login = useCallback((jwtToken, id) => {
    setToken(jwtToken);
    setUserId(id);

    localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify({
      userId: id, token: jwtToken
    }))
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);

    localStorage.removeItem(LOCAL_STORAGE_NAME)
  }, []);


  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME));

    if (data && data.token) {
      login(data.token, data.userId);
    }

    setReady(true)
  }, [login]);

  return { login, logout, token, userId, ready };
};
