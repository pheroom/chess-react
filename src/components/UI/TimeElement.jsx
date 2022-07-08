import React from 'react';

const TimeElement = ({time, unit}) => {
  return (
    <span className={'time-element'}>
      <span className={'time-element__num'}>{time}</span>{' ' + unit}
    </span>
  );
};

export default TimeElement;