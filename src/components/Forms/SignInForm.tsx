import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import { TUserAuth } from 'types/types';
import styles from './style.module.css';

const className = classNames.bind(styles);

const defaultValuesForm: TUserAuth = {
  login: '',
  password: '',
};

export const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TUserAuth>({
    defaultValues: defaultValuesForm,
    mode: 'all',
  });

  const onSubmit = (data: TUserAuth) => {
    console.log(data); // TODO в дальнейшем отправлять данные на сервер для авторизации пользователя
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
        {...register('login', {
          required: 'Login is required',
          minLength: {
            value: 4,
            message: 'Login should be at-least 4 characters',
          },
        })}
      />
      <p className={className('error-msg')}>{errors.login?.message}</p>
      <label htmlFor="password">Password</label>
      <input
        className={className('input')}
        id="password"
        type="password"
        placeholder="Password"
        autoComplete="off"
        {...register('password', {
          required: 'Password is required',
          minLength: {
            value: 5,
            message: 'Password should be at-least 5 characters',
          },
        })}
      />
      <p className={className('error-msg')}>{errors.password?.message}</p>
      <button className={className('button')} type="submit">
        Sign in
      </button>
    </form>
  );
};
