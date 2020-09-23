import React from 'react';
import {shallow} from 'enzyme';
import About from './about.component';


describe('<About/>', () => {
    it('renders `.heading`', () =>{
        const wrapper = shallow(<About/>);
        expect(wrapper.find('.heading'));
    });

    it('renders 4 `.statement`', () =>{
        const wrapper = shallow(<About/>);
        expect(wrapper.find('.statement').length).toEqual(4);
    });

    it('try snapshot', ()=>{
        expect(shallow(<About/>)).toMatchSnapshot();
    })

});