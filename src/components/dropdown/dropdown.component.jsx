import React, { useState } from "react";
import './dropdown.styles.scss'
import useClickOutside from '../../hooks/outsideAlerter'

const Menu = (props) => {

const [visible, setVisible] = useState(false)

let domNode = useClickOutside(() => {
  setVisible(false);
});

  const handleClick=() =>{
    setVisible(!visible)
  }

  return(
 
  <div ref={domNode} className='dropdown'>


    <button className='dropdownName' onClick={handleClick}>
        {props.title } &#9661;
    </button>

  <div className='dropdownContents'>
      {visible ? props.children : null}
  </div>

</div>
  )
}
export default Menu;