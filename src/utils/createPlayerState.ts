import { AxiosResponse } from 'axios';
import { TTrack } from 'types/types';

type TCreatePlayerStateData = {
  trackId: string;
  currentSongs: TTrack[];
  trackDetails: AxiosResponse | null;
  isTrackLiked: boolean;
};

export const createPlayerState = (
  createPlayerStateData: TCreatePlayerStateData
) => {
  const { trackId, currentSongs, trackDetails, isTrackLiked } =
    createPlayerStateData;
  const trackUrl = trackDetails?.data.tracks[0].preview_url;
  const currentIdx = currentSongs.findIndex((el) => el.id === trackId);

  return {
    currentIdx: currentIdx,
    isActive: true,
    isTrackLiked: isTrackLiked,
    activeSong: currentSongs[currentIdx].src
      ? { ...currentSongs[currentIdx] }
      : { ...currentSongs[currentIdx], src: trackUrl },
  };
};
