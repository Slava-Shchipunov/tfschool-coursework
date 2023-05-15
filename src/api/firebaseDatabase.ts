import {
  child,
  get,
  getDatabase,
  ref,
  remove,
  set,
  update,
} from 'firebase/database';
import { TTrack, TLikedSongsData } from 'types/types';

export const addLikedSongsData = async (
  userId: string,
  trackData: TTrack,
  trackUrl: string
) => {
  const db = getDatabase();

  const userRef = ref(db);
  const likedSongsRef = ref(db, `${userId}/likedSongs/${trackData.id}`);
  const likedSongsIdsRef = ref(db, `${userId}/likedSongsIds`);

  const snapshot = await get(child(userRef, `${userId}/likedSongsIds`));
  const likedSongsIds: string[] = snapshot.val();

  const likedSongsUpdates = { ...trackData, src: trackUrl };
  const likedSongsIdsUpdates = likedSongsIds
    ? { [likedSongsIds.length]: trackData.id }
    : { 0: trackData.id };

  update(likedSongsRef, likedSongsUpdates);
  update(likedSongsIdsRef, likedSongsIdsUpdates);
};

export const getLikedSongsData = async (
  userId: string
): Promise<TLikedSongsData> => {
  const db = getDatabase();

  const userRef = ref(db);

  const snapshot = await get(child(userRef, `${userId}`));
  return snapshot.val();
};

export const getLikedSongsIds = async (userId: string): Promise<string[]> => {
  const db = getDatabase();

  const userRef = ref(db);

  const snapshot = await get(child(userRef, `${userId}/likedSongsIds`));
  return snapshot.val();
};

export const removeLikedSongData = async (userId: string, trackId: string) => {
  const db = getDatabase();

  const userRef = ref(db);

  const snapshot = await get(child(userRef, `${userId}/likedSongsIds`));
  const likedSongsIds: string[] = snapshot.val();

  const likedSongsRef = ref(db, `${userId}/likedSongs/${trackId}`);
  const likedSongsIdsRef = ref(db, `${userId}/likedSongsIds`);

  const likedSongsIdsUpdates = likedSongsIds.filter((id) => id !== trackId);

  remove(likedSongsRef);
  set(likedSongsIdsRef, likedSongsIdsUpdates);
};
