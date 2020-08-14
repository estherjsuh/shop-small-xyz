import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders join us', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText('Have a shop? Join Us!');
  expect(linkElement).toBeInTheDocument();
});
