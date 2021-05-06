import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getIsSignedIn} from "@src/reducks/users/selectors";
import {listenAuthState} from "@src/reducks/users/operations";

type AuthPropsType = {
  children: React.ReactNode
}

export const Auth: React.VFC<AuthPropsType> = ({children}) => {
  const dispatch = useDispatch();
  const selector = useSelector(state => state);
  const isSignedIn = getIsSignedIn(selector);

  useEffect(() => {
    //サインインしていたら処理を終了
    if (isSignedIn) return;

    //サインインしているか監視
    dispatch(listenAuthState());

    //一応depsに指定
  }, [isSignedIn, dispatch])

  //サインインしている時childrenを表示
  return <>{isSignedIn && children}</>
}