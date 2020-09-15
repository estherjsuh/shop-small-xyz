import React from 'react'
import './side-drawer.css'

const SideDrawer = props => {

    let drawerClasses = 'side-drawer';
    if (props.show){
        drawerClasses = 'side-drawer open';
    }

    return(
    <nav className={drawerClasses}>
        <ul className="side-nav">
            <li className="side-items"><a href="/shop">SHOP</a></li>
            <li className="side-items"><a href="/about">ABOUT</a></li>
            <li className="side-items"><a href="/joinus">💫 JOIN US !</a></li>
            <li className="side-items"><a href="/">CONTACT US</a></li>
        </ul>
    </nav>
    );
};

export default SideDrawer;

