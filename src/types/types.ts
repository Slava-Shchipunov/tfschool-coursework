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
