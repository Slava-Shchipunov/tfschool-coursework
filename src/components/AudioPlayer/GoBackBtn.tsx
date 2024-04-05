import classNames from 'classnames/bind';
import styles from './style.module.css';
import { Icon } from 'components/Icon/Icon';
import goBackIconUrl from 'assets/svg/go-back.svg';
import { memo } from 'react';

type TGoBackBtn = {
  handleClickToSwitchPlayer: () => void;
};

const className = classNames.bind(styles);

export const GoBackBtnComponent = (props: TGoBackBtn) => {
  const { handleClickToSwitchPlayer } = props;

  return (
    <button
      className={className('button', 'go-back')}
      type="button"
      aria-label="Go back button"
      onClick={handleClickToSwitchPlayer}
      data-testid="goBackBtn"
    >
      <Icon url={goBackIconUrl} width="24px" height="24px" />
    </button>
  );
};

export const GoBackBtn = memo(GoBackBtnComponent);
