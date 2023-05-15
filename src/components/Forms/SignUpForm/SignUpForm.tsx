import classNames from 'classnames/bind';
import { TUserCreate } from 'types/types';
import styles from '../style.module.css';
import { Input } from '../Input';
import { useState } from 'react';
import { validateInput } from '../validateInput';
import { Link } from 'react-router-dom';
import { PathRoutes } from 'router/router';

const className = classNames.bind(styles);

type TSignUpProps = {
  signUp: (data: TUserCreate) => Promise<void>;
};

export const SignUpForm = (props: TSignUpProps) => {
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loginError, setLoginError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const states = {
    login: setLogin,
    email: setEmail,
    password: setPassword,
  };

  const errors = {
    login: setLoginError,
    email: setEmailError,
    password: setPasswordError,
  };

  const patterns = {
    Login: /^[a-zA-Z0-9]+$/,
    Email: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
    Password: /^[a-zA-Z0-9]+$/,
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!login || !email || !password) {
      !login && setLoginError('Login is required');
      !email && setEmailError('Email is required');
      !password && setPasswordError('Password is required');
      return;
    }

    if (loginError || emailError || passwordError) {
      return;
    }

    const data: TUserCreate = {
      email: email,
      login: login,
      password: password,
    };

    setLogin('');
    setEmail('');
    setPassword('');

    await props.signUp(data);
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
        type={'Email'}
        value={email}
        error={emailError}
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
        Sign up
      </button>
      <span className={className('link-text')}>
        Already have an account?{' '}
        <Link to={PathRoutes.signin} className={className('link')}>
          Sign in
        </Link>
      </span>
    </form>
  );
};
