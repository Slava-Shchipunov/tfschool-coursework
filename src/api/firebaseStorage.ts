import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

export const downloadTrackToFirebase = (userId: string, trackId: string) => {
  const storage = getStorage();

  const trackRef = ref(storage, `${userId}/songs/${trackId}.mp3`);

  return getDownloadURL(trackRef);
};

export const uploadTrackToFirebase = async (
  userId: string,
  trackId: string,
  file: Blob
) => {
  const storage = getStorage();

  const trackRef = ref(storage, `${userId}/songs/${trackId}.mp3`);

  await uploadBytes(trackRef, file);
};

export const getBlobFromUrl = async (url: string) => {
  const res = await fetch(url);
  return res.blob();
};
