import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { TUserAuth, TUserCreate } from 'types/types';
import { auth } from './firebase';

export const signUp = async (data: TUserCreate) => {
  const { login, email, password } = data;

  await createUserWithEmailAndPassword(auth, email, password);

  if (auth.currentUser) {
    await updateProfile(auth.currentUser, { displayName: login });
  }
};

export const signIn = async (data: TUserAuth) => {
  const { email, password } = data;

  await signInWithEmailAndPassword(auth, email, password);
};
