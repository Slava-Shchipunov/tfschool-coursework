import { TImageResponse, TTrack, TTrackResponse } from 'types/types';

export const getTracksData = (tracks: TTrackResponse[]): TTrack[] => {
  return tracks.map((track) => {
    const image = track.data.albumOfTrack.coverArt.sources.reduce(
      (acc: string, curr: TImageResponse) => {
        if (curr.height === 300) {
          return curr.url;
        }
        return acc;
      },
      ''
    );
    const artists = track.data.artists.items.map(
      (artist) => artist.profile.name
    );

    return {
      id: track.data.id,
      name: track.data.name,
      artists: artists,
      image: image,
    };
  });
};
