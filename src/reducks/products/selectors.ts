import {createSelector} from "reselect";
import {RootStateType} from "@src/reducks/type";

const productsSelector = (state: RootStateType) => state.products;

//selectorを受け取り現在プロダクトのリストを返す関数
export const getList = createSelector(
  [productsSelector],
  state => state.list
)