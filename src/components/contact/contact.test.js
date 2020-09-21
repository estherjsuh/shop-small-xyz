import React from 'react';
import {shallow} from 'enzyme';
import Contact from './contact.component';


describe('<Contact/>', () => {


    it('try snapshot', ()=>{
        expect(shallow(<Contact/>)).toMatchSnapshot();
    })

});