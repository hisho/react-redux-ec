import {initialState} from "@src/reducks/store/initialState";
import {UsersType} from "@src/reducks/type";

export const UsersReducer = (state = initialState.users, action: UsersType["action"]) => {
  switch (action.type) {
    case "SIGN_IN":
      return {
        ...state,
        ...action.payload
      }
    case "SIGN_OUT":
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}