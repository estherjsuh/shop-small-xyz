import React from 'react';
import './thankyou.styles.scss';
import {ReactComponent as Check} from '../../assets/check.svg';

const ThankYou = () => {

return (
    <div className='thank-you'>

        <p className='main'>Thank You!</p>
        <Check className="check-icon"/>
        <p>Your submission has been received.</p>

    </div>
)


}

export default ThankYou;