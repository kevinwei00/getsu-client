import React from 'react';
import './Switch.css';

const Switch = ({ isOn, handleToggle, onColor, identifier }) => {
  return (
    <>
      <input
        checked={isOn}
        onChange={handleToggle}
        className="Switch__checkbox"
        name={identifier}
        id={identifier}
        type="checkbox"
      />
      <label
        style={{ background: isOn && onColor }}
        className="Switch__label"
        htmlFor={identifier}
      >
        <span className={`Switch__button`} />
      </label>
    </>
  );
};

export default Switch;
