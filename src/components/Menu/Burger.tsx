import classNames from 'classnames/bind';
import styles from './style.module.css';

const className = classNames.bind(styles);

type TBurger = {
  handleClick: () => void;
};

export const Burger = ({ handleClick }: TBurger) => {
  return (
    <div
      className={className('header-burger')}
      onClick={handleClick}
      data-testid="burger"
    >
      <span className={className('burger-line')}></span>
      <span className={className('burger-line')}></span>
    </div>
  );
};
