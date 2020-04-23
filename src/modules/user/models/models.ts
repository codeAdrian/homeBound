export interface UserAuthData {
  email: string;
  password: string;
}

export interface UserState {
  isLoading: boolean;
  userData?: firebase.UserInfo;
  error?: string;
}
