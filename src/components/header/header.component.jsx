import React from 'react';
import { Link } from 'react-router-dom';

import './header.styles.scss';


const Header = () => (
    <div className = 'header'>
    {/* <Link className='logo-container' to="/">
        <Logo className='logo'/>
    </Link> */}

    <div className='options'>
        <Link className='option' to='/shop'>SHOP</Link>

        <Link className='option' to='/about'>ABOUT</Link>

        <Link className='option' to='/joinus'>💫 JOIN US !</Link>

    </div>

    </div>
);


export default Header;
