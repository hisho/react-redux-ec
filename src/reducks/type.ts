import {SIGN_IN, SIGN_OUT} from "@src/reducks/users/actions";

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
  type: typeof SIGN_IN | typeof SIGN_OUT;
  payload: usersStateType;
}
