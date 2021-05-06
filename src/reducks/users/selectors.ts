import {createSelector} from "reselect";
import {RootStateType} from "@src/reducks/type";

const usersSelector = (state: RootStateType) => state.users;

//selectorを受け取り現在ユーザーがサインインしているかどうがを返す関数
export const getIsSignedIn = createSelector(
  [usersSelector],
  state => state.isSignedIn
)

//selectorを受け取り現在のユーザーidを返す関数
export const getUserId = createSelector(
  [usersSelector],
  state => state.uid
)

//selectorを受け取り現在のユーザー名を返す関数
export const getUsername = createSelector(
  [usersSelector],
  state => state.username
)