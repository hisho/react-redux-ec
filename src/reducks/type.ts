import {ACTION_TYPE} from "@src/reducks/users/actions";

//storeのstateの型
export type RootStateType = {
  users: UsersType['state']
}

//Usersの型をまとめた型
export type UsersType = {
  state: usersStateType
  action: UsersActionType
}

//Usersのstateの型
type usersStateType = {
  isSignedIn: boolean,
  uid: string,
  username: string
}

//Usersのactionの型
type UsersActionType = {
  type: keyof typeof ACTION_TYPE;
  payload: usersStateType;
}
