import React from 'react';
import {render, screen} from '@testing-library/react';
import Footer from './footer.component';
import { BrowserRouter } from 'react-router-dom';


const links = [
    {text:'CONTACT US', location:"/contact"},
];

test.each(links)(
    "Check if Footer has %s link",
    (link) => {
        render(
        <BrowserRouter>
        <Footer/>
        </BrowserRouter>);
        const linkDom = screen.getByText(link.text);
        expect(linkDom).toHaveAttribute("href", link.location);
    }
);

