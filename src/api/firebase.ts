import { FIREBASE_CONFIG } from 'consts';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

export const app = initializeApp(FIREBASE_CONFIG);

export const auth = getAuth(app);
