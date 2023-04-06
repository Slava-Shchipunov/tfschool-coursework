import classNames from 'classnames/bind';
import styles from './style.module.css';

type TSongCard = {
  imgUrl: string;
  title: string;
  artist: string;
  isSmall: boolean;
};

const className = classNames.bind(styles);

export const SongCard = (props: TSongCard) => {
  const { imgUrl, title, artist, isSmall } = props;

  return (
    <div className={className('card', { small: isSmall })}>
      <div className={className('art')}>
        <img className={className('art-fill')} src={imgUrl} alt="cover" />
        <img className={className('art-shadow')} src={imgUrl} alt="shadow" />
      </div>
      <div className={className('title')}>{title}</div>{' '}
      <div className={className('artist')}>{artist}</div>{' '}
    </div>
  );
};
