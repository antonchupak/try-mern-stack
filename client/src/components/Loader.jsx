import React from 'react';

export const Loader = () => {
  return (
    <div className="spinner-border text-dark" role="status" style={{display: 'flex', justifyContent: 'center'}}>
      <span className="sr-only">Loading...</span>
    </div>
  )
};
