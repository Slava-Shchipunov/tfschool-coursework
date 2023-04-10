import { useRef } from 'react';

type TPlayer = {
  src: string;
  isPlay: boolean;
};

export const Player = (props: TPlayer) => {
  const { src, isPlay } = props;

  const audioRef = useRef(null);

  if (audioRef.current) {
    const curr: HTMLAudioElement = audioRef.current;
    if (isPlay) {
      curr.play();
    } else {
      curr.pause();
    }
  }

  return <audio src={src} ref={audioRef} data-testid="audio" />;
};
