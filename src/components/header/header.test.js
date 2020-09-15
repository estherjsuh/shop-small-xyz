import React from 'react';
import {render, screen } from '@testing-library/react';
import Header from './header.component';
import { BrowserRouter } from 'react-router-dom';


const links = [
    {text:'SHOP', location:"/shop"},
    {text:'ABOUT', location:"/about"},
    {text: '💫 JOIN US !', location:"/joinus"}
];

test.each(links)(
    "Check if Header has %s link",
    (link) => {
        render(
        <BrowserRouter>
        <Header/>
        </BrowserRouter>);
        const linkDom = screen.getByText(link.text);
        expect(linkDom).toHaveAttribute("href", link.location);
    }
);