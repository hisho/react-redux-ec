import React from "react";
import {getUserId, getUsername} from "@src/reducks/users/selectors";
import {useDispatch, useSelector} from "react-redux";
import {signOut} from "@src/reducks/users/operations";

export const Home: React.VFC = () => {
  const dispatch = useDispatch();
  const selector = useSelector(state => state);
  const uid = getUserId(selector);
  const username = getUsername(selector);

  return (
    <>
      this is home
      <p>ユーザーID：{uid}</p>
      <p>ユーザー名：{username}</p>
      <button type="button" onClick={() => dispatch(signOut())}>サインアウト</button>
    </>
  )
}