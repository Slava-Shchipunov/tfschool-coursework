import classNames from 'classnames/bind';
import { TUserAuth } from 'types/types';
import styles from '../style.module.css';
import { useState } from 'react';
import { Input } from '../Input';
import { validateInput } from '../validateInput';
import { Link } from 'react-router-dom';

const className = classNames.bind(styles);

type TSignInProps = {
  signIn: (data: TUserAuth) => Promise<TUserAuth>;
};

export const SignInForm = (props: TSignInProps) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const [loginError, setLoginError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const states = {
    login: setLogin,
    password: setPassword,
  };

  const errors = {
    login: setLoginError,
    password: setPasswordError,
  };

  const patterns = {
    Login: /^[a-zA-Z0-9]+$/,
    Password: /^[a-zA-Z0-9]+$/,
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // TODO в дальнейшем отправлять данные на сервер для авторизации пользователя
    event.preventDefault();

    if (!login || !password) {
      !login && setLoginError('Login is required');
      !password && setPasswordError('Password is required');
      return;
    }

    if (loginError || passwordError) {
      return;
    }

    const data: TUserAuth = {
      login: login,
      password: password,
    };

    setLogin('');
    setPassword('');

    await props.signIn(data);
  };

  const validate = validateInput(states, errors, patterns);

  return (
    <form className={className('form')} onSubmit={handleSubmit}>
      <Input
        type={'Login'}
        minLength={4}
        value={login}
        error={loginError}
        validateInput={validate}
      />
      <Input
        type={'Password'}
        minLength={6}
        value={password}
        error={passwordError}
        validateInput={validate}
      />
      <button
        className={className('button')}
        type="submit"
        data-testid="button"
      >
        Sign in
      </button>
      <span className={className('link-text')}>
        Don&#39;t have an account?{' '}
        <Link to="/sign-up" className={className('link')}>
          Sign up
        </Link>
      </span>
    </form>
  );
};
