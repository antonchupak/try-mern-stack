import {useState, useCallback} from 'react';

let timeOut = null;
export const useAlert = () => {
  const [alert, setAlert] = useState(null);

  const hideAlert = useCallback(() => {
    timeOut = setTimeout(clearAlert, 5000);
  }, []);

  const clearAlert = () => {
    setAlert(null);
    clearTimeout(timeOut);
  };

  const showAlert = useCallback(text => {
    if (text) {
      if (alert) clearAlert();

      setAlert(text);
      hideAlert();
    }
  }, [alert, hideAlert]);


  return {alert, showAlert}  ;
};
