import {RootStateType} from "@src/reducks/type";

//初期値
export const initialState: RootStateType = {
  products: {
    list: []
  },
  users: {
    isSignedIn: false,
    role: "",
    uid: "",
    username: ""
  }
}