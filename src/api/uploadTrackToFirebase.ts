import { getStorage, ref, uploadBytes } from 'firebase/storage';

export const uploadTrackToFirebase = (
  userId: string,
  trackId: string,
  file: Blob
) => {
  const storage = getStorage();

  const trackRef = ref(storage, `${userId}/songs/${trackId}.mp3`);

  uploadBytes(trackRef, file);
};

export const getBlobFromUrl = async (url: string) => {
  const res = await fetch(url);
  return res.blob();
};
