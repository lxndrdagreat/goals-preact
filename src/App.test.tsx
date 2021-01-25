import { h } from 'preact';
import { render } from '@testing-library/preact';
import { expect } from 'chai';
import App from './App';

describe('<App>', () => {
  it('contains the header logo', () => {
    const { getByAltText } = render(<App />);
    const linkElement = getByAltText(/logo/i);
    expect(document.body.contains(linkElement));
  });
});
