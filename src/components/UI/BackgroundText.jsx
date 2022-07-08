import React from 'react';

const BackgroundText = ({text = '', color = 'white'}) => {
  return (
    <span className={`background-text background-text--${color}`}>
      {text}
    </span>
  );
};

export default BackgroundText;