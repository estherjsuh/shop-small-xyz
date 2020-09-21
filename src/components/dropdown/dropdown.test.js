import React from 'react';
import Dropdown from './dropdown.component';
import { mount } from 'enzyme';

describe('Dropdown', () =>{
    const wrapper = mount(<Dropdown title="testing"> 
                            <h1>hello</h1> 
                            </Dropdown>);

    it('renders "testing" as dropdown name', () => {
        expect(wrapper.find('.dropdownName').text()).toContain('testing');
        });

    it('does not render children', () => {
        expect(wrapper.find('.dropdownContents').text()).toEqual("");
    });

    it('shows props.children when dropdown gets clicked', () => {
        wrapper.find('.dropdownName').simulate('click');
        expect(wrapper.find('.dropdownContents').text()).toEqual("hello");
    });

});
