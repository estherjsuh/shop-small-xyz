import React from 'react'
import { Link } from 'react-router-dom';
import './footer.styles.scss'

const Footer = () => {

return (
    <footer className="footer">
        <Link className="footer-item" to='/contact'> CONTACT US</Link>

    </footer>
)

}

export default Footer;