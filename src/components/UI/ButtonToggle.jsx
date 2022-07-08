import React from 'react';
import ButtonSquare from "./ButtonSquare";

const ButtonToggle = ({className = '', handleFirst, handleSecond, status}) => {
  return (
    <div className={['button-toggle-container', ...className].join(' ')}>
      <ButtonSquare
        className={status ? 'button-toggle' : 'button-toggle button-toggle--inactive'}
        children={<h4>Вкл.</h4>}
        onClick={handleFirst}
      />
      <ButtonSquare
        className={status ? 'button-toggle button-toggle--inactive' : 'button-toggle'}
        children={<h4>Выкл.</h4>}
        onClick={handleSecond}
      />
    </div>
  );
};

export default ButtonToggle;