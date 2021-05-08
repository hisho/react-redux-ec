import {initialState} from "@src/reducks/store/initialState";
import {ProductsType} from "@src/reducks/type";

//productsのアクションを呼ぶReducer
export const ProductsReducer = (
  state = initialState.users,
  action: ProductsType["action"]
) => {
  switch (action.type) {
    default:
      // console.error(`type is ${Object.values(ACTION_TYPE).join(' or ')}`);
      // throw new Error(`type is ${Object.values(ACTION_TYPE).join(' or ')}`);
      return state;
  }
}