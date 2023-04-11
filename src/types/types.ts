export type TUser = {
  // TODO уточнить, после настройки firebase
  id: string;
  email: string;
  login: string;
  password: string;
};

export type TUserCreate = Omit<TUser, 'id'>;

export type TUserAuth = Omit<TUser, 'id' | 'login'>;
