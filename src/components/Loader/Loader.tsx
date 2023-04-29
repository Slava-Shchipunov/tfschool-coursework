import classNames from 'classnames/bind';
import styles from './style.module.css';

const className = classNames.bind(styles);

export const Loader = () => {
  return (
    <div className={className('container')}>
      <div className={className('lds-spinner')}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
