import {ACTION_TYPE} from "@src/reducks/users/actions";

export type RootStateType = {
  users: UsersType['state']
}

export type UsersType = {
  state: usersStateType
  action: UsersActionType
}

type usersStateType = {
  isSignedIn: boolean,
  uid: string,
  username: string
}

type UsersActionType = {
  type: keyof typeof ACTION_TYPE;
  payload: usersStateType;
}
