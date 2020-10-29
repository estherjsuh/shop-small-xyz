import React from 'react';
import { Link } from 'react-router-dom';

import './header.styles.scss';
import DrawerToggleButton from '../side-drawer/drawer-toggle-button';


const Header = props => (
    <header className = 'header'>
        <nav className='header_nav'>
            <div>
                <DrawerToggleButton click={props.drawerClickHandler}/>
            </div>
            <Link className='logo-container' to="/">
                 shop small
            </Link>

        <div className="spacer"/>

            <div className='options'>
                <Link className='option' to='/shop'>SHOP</Link>
                <Link className='option' to='/about'>ABOUT</Link>
                <Link className='option' to='/joinus'> <p><span role="img" aria-label="shooting-star">💫</span> JOIN US !</p></Link>
            </div>
        </nav>
    </header>
);


export default Header;
