import classNames from 'classnames/bind';
import styles from './style.module.css';

type TSongCard = {
  imgUrl: string;
  title: string;
  artist: string;
  isSmall: boolean;
};

const className = classNames.bind(styles);

export function SongCard(props: TSongCard) {
  const { imgUrl, title, artist, isSmall } = props;

  return (
    <div className={className('card', { small: isSmall })}>
      <div className={className('art')}>
        <div
          className={className('art-fill')}
          style={{ backgroundImage: `url(${imgUrl})` }}
        />
        <div
          className={className('art-shadow')}
          style={{ backgroundImage: `url(${imgUrl})` }}
        />
      </div>
      <div className={className('title')}>{title}</div>{' '}
      <div className={className('artist')}>{artist}</div>{' '}
    </div>
  );
}
