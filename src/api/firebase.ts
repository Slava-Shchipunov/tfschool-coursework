import { FIREBASE_CONFIG } from 'consts';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

export const app = initializeApp(FIREBASE_CONFIG);

export const auth = getAuth(app);

export const db = getDatabase(app);
