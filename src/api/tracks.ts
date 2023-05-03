import { TSearchResponse, TTrackDetailsResponse } from 'types/types';
import { instanceAxiosSpotify } from './instancesOfAxios';

export const searchTracks = (searchQuery: string) => {
  return instanceAxiosSpotify.get<TSearchResponse>('/search', {
    params: {
      q: searchQuery,
      type: 'tracks',
      offset: '0',
      limit: '20',
      numberOfTopResults: '5',
    },
  });
};

export const getTrackDetails = (tarckId: string) => {
  return instanceAxiosSpotify.get<TTrackDetailsResponse>('/tracks', {
    params: { ids: tarckId },
  });
};
