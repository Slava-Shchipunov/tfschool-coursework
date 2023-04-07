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
        Login
      </label>
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
      <label htmlFor="email" className={className('lable')}>
        Email
      </label>
      <input
        className={className('input')}
        id="email"
        type="text"
        placeholder="Email"
        autoComplete="off"
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
            message: 'Email is not valid',
          },
        })}
      />
      <p className={className('error-msg')}>{errors.email?.message}</p>
      <label htmlFor="password" className={className('lable')}>
        Password
      </label>
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
        Sign up
      </button>
    </form>
  );
};
