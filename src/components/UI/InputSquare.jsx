import React from 'react';

const InputSquare = ({className = '', ...props}) => {
  return (
    <input className={['input-square', ...className].join(' ')} {...props}/>
  );
};

export default InputSquare;