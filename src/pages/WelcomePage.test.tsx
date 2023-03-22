import { render, screen } from '@testing-library/react';
import { WelcomePage } from 'pages/WelcomePage';

test('renders learn react link', () => {
  render(<WelcomePage />);
  const helloWorldElement = screen.getByText(/WelcomePage/i);
  expect(helloWorldElement).toBeInTheDocument();
});
