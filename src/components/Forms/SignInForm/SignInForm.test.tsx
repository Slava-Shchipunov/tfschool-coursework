import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { SignInForm } from './SignInForm';
import { TUserAuth } from 'types/types';
import { MemoryRouter } from 'react-router-dom';

const mockLogin: (data: TUserAuth) => Promise<TUserAuth> = jest.fn((data) => {
  return Promise.resolve(data);
});

test('should render all fields', () => {
  render(
    <MemoryRouter>
      <SignInForm signIn={mockLogin} />
    </MemoryRouter>
  );

  expect(screen.getByTestId('login')).toBeInTheDocument();
  expect(screen.getByTestId('password')).toBeInTheDocument();
});

test('should display required error when all values is invalid', async () => {
  render(
    <MemoryRouter>
      <SignInForm signIn={mockLogin} />
    </MemoryRouter>
  );

  fireEvent.submit(screen.getByTestId('button'));

  expect(await screen.findAllByTestId('alert')).toHaveLength(2);
  expect(mockLogin).not.toBeCalled();
});

test('should display min length error when login is invalid', async () => {
  render(
    <MemoryRouter>
      <SignInForm signIn={mockLogin} />
    </MemoryRouter>
  );

  fireEvent.input(screen.getByTestId('login'), {
    target: {
      value: 'log',
    },
  });

  fireEvent.input(screen.getByTestId('password'), {
    target: {
      value: 'password',
    },
  });

  fireEvent.submit(screen.getByTestId('button'));

  expect(await screen.findAllByTestId('alert')).toHaveLength(1);
  expect(mockLogin).not.toBeCalled();
  expect(screen.getByTestId('login')).toHaveValue('log');
  expect(screen.getByTestId('password')).toHaveValue('password');
});

test('should display matching error when login is invalid', async () => {
  render(
    <MemoryRouter>
      <SignInForm signIn={mockLogin} />
    </MemoryRouter>
  );

  fireEvent.input(screen.getByTestId('login'), {
    target: {
      value: 'login%',
    },
  });

  fireEvent.input(screen.getByTestId('password'), {
    target: {
      value: 'password',
    },
  });

  fireEvent.submit(screen.getByTestId('button'));

  expect(await screen.findAllByTestId('alert')).toHaveLength(1);
  expect(mockLogin).not.toBeCalled();
  expect(screen.getByTestId('login')).toHaveValue('login%');
  expect(screen.getByTestId('password')).toHaveValue('password');
});

test('should display matching error when password is invalid', async () => {
  render(
    <MemoryRouter>
      <SignInForm signIn={mockLogin} />
    </MemoryRouter>
  );

  fireEvent.input(screen.getByTestId('login'), {
    target: {
      value: 'login',
    },
  });

  fireEvent.input(screen.getByTestId('password'), {
    target: {
      value: 'password%',
    },
  });

  fireEvent.submit(screen.getByTestId('button'));

  expect(await screen.findAllByTestId('alert')).toHaveLength(1);
  expect(mockLogin).not.toBeCalled();
  expect(screen.getByTestId('login')).toHaveValue('login');
  expect(screen.getByTestId('password')).toHaveValue('password%');
});

test('should display min length error when password is invalid', async () => {
  render(
    <MemoryRouter>
      <SignInForm signIn={mockLogin} />
    </MemoryRouter>
  );

  fireEvent.input(screen.getByTestId('login'), {
    target: {
      value: 'login',
    },
  });

  fireEvent.input(screen.getByTestId('password'), {
    target: {
      value: 'pass',
    },
  });

  fireEvent.submit(screen.getByTestId('button'));

  expect(await screen.findAllByTestId('alert')).toHaveLength(1);
  expect(mockLogin).not.toBeCalled();
  expect(screen.getByTestId('login')).toHaveValue('login');
  expect(screen.getByTestId('password')).toHaveValue('pass');
});

test('should not display error when value is valid', async () => {
  render(
    <MemoryRouter>
      <SignInForm signIn={mockLogin} />
    </MemoryRouter>
  );

  fireEvent.input(screen.getByTestId('login'), {
    target: {
      value: 'login',
    },
  });

  fireEvent.input(screen.getByTestId('password'), {
    target: {
      value: 'password',
    },
  });

  fireEvent.submit(screen.getByTestId('button'));

  await waitFor(() => expect(screen.queryAllByTestId('alert')).toHaveLength(0));
  expect(mockLogin).toBeCalledWith({
    login: 'login',
    password: 'password',
  });

  expect(screen.getByTestId('login')).toHaveValue('');
  expect(screen.getByTestId('password')).toHaveValue('');
});
