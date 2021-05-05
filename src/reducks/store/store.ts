import {createStore as reduxCreateStore, combineReducers, applyMiddleware} from "redux";
import {connectRouter, routerMiddleware} from 'connected-react-router'
import {UsersReducer} from "@src/reducks/users/reducers";
import {History} from "history";
import thunk from "redux-thunk";

export const createStore = (history: History) => {
  return reduxCreateStore(
    combineReducers({
      router: connectRouter(history),
      users: UsersReducer
    }),
    applyMiddleware(
      routerMiddleware(history),
      thunk
    ),
  )
}