import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { SignUpForm } from './SignUpForm';
import { TUserCreate } from 'types/types';
import { MemoryRouter } from 'react-router-dom';

const mockLogin: (data: TUserCreate) => Promise<TUserCreate> = jest.fn(
  (data) => {
    return Promise.resolve(data);
  }
);

test('should render all fields', () => {
  render(
    <MemoryRouter>
      <SignUpForm signUp={mockLogin} />
    </MemoryRouter>
  );

  expect(screen.getByTestId('login')).toBeInTheDocument();
  expect(screen.getByTestId('email')).toBeInTheDocument();
  expect(screen.getByTestId('password')).toBeInTheDocument();
});

test('should display required error when all values is invalid', async () => {
  render(
    <MemoryRouter>
      <SignUpForm signUp={mockLogin} />
    </MemoryRouter>
  );

  fireEvent.submit(screen.getByTestId('button'));

  expect(await screen.findAllByTestId('alert')).toHaveLength(3);
  expect(mockLogin).not.toBeCalled();
});

test('should display min length error when login is invalid', async () => {
  render(
    <MemoryRouter>
      <SignUpForm signUp={mockLogin} />
    </MemoryRouter>
  );

  fireEvent.input(screen.getByTestId('login'), {
    target: {
      value: 'log',
    },
  });

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

  expect(await screen.findAllByTestId('alert')).toHaveLength(1);
  expect(mockLogin).not.toBeCalled();
  expect(screen.getByTestId('login')).toHaveValue('log');
  expect(screen.getByTestId('email')).toHaveValue('test@mail.com');
  expect(screen.getByTestId('password')).toHaveValue('password');
});

test('should display matching error when login is invalid', async () => {
  render(
    <MemoryRouter>
      <SignUpForm signUp={mockLogin} />
    </MemoryRouter>
  );

  fireEvent.input(screen.getByTestId('login'), {
    target: {
      value: 'login%',
    },
  });

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

  expect(await screen.findAllByTestId('alert')).toHaveLength(1);
  expect(mockLogin).not.toBeCalled();
  expect(screen.getByTestId('login')).toHaveValue('login%');
  expect(screen.getByTestId('email')).toHaveValue('test@mail.com');
  expect(screen.getByTestId('password')).toHaveValue('password');
});

test('should display matching error when email is invalid', async () => {
  render(
    <MemoryRouter>
      <SignUpForm signUp={mockLogin} />
    </MemoryRouter>
  );

  fireEvent.input(screen.getByTestId('login'), {
    target: {
      value: 'login',
    },
  });

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
  expect(screen.getByTestId('login')).toHaveValue('login');
  expect(screen.getByTestId('email')).toHaveValue('test');
  expect(screen.getByTestId('password')).toHaveValue('password');
});

test('should display min length error when password is invalid', async () => {
  render(
    <MemoryRouter>
      <SignUpForm signUp={mockLogin} />
    </MemoryRouter>
  );

  fireEvent.input(screen.getByTestId('login'), {
    target: {
      value: 'login',
    },
  });

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
  expect(screen.getByTestId('login')).toHaveValue('login');
  expect(screen.getByTestId('email')).toHaveValue('test@mail.com');
  expect(screen.getByTestId('password')).toHaveValue('pass');
});

test('should display matching error when password is invalid', async () => {
  render(
    <MemoryRouter>
      <SignUpForm signUp={mockLogin} />
    </MemoryRouter>
  );

  fireEvent.input(screen.getByTestId('login'), {
    target: {
      value: 'login',
    },
  });

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
  expect(screen.getByTestId('login')).toHaveValue('login');
  expect(screen.getByTestId('email')).toHaveValue('test@mail.com');
  expect(screen.getByTestId('password')).toHaveValue('password%');
});

test('should not display error when value is valid', async () => {
  render(
    <MemoryRouter>
      <SignUpForm signUp={mockLogin} />
    </MemoryRouter>
  );

  fireEvent.input(screen.getByTestId('login'), {
    target: {
      value: 'login',
    },
  });

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
    login: 'login',
    email: 'test@mail.com',
    password: 'password',
  });

  expect(screen.getByTestId('login')).toHaveValue('');
  expect(screen.getByTestId('email')).toHaveValue('');
  expect(screen.getByTestId('password')).toHaveValue('');
});
