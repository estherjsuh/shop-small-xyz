import React from 'react';

import './contact.styles.scss';
import {ReactComponent as Email} from '../../assets/email.svg';

class Contact extends React.Component{
    constructor(props){
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick(){
        window.location.assign("mailto:hello@shop-small.xyz");
    }

    render(){
    return (
        <div className ='contact' onClick={this.onClick} >
            <Email className='email-icon'/>
            <p>HELLO@SHOP-SMALL.XYZ</p>
        </div>
        )
    }
}

export default Contact;