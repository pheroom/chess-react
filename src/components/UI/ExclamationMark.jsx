import React from 'react';

const ExclamationMark = ({tagName='div', text='текст'}) => {
  const ExclamationMark = React.createElement(
    tagName,
    {className: 'exclamation-mark'},
    '!'
  )

  const Text = React.createElement(
    tagName,
    null,
    text
  )

  return (
    <div className="text-with-exclamation-mark">
      {Text}
      {ExclamationMark}
    </div>
  );
};

export default ExclamationMark;