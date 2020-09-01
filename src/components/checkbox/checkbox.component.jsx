import React from "react";

import './checkbox.styles.scss'

const Checkbox = ({ label, isSelected, onCheckboxChange }) => (
 
  <div className="form-check">

      <input 
        type="checkbox"
        name={label}
        id={label}
        value={label}
        checked={isSelected}
        onChange={onCheckboxChange}
      />
    
      <label for={label}> {label} </label>
     </div>
);

export default Checkbox;