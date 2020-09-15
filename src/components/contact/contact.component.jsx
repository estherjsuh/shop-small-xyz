import React from 'react';

import './contact.styles.scss';
import {ReactComponent as Email} from '../../assets/email.svg';

const Contact = () =>{

    return (
        <div className ='contact'>
            <Email className='email-icon'/>
        <p>HELLO@SHOP-SMALL.XYZ</p>
        </div>
    )

}

export default Contact;