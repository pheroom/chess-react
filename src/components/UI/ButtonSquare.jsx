import React from 'react';

const ButtonSquare = ({children, className = '', ...props}) => {
  return (
    <button className={['button-square', className].join(' ')} {...props}>
      {children}
    </button>
  );
};

export default ButtonSquare;