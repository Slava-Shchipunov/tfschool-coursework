import { render, screen } from '@testing-library/react';
import { WelcomePage } from 'pages/WelcomePage';
import { MemoryRouter } from 'react-router-dom';

test('renders WelcomePage', () => {
  render(
    <MemoryRouter>
      <WelcomePage />
    </MemoryRouter>
  );
  const WelcomePageElement = screen.getByText(/You are on the WelcomePage/i);
  expect(WelcomePageElement).toBeInTheDocument();
});
