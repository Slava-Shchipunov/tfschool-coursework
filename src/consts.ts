import { AxiosRequestConfig } from 'axios';

export const FIREBASE_CONFIG = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'online-audio-player-tfscw.firebaseapp.com',
  projectId: 'online-audio-player-tfscw',
  storageBucket: 'online-audio-player-tfscw.appspot.com',
  messagingSenderId: '397367957174',
  appId: '1:397367957174:web:de6d328803db85d8f5b817',
};

export const RAPIDAPI_KEY = process.env.REACT_APP_RAPIDAPI_KEY;

export const SPOTIFY_BASE_URL = 'spotify81.p.rapidapi.com';

export const SPOTIFY_DOWNLOADER_BASE_URL = 'spotify-downloader1.p.rapidapi.com';

export const AXIOS_SPOTIFY_CONFIG: AxiosRequestConfig = {
  baseURL: `https://${SPOTIFY_BASE_URL}`,
  headers: {
    'X-RapidAPI-Key': RAPIDAPI_KEY,
    'X-RapidAPI-Host': SPOTIFY_BASE_URL,
  },
};

export const AXIOS_SPOTIFY_DOWNLOADER_CONFIG: AxiosRequestConfig = {
  baseURL: `https://${SPOTIFY_DOWNLOADER_BASE_URL}`,
  headers: {
    'X-RapidAPI-Key': RAPIDAPI_KEY,
    'X-RapidAPI-Host': SPOTIFY_DOWNLOADER_BASE_URL,
  },
};
