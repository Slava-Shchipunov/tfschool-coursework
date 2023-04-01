import styles from './style.module.css';

type TPlayPauseBtn = {
  isPlay: boolean;
};

export function PlayPauseBtn(props: TPlayPauseBtn) {
  const { isPlay } = props;

  return (
    <button
      className={
        isPlay
          ? `${styles.playPauseBtn} ${styles.pause}`
          : `${styles.playPauseBtn}`
      }
      type="button"
      aria-label="Play or pause"
    />
  );
}
