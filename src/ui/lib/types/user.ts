export interface userDataType {
//   id: string;
  name: string;
  email: string;
  isLoggedIn:boolean;
}

export interface userStateType {
  userData: userDataType | null;
  userLoading: boolean;
  isLoaded: boolean;
}