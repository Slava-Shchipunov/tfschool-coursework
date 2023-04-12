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

  expect(screen.getByTestId('email')).toBeInTheDocument();
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

test('should display matching error when email is invalid', async () => {
  render(
    <MemoryRouter>
      <SignInForm signIn={mockLogin} />
    </MemoryRouter>
  );

  fireEvent.input(screen.getByTestId('email'), {
    target: {
      value: 'test',
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
  expect(screen.getByTestId('email')).toHaveValue('test');
  expect(screen.getByTestId('password')).toHaveValue('password');
});

test('should display matching error when password is invalid', async () => {
  render(
    <MemoryRouter>
      <SignInForm signIn={mockLogin} />
    </MemoryRouter>
  );

  fireEvent.input(screen.getByTestId('email'), {
    target: {
      value: 'test@mail.com',
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
  expect(screen.getByTestId('email')).toHaveValue('test@mail.com');
  expect(screen.getByTestId('password')).toHaveValue('password%');
});

test('should display min length error when password is invalid', async () => {
  render(
    <MemoryRouter>
      <SignInForm signIn={mockLogin} />
    </MemoryRouter>
  );

  fireEvent.input(screen.getByTestId('email'), {
    target: {
      value: 'test@mail.com',
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
  expect(screen.getByTestId('email')).toHaveValue('test@mail.com');
  expect(screen.getByTestId('password')).toHaveValue('pass');
});

test('should not display error when value is valid', async () => {
  render(
    <MemoryRouter>
      <SignInForm signIn={mockLogin} />
    </MemoryRouter>
  );

  fireEvent.input(screen.getByTestId('email'), {
    target: {
      value: 'test@mail.com',
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
    email: 'test@mail.com',
    password: 'password',
  });

  expect(screen.getByTestId('email')).toHaveValue('');
  expect(screen.getByTestId('password')).toHaveValue('');
});
