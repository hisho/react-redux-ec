import {UsersType} from "@src/reducks/type";

export const SIGN_IN = "SIGN_IN";
export const signInAction = (userState: Omit<UsersType['state'], 'isSignedIn'>): UsersType['action'] => {
  return {
    type: SIGN_IN,
    payload: {
      isSignedIn: true,
      uid: userState.uid,
      username: userState.username
    }
  }
}

export const SIGN_OUT = "SIGN_OUT";
export const signOutAction = (): UsersType['action'] => {
  return {
    type: SIGN_OUT,
    payload: {
      isSignedIn: false,
      uid: "",
      username: ""
    }
  }
}
