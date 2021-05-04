import {RootStateType} from "@src/reducks/type";

//初期値
export const initialState: RootStateType = {
  users: {
    isSignedIn: true,
    uid: "",
    username: ""
  }
}