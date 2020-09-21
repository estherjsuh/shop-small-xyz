import React from 'react';
import {shallow} from 'enzyme';
import Backdrop from './backdrop.component';

describe('<Backdrop/>', () => {
    it('renders `.backdrop`', () =>{
        const wrapper = shallow(<Backdrop/>);
        expect(wrapper.find('.backdrop'));
    });

});