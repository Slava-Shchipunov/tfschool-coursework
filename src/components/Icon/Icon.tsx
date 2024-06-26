import classNames from 'classnames/bind';
import styles from './style.module.css';
import { memo } from 'react';

const className = classNames.bind(styles);

type TIcon = {
  url: string;
  width: string;
  height: string;
  dark?: boolean;
  filter?: string;
};

export const IconComponent = (props: TIcon) => {
  const { url, width, height, filter, dark } = { ...props };
  return (
    <div
      className={className('icon', { dark: dark })}
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
