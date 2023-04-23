import { useEffect, useRef } from 'react';

type TPlayer = {
  src: string;
  isPlay: boolean;
<<<<<<< HEAD
  seekTime: number;
  nextTrack: () => void;
  updateDuration: (event: React.SyntheticEvent<HTMLAudioElement>) => void;
  updateTime: (event: React.SyntheticEvent<HTMLAudioElement>) => void;
};

export const Player = (props: TPlayer) => {
  const { src, isPlay, seekTime, nextTrack, updateDuration, updateTime } =
    props;
=======
  onEnded: () => void;
};

export const Player = (props: TPlayer) => {
  const { src, isPlay, onEnded } = props;
>>>>>>> 3ebbfac (feat: add onEnded event handler)

  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      const curr: HTMLAudioElement = audioRef.current;
      curr.currentTime = seekTime;
    }
  }, [seekTime]);

  if (audioRef.current) {
    const curr: HTMLAudioElement = audioRef.current;
    if (isPlay) {
      curr.play();
    } else {
      curr.pause();
    }
  }

  return (
<<<<<<< HEAD
    <audio
      src={src}
      ref={audioRef}
      data-testid="audio"
      onEnded={nextTrack}
      onLoadedData={updateDuration}
      onTimeUpdate={updateTime}
    />
=======
    <audio src={src} ref={audioRef} data-testid="audio" onEnded={onEnded} />
>>>>>>> 3ebbfac (feat: add onEnded event handler)
  );
};
