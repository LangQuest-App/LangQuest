export interface userDataType {
  name: string;
  email: string;
  isLoggedIn:boolean;
  preferences:IUserPreference | null
}
export interface IUserPreference{
  native_lang:string,
  language_to_learn:string,
  current_experience:string,
  aim:string,
  prefered_way:string
}

export interface userStateType {
  userData: userDataType | null;
  userLoading: boolean;
  isLoaded: boolean;
}