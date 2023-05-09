import { fireEvent, render, screen } from '@testing-library/react';
import { Menu } from './Menu';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'store/store';

test('should render Menu component', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Menu />
      </MemoryRouter>
    </Provider>
  );

  expect(screen.getByTestId('burger')).toBeInTheDocument();
  expect(screen.getByTestId('menu')).toBeInTheDocument();
  expect(screen.getByTestId('search-link')).toBeInTheDocument();

  expect(
    screen.queryByTestId('header')?.classList.contains('open')
  ).toBeFalsy();

  fireEvent.click(screen.getByTestId('burger'));
  expect(screen.getByTestId('header').classList.contains('open')).toBeTruthy();

  fireEvent.click(screen.getByTestId('burger'));
  expect(
    screen.queryByTestId('header')?.classList.contains('open')
  ).toBeFalsy();
});
