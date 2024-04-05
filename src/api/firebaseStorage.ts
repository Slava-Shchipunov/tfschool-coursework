import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

export const downloadTrackToFirebase = (userId: string, trackId: string) => {
  const storage = getStorage();

  const trackRef = ref(storage, `${userId}/songs/${trackId}.m4a`);

  return getDownloadURL(trackRef);
};

export const uploadTrackToFirebase = async (
  userId: string,
  trackId: string,
  file: Blob
) => {
  const storage = getStorage();

  const trackRef = ref(storage, `${userId}/songs/${trackId}.m4a`);

  await uploadBytes(trackRef, file);
};

export const getBlobFromUrl = async (url: string) => {
  const res = await fetch(url);
  return res.blob();
};
