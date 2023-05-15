import classNames from 'classnames/bind';
import { TUserAuth } from 'types/types';
import styles from '../style.module.css';
import { useState } from 'react';
import { Input } from '../Input';
import { validateInput } from '../validateInput';
import { Link } from 'react-router-dom';
import { PathRoutes } from 'router/router';

const className = classNames.bind(styles);

type TSignInProps = {
  signIn: (data: TUserAuth) => Promise<void>;
};

export const SignInForm = (props: TSignInProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const states = {
    email: setEmail,
    password: setPassword,
  };

  const errors = {
    email: setEmailError,
    password: setPasswordError,
  };

  const patterns = {
    Email: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
    Password: /^[a-zA-Z0-9]+$/,
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || !password) {
      !email && setEmailError('Email is required');
      !password && setPasswordError('Password is required');
      return;
    }

    if (emailError || passwordError) {
      return;
    }

    const data: TUserAuth = {
      email: email,
      password: password,
    };

    setEmail('');
    setPassword('');

    await props.signIn(data);
  };

  const validate = validateInput(states, errors, patterns);

  return (
    <form className={className('form')} onSubmit={handleSubmit}>
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
        Sign in
      </button>
      <span className={className('link-text')}>
        Don&#39;t have an account?{' '}
        <Link to={PathRoutes.signup} className={className('link')}>
          Sign up
        </Link>
      </span>
    </form>
  );
};
