import axios, { AxiosRequestConfig } from 'axios';
import { AXIOS_SPOTIFY_CONFIG, AXIOS_SPOTIFY_DOWNLOADER_CONFIG } from 'consts';

const createInstanceAxiosSpotify = (defaultConfig?: AxiosRequestConfig) => {
  return axios.create({
    ...AXIOS_SPOTIFY_CONFIG,
    ...defaultConfig,
  });
};

export const instanceAxiosSpotify = createInstanceAxiosSpotify();

const createInstanceAxiosSpotifyDownloader = (
  defaultConfig?: AxiosRequestConfig
) => {
  return axios.create({
    ...AXIOS_SPOTIFY_DOWNLOADER_CONFIG,
    ...defaultConfig,
  });
};

export const instanceAxiosSpotifyDownloader =
  createInstanceAxiosSpotifyDownloader();
