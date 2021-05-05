import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {push} from "connected-react-router";
import {signInAction} from "@src/reducks/users/actions";

export const Login:React.VFC = () => {
  const dispatch = useDispatch();
  const selector = useSelector(state => state);

  console.log(selector);

  return (
    <>
      <h2>ログイン</h2>
      <button type="button" onClick={() => {
        dispatch(signInAction({uid: "00001", username: "test"}))
        dispatch(push('/'))
      }}>
        ログインする
      </button>
    </>
  )
}