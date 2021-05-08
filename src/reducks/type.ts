import * as Users from "@src/reducks/users/actions";

//storeのstateの型
export type RootStateType = {
  products: ProductsType["state"]
  users: UsersType['state']
}

//Productsの型をまとめた型
export type ProductsType = {
  state: ProductsStateType
  action: ProductsActionType
}

//Usersの型をまとめた型
export type UsersType = {
  state: UsersStateType
  action: UsersActionType
}

//Productsのstateの型
type ProductsStateType = {
  list: string[]
}


//Productsのactionの型
type ProductsActionType = {
  //TODO Productsのアクションを作る
  type: keyof typeof Users.ACTION_TYPE;
  payload: UsersStateType;
}


//Usersのstateの型
type UsersStateType = {
  isSignedIn: boolean;
  role: string;
  uid: string;
  username: string;
}

//Usersのactionの型
type UsersActionType = {
  type: keyof typeof Users.ACTION_TYPE;
  payload: UsersStateType;
}
