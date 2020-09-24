import React from 'react'
import './side-drawer.css'
import { Link } from 'react-router-dom';

const SideDrawer = props => {

    let drawerClasses = 'side-drawer';
    if (props.show){
        drawerClasses = 'side-drawer open';
    }

    return(
    <nav className={drawerClasses}>
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

