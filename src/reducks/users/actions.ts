import {UsersType} from "@src/reducks/type";

//Userのアクションタイプの定数
export const ACTION_TYPE = {
  SIGN_IN: "SIGN_IN",
  SIGN_OUT: "SIGN_OUT"
} as const;


//Userがサインインする時の関数
export const signInAction = (userState: Omit<UsersType['state'], 'isSignedIn'>): UsersType['action'] => {
  return {
    type: ACTION_TYPE.SIGN_IN,
    payload: {
      isSignedIn: true,
      role: userState.role,
      uid: userState.uid,
      username: userState.username
    }
  }
}

//Userがサインアウトする時の関数
export const signOutAction = (): UsersType['action'] => {
  return {
    type: ACTION_TYPE.SIGN_OUT,
    payload: {
      isSignedIn: false,
      role: "",
      uid: "",
      username: ""
    }
  }
}
