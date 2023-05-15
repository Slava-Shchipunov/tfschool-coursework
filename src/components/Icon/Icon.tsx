import classNames from 'classnames/bind';
import styles from './style.module.css';
import { memo } from 'react';

const className = classNames.bind(styles);

type TIcon = {
  url: string;
  width: string;
  height: string;
  filter?: string;
};

export const IconComponent = (props: TIcon) => {
  const { url, width, height, filter } = { ...props };
  return (
    <div
      className={className('icon')}
      style={{
        backgroundImage: `url(${url})`,
        width: width,
        height: height,
        filter: filter,
      }}
    />
  );
};

export const Icon = memo(IconComponent);
