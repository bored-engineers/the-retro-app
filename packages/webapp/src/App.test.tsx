import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

jest.mock('./Components/Client/LandingPage', () => {
  return () => {
    return <div data-testid='mockLandingPage'>
      mocked landing page
    </div>
  }
});

describe('App', () => {
  it('renders learn react link', () => {
    const { getByTestId } = render(<App />);

    expect(getByTestId('mockLandingPage')).toBeInTheDocument();
  });
});
