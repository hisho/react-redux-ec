import React from "react";
import {useDispatch} from "react-redux";
import {signIn} from "@src/reducks/users/operations";

export const Login:React.VFC = () => {
  const dispatch = useDispatch();

  return (
    <>
      <h2>ログイン</h2>
      <button type="button" onClick={() => dispatch(signIn())}>
        ログインする
      </button>
    </>
  )
}