import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import { TUserAuth } from 'types/types';
import styles from '../style.module.css';

const className = classNames.bind(styles);

const defaultValuesForm: TUserAuth = {
  login: '',
  password: '',
};

type TSignInProps = {
  signIn: (data: TUserAuth) => Promise<TUserAuth>;
};

export const SignInForm = (props: TSignInProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TUserAuth>({
    defaultValues: defaultValuesForm,
    mode: 'all',
  });

  const onSubmit = async (data: TUserAuth) => {
    // TODO в дальнейшем отправлять данные на сервер для авторизации пользователя

    await props.signIn(data);
    reset();
  };

  return (
    <form className={className('form')} onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="login">Login</label>
      <input
        className={className('input')}
        id="login"
        type="text"
        placeholder="Login"
        autoComplete="off"
        data-testid="login"
        {...register('login', {
          required: 'Login is required',
          minLength: {
            value: 4,
            message: 'Login should be at-least 4 characters',
          },
          pattern: {
            value: /^[a-zA-Z0-9]+$/,
            message: 'Only numbers and latin letters are allowed',
          },
        })}
      />
      <span className={className('error-container')}>
        {errors.login && (
          <span className={className('error-msg')} data-testid="alert">
            {errors.login.message}
          </span>
        )}
      </span>
      <label htmlFor="password">Password</label>
      <input
        className={className('input')}
        id="password"
        type="password"
        placeholder="Password"
        autoComplete="off"
        data-testid="password"
        {...register('password', {
          required: 'Password is required',
          minLength: {
            value: 5,
            message: 'Password should be at-least 5 characters',
          },
          pattern: {
            value: /^[a-zA-Z0-9]+$/,
            message: 'Only numbers and latin letters are allowed',
          },
        })}
      />
      <span className={className('error-container')}>
        {errors.password && (
          <span className={className('error-msg')} data-testid="alert">
            {errors.password.message}
          </span>
        )}
      </span>
      <button
        className={className('button')}
        type="submit"
        data-testid="button"
      >
        Sign in
      </button>
    </form>
  );
};
