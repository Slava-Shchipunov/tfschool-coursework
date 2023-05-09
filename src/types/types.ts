export type TUser = {
  // TODO уточнить, после настройки firebase
  id: string;
  email: string;
  login: string;
  password: string;
};

export type TUserCreate = Omit<TUser, 'id'>;

export type TUserAuth = Omit<TUser, 'id' | 'login'>;

export type TTrack = {
  id: string;
  name: string;
  artists: string[];
  image: string;
  src?: string;
};

export type TTrackResponse = {
  data: {
    id: string;
    name: string;
    albumOfTrack: {
      coverArt: {
        sources: TImageResponse[];
      };
    };
    artists: { items: TArtistResponse[] };
  };
};

export type TArtistResponse = { profile: { name: string } };

export type TImageResponse = {
  height: number;
  url: string;
  width: number;
};

export type TSearchResponse = {
  tracks: TTrackResponse[];
};

export type TTrackDetailsResponse = {
  tracks: {
    preview_url: string;
  }[];
};

export type TTopTracksResponse = {
  trackMetadata: {
    trackName: string;
    trackUri: string;
    displayImageUri: string;
    artists: { name: string }[];
  };
}[];
