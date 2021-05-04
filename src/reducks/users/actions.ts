import {UsersType} from "@src/reducks/type";

export const ACTION_TYPE = {
  SIGN_IN: "SIGN_IN",
  SIGN_OUT: "SIGN_OUT"
} as const;

export const signInAction = (userState: Omit<UsersType['state'], 'isSignedIn'>): UsersType['action'] => {
  return {
    type: ACTION_TYPE.SIGN_IN,
    payload: {
      isSignedIn: true,
      uid: userState.uid,
      username: userState.username
    }
  }
}

export const signOutAction = (): UsersType['action'] => {
  return {
    type: ACTION_TYPE.SIGN_OUT,
    payload: {
      isSignedIn: false,
      uid: "",
      username: ""
    }
  }
}
