import {useState, useCallback} from 'react';

let timeOut = null;
export const useAlert = () => {
  const [alert, setAlert] = useState(null);

  const showAlert = useCallback(text => {
    if (text) {
      if (alert) clearAlert();

      setAlert(text);
      hideAlert();
    }
  }, [alert]);

  const clearAlert = () => {
    setAlert(null);
    clearTimeout(timeOut);
  };

  const hideAlert = () => {
    timeOut = setTimeout(clearAlert, 5000);
  };

  return {alert, showAlert}  ;
};
