import { TTopTracksResponse, TTrack } from 'types/types';

export const getTopTracksData = (tracks: TTopTracksResponse): TTrack[] => {
  return tracks.map((track) => {
    return {
      id: track.trackMetadata.trackUri.match(/\b[\w]+$/)?.[0] ?? '',
      name: track.trackMetadata.trackName,
      artists: track.trackMetadata.artists.map((artist) => artist.name),
      image: track.trackMetadata.displayImageUri,
    };
  });
};
