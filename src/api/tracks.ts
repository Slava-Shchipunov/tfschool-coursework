import {
  TSearchResponse,
  TTopTracksResponse,
  TTrackDetailsResponse,
} from 'types/types';
import { instanceAxiosSpotify } from './instancesOfAxios';
import { getDateOfLastThursday } from 'utils/getDateOfLastThursday';

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

export const getTopTracks = () => {
  return instanceAxiosSpotify.get<TTopTracksResponse>('/top_200_tracks', {
    params: {
      period: 'weekly',
      date: getDateOfLastThursday(),
    },
  });
};
