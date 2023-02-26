import { render, screen } from '@testing-library/react';
import Account from './App';

test('renders learn react link', () => {
  render(<Account />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
