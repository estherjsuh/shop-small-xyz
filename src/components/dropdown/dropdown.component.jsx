import React, { useState, useEffect, useRef } from "react";
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

  useEffect(() => {
   let handler = (event) => {
      if (!domNode.current.contains(event.target)){
      setVisible(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    }
  });

  return(
 
  <div ref={domNode} className='dropdown'>


    <button className='dropdownName' onClick={handleClick}
    // onClick={()=> setOpen(!open)}
      >
        {props.title } &#9661;

    </button>

  <div className='dropdownContents'>

    
    {visible ? props.children  : null}
    
  </div>
</div>
  )

}

export default Menu;