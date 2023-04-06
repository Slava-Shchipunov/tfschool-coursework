/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import { TUserCreate } from 'types/types';
import styles from './style.module.css';

const className = classNames.bind(styles);

const defaultValuesForm: TUserCreate = {
  email: '',
  login: '',
  password: '',
};

export const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TUserCreate>({
    defaultValues: defaultValuesForm,
    mode: 'all',
  });

  const onSubmit = (data: TUserCreate) => {
    console.log(data); // TODO в дальнейшем отправлять данные на сервер для регистрации пользователя
  };

  return (
    <form className={className('form')} onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="login" className={className('lable')}>
        Login <br />
        <input
          className={className('input')}
          id="login"
          type="text"
          placeholder="Login"
          {...register('login', {
            required: 'Login is required',
            minLength: {
              value: 4,
              message: 'Login should be at-least 4 characters',
            },
          })}
        />
        <p className={className('error-msg')}>{errors.login?.message}</p>
      </label>
      <label htmlFor="email" className={className('lable')}>
        Email <br />
        <input
          className={className('input')}
          id="email"
          type="text"
          placeholder="Email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
              message: 'Email is not valid',
            },
          })}
        />
        <p className={className('error-msg')}>{errors.email?.message}</p>
      </label>
      <label htmlFor="password" className={className('lable')}>
        Password <br />
        <input
          className={className('input')}
          id="password"
          type="password"
          placeholder="Password"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 5,
              message: 'Password should be at-least 5 characters',
            },
          })}
        />
        <p className={className('error-msg')}>{errors.password?.message}</p>
      </label>
      <button className={className('button')} type="submit">
        Sign up
      </button>
    </form>
  );
};
