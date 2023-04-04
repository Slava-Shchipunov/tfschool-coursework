import { render, screen } from '@testing-library/react';
import { WelcomePage } from 'pages/WelcomePage';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'store/store';

test('renders WelcomePage', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <WelcomePage />
      </MemoryRouter>
    </Provider>
  );
  const WelcomePageElement = screen.getByText(/You are on the WelcomePage/i);
  expect(WelcomePageElement).toBeInTheDocument();
});
