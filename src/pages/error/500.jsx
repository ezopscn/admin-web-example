import React from 'react';
import ServerErrorImage from '../../assets/images/error/500.svg';

const ServerError = () => {
  return (
    <>
      <div className="error-code">500</div>
      <img src={ServerErrorImage} alt="" draggable="false" />
    </>
  );
};

export default ServerError;
