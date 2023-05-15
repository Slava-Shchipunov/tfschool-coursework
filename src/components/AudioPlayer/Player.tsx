import { useEffect, useRef } from 'react';

type TPlayer = {
  src: string;
  isPlay: boolean;
  seekTime: number;
  updateDuration: (event: React.SyntheticEvent<HTMLAudioElement>) => void;
  updateTime: (event: React.SyntheticEvent<HTMLAudioElement>) => void;
  loop: boolean;
  volume: number;
  onEnded: () => void;
};

export const Player = (props: TPlayer) => {
  const {
    src,
    isPlay,
    seekTime,
    loop,
    volume,
    onEnded,
    updateDuration,
    updateTime,
  } = props;

  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      const curr: HTMLAudioElement = audioRef.current;
      curr.currentTime = seekTime;
    }
  }, [seekTime]);
  useEffect(() => {
    if (audioRef.current) {
      const curr: HTMLAudioElement = audioRef.current;
      curr.volume = volume / 100;
    }
  }, [volume]);

  if (audioRef.current) {
    const curr: HTMLAudioElement = audioRef.current;
    if (isPlay) {
      curr.play();
    } else {
      curr.pause();
    }
  }

  return (
    <audio
      src={src}
      ref={audioRef}
      data-testid="audio"
      onEnded={onEnded}
      onLoadedData={updateDuration}
      onTimeUpdate={updateTime}
      loop={loop}
    />
  );
};
