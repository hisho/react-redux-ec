import {ACTION_TYPE} from "@src/reducks/users/actions";

//storeのstateの型
export type RootStateType = {
  users: UsersType['state']
}

//Usersの型をまとめた型
export type UsersType = {
  state: UsersStateType
  action: UsersActionType
}

//Usersのstateの型
type UsersStateType = {
  isSignedIn: boolean;
  role: string;
  uid: string;
  username: string;
}

//Usersのactionの型
type UsersActionType = {
  type: keyof typeof ACTION_TYPE;
  payload: UsersStateType;
}
