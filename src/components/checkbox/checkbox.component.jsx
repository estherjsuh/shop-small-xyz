import React from "react";

import './checkbox.styles.scss'

const Checkbox = ({ label, isSelected, onCheckboxChange }) => (
  <div className="form-check">
    <label for={label}> {label} </label>
      <input 
        type="checkbox"
        name={label}
        id={label}
        value={label}
        checked={isSelected}
        onChange={onCheckboxChange}
        className="form-check-input"
      />

  </div>
);

export default Checkbox;