import React from 'react';

const BackgroundText = ({text = '', bgColor = 'white'}) => {
  return (
    <span className={`background-text background-text--${bgColor}`}>
      {text}
    </span>
  );
};

export default BackgroundText;