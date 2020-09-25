import React from 'react'
import './side-drawer.css'
import { Link } from 'react-router-dom';

const SideDrawer = props => {


    return(
    
    //   <nav className={drawerClasses}>
    <nav className={props.show ? 'side-drawer open' : 'side-drawer'}>
        <div className="side-nav">

            <Link className="side-items" to="/shop">SHOP</Link>
            <Link className="side-items" to="/about">ABOUT</Link>
            <Link className="side-items" to="/joinus">💫 JOIN US !</Link>
            <Link className="side-items" to="/contact">CONTACT US</Link>
        </div>
    </nav>
    );
};

export default SideDrawer;

