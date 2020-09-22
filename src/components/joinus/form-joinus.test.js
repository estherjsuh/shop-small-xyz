import React from 'react';
import JoinUs from './form-joinus.component';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom'; 

describe ('JoinUs', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(
        <BrowserRouter>
            <JoinUs/>
        </BrowserRouter>
        )
    });

    it('should capture owner name correctly onChange', () => {
        const input = wrapper.find('input').at(0);
        input.simulate('change', {
                    target: { value : 'Hello World', name: 'ownerName'}
                });
        expect(input.instance().value).toEqual("Hello World")
            })



    it('should capture email correctly onChange', () => {
        const input = wrapper.find('input').at(1);
        input.simulate('change', {
                    target: { value : 'example@aol.com', name: 'email'}
                });
        expect(input.instance().value).toEqual("example@aol.com")
            })



    it('should capture shop name correctly onChange', () => {
        const input = wrapper.find('input').at(2);
        input.simulate('change', {
                   target: { value : 'shop small', name: 'shopName'}
               });
        expect(input.instance().value).toEqual("shop small")
             })


    it('should capture website correctly onChange', () => {
        const input = wrapper.find('input').at(3);
        input.simulate('change', {
                    target: { value : 'shop-small.xyz', name: 'website'}
                });
        expect(input.instance().value).toEqual("shop-small.xyz")
            })


    it('should capture nearest location correctly', () => {
        const select = wrapper.find('select').at(0);
        const option = wrapper.find('option').at(6)
        option.instance().selected = true

        expect(select.instance().value).toEqual("san-fran")
        })


    it('will not capture nearest location value outside of given options', () => {
        wrapper.find('select').at(0).instance().value ="san francisco";
        expect(wrapper.find('select').at(0).instance().value).toEqual("")
    })


});