import classNames from 'classnames/bind';
import styles from './style.module.css';
import { useState } from 'react';
import { Icon } from 'components/Icon/Icon';
import searchIconUrl from 'assets/svg/search.svg';
import crossIconUrl from 'assets/svg/cross.svg';

const className = classNames.bind(styles);

type TSearchLineProps = {
  /* signIn: (data: TUserAuth) => Promise<TUserAuth>; */
};

export const SearchLine = (props: TSearchLineProps) => {
  const [value, setValue] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // TODO в дальнейшем отправлять данные на сервер для поиска по названию
    event.preventDefault();

    const trimmedSearchString = value.trim();

    if (trimmedSearchString) {
      const searchData: string = trimmedSearchString;

      console.log(searchData);
      /* await props.signIn(searchData); */
    }
  };

  return (
    <form className={className('search-form')} onSubmit={handleSubmit}>
      <input
        className={className('search-input')}
        id="search"
        type="text"
        placeholder="Search..."
        autoComplete="off"
        data-testid="search"
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
        }}
      />
      <button
        className={className('reset-btn')}
        type="button"
        data-testid="resetBtn"
        onClick={() => {
          setValue('');
        }}
      >
        <Icon
          url={crossIconUrl}
          width="12px"
          height="12px"
          filter="
  brightness(0) saturate(100%) invert(4%) sepia(50%) saturate(3978%) hue-rotate(217deg) brightness(87%) contrast(96%)"
        />
      </button>
      <button
        className={className('search-btn')}
        type="submit"
        data-testid="submitBtn"
      >
        <Icon url={searchIconUrl} width="30px" height="30px" />
      </button>
    </form>
  );
};
