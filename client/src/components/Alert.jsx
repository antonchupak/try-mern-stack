import React from 'react';

const alertContainerStyles = {
  position: 'fixed',
  left: '50%',
  bottom: '10px',
  transform: 'translateX(-50%)',
  opacity: '0.7'
};

export const Alert = ({text}) => text ? (
  <div style={alertContainerStyles}>
    <div className='alert alert-secondary' role="alert">
      {text}
    </div>
  </div>
) : false;

Alert.defaultProps = {
  text: ''
};
