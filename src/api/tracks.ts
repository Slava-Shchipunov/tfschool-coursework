import axios, { AxiosRequestConfig } from 'axios';
import { RAPIDAPI_KEY, SPOTIFY_BASE_URL } from 'consts';
import { TSearchResponse, TTrackDetailsResponse } from 'types/types';

const instanceAxiosSpotify = (defaultConfig?: AxiosRequestConfig) => {
  const config: AxiosRequestConfig = {
    baseURL: `https://${SPOTIFY_BASE_URL}`,
    headers: {
      'X-RapidAPI-Key': RAPIDAPI_KEY,
      'X-RapidAPI-Host': SPOTIFY_BASE_URL,
    },
  };

  return axios.create({
    ...config,
    ...defaultConfig,
  });
};

export const searchTracks = (searchQuery: string) => {
  return instanceAxiosSpotify().get<TSearchResponse>('/search', {
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
  return instanceAxiosSpotify().get<TTrackDetailsResponse>('/tracks', {
    params: { ids: tarckId },
  });
};
