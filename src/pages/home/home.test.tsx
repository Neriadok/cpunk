import { render, screen } from '@testing-library/react';
import Home from './home';

test('renders learn react link', () => {
  render(<Home />);
  const linkElement = screen.getByText(/Click to do stuff/i);
  expect(linkElement).toBeInTheDocument();
});
