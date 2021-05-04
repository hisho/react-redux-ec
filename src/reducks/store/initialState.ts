import {RootStateType} from "@src/reducks/type";

export const initialState: RootStateType = {
  users: {
    isSignedIn: true,
    uid: "",
    username: ""
  }
}