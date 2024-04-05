import classNames from 'classnames/bind';
import styles from './style.module.css';
import { memo } from 'react';

const className = classNames.bind(styles);

const LoaderComponent = () => {
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

export const Loader = memo(LoaderComponent);
