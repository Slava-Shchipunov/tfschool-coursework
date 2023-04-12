import classNames from 'classnames/bind';
import styles from './style.module.css';

const className = classNames.bind(styles);

type TInput = {
  type: 'Login' | 'Email' | 'Password';
  minLength?: number;
  value: string;
  error: string | null;
  validateInput: (
    event: React.ChangeEvent<HTMLInputElement>,
    type: 'Login' | 'Email' | 'Password',
    minLength?: number
  ) => void;
};

export const Input = (props: TInput) => {
  const { type, minLength, value, error, validateInput } = props;
  const lowerCaseType = type.toLowerCase();

  return (
    <>
      <label htmlFor={lowerCaseType} className={className('lable')}>
        {type}
      </label>
      <input
        className={className('input')}
        id={lowerCaseType}
        type={lowerCaseType === 'password' ? lowerCaseType : 'text'}
        placeholder={type}
        autoComplete="off"
        data-testid={lowerCaseType}
        value={value}
        onChange={(event) => {
          validateInput(event, type, minLength);
        }}
        onBlur={(event) => {
          validateInput(event, type, minLength);
        }}
      />
      <span className={className('error-container')}>
        {error && (
          <span className={className('error-msg')} data-testid="alert">
            {error}
          </span>
        )}
      </span>
    </>
  );
};
