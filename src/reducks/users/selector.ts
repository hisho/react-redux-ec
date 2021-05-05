import {createSelector} from "reselect";
import {RootStateType} from "@src/reducks/type";

const usersSelector = (state:RootStateType) => state.users;

export const getUserId = createSelector(
  [usersSelector],
  state => state.uid
)