import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  getMetadata,
  StorageError,
} from 'firebase/storage';

export const downloadTrackToFirebase = (trackId: string) => {
  const storage = getStorage();

  const trackRef = ref(storage, `songs/${trackId}.m4a`);

  return getDownloadURL(trackRef);
};

export const uploadTrackToFirebase = async (trackId: string, file: Blob) => {
  const storage = getStorage();

  const trackRef = ref(storage, `songs/${trackId}.m4a`);

  await uploadBytes(trackRef, file);
};

export const getBlobFromUrl = async (url: string) => {
  const res = await fetch(url);
  return res.blob();
};

export const checkTrackInStorage = async (trackId: string) => {
  const storage = getStorage();

  const trackRef = ref(storage, `songs/${trackId}.m4a`);

  try {
    await getMetadata(trackRef);
    return true;
  } catch (error) {
    if (
      error instanceof StorageError &&
      error.code === 'storage/object-not-found'
    ) {
      return false;
    }
    throw error;
  }
};
