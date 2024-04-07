import { useEffect } from 'react';
import { TTrack } from 'types/types';

/** Хук, позволяющий управлять метаданными аудио через media session */
export const useMediaSessionMetadata = (activeSong: TTrack | null) => {
  useEffect(() => {
    if (!!activeSong && 'mediaSession' in navigator) {
      const { name, artists, image } = activeSong;
      navigator.mediaSession.metadata = new MediaMetadata({
        title: name,
        artist: artists.join(', '),
        artwork: [
          {
            src: image,
            sizes: '300x300',
            type: 'image/jpeg',
          },
        ],
      });
    }
  }, [activeSong]);
};
