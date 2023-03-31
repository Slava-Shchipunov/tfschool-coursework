import styles from './style.module.css';

type TSongCard = {
  imgUrl: string;
  title: string;
  artist: string;
  isSmall: boolean;
};

export function SongCard(props: TSongCard) {
  const { imgUrl, title, artist, isSmall } = props;

  return (
    <div
      className={isSmall ? `${styles.card} ${styles.small}` : `${styles.card}`}
    >
      <div className={styles.art}>
        <div
          className={styles.artFill}
          style={{ backgroundImage: `url(${imgUrl})` }}
        />
        <div
          className={styles.artShadow}
          style={{ backgroundImage: `url(${imgUrl})` }}
        />
      </div>
      <div className={styles.title}>{title}</div>{' '}
      <div className={styles.artist}>{artist}</div>{' '}
    </div>
  );
}
