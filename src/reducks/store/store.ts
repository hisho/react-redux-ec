import {createStore as reduxCreateStore, combineReducers, applyMiddleware} from "redux";
import {connectRouter, routerMiddleware} from 'connected-react-router'
import {UsersReducer} from "@src/reducks/users/reducers";
import {History} from "history";
import thunk from "redux-thunk";

//ストアを作成する
export const createStore = (history: History) => {
  return reduxCreateStore(
    //管理するステート
    combineReducers({
      router: connectRouter(history),
      users: UsersReducer
    }),
    //ミドルウェアの設定
    applyMiddleware(
      routerMiddleware(history),
      thunk
    ),
  )
}