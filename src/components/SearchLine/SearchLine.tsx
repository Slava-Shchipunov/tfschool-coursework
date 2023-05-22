import classNames from 'classnames/bind';
import styles from './style.module.css';
import { useState } from 'react';
import { Icon } from 'components/Icon/Icon';
import searchIconUrl from 'assets/svg/search.svg';
import crossIconUrl from 'assets/svg/cross.svg';
import { setHasNotSearchResults } from 'store/tracks/tracks.slice';
import { useAppDispatch } from 'hooks/useAppDispatch';

const className = classNames.bind(styles);

type TSearchLineProps = {
  search: (data: string) => void;
};

export const SearchLine = (props: TSearchLineProps) => {
  const [value, setValue] = useState('');
  const dispatch = useAppDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleReset = () => {
    setValue('');
  };

  const handleSubmit = async () => {
    const trimmedSearchString = value.trim();

    if (!trimmedSearchString) {
      dispatch(setHasNotSearchResults(true));
      return;
    }

    props.search(trimmedSearchString);
  };

  return (
    <div className={className('search')}>
      <input
        className={className('search-input')}
        id="search"
        type="text"
        placeholder="Search..."
        autoComplete="off"
        data-testid="search"
        value={value}
        onChange={handleChange}
      />
      <button
        className={className('reset-btn')}
        type="button"
        data-testid="resetBtn"
        onClick={handleReset}
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
        type="button"
        data-testid="submitBtn"
        onClick={handleSubmit}
      >
        <Icon url={searchIconUrl} width="30px" height="30px" />
      </button>
    </div>
  );
};
