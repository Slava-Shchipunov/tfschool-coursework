import classNames from 'classnames/bind';
import styles from './style.module.css';

const className = classNames.bind(styles);

type TIcon = {
  url: string;
  width: string;
  height: string;
  filter?: string;
};

export const Icon = (props: TIcon) => {
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
