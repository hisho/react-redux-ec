import React from "react";
import {signInAction} from "@src/reducks/users/actions";
import {push} from "connected-react-router";
import {RootStateType} from "@src/reducks/type";

//サインインする時に実行する関数
export const signIn = () => {
  return async (dispatch: React.Dispatch<unknown>, getState: () => RootStateType) => {
    //現在のユーザーの値を取得
    const {users} = getState();

    //現在ユーザーがサインインしているかどうか
    const isSignedIn = users.isSignedIn;

    //サインインしている場合は早期リターン
    if (isSignedIn) return;

    //ダミー
    const url = "https://api.github.com/users/hisho";
    const response: {
      login: string
    } = await fetch(url).then(res => res.json()).catch(() => null);
    const username = response.login;

    //uidとusernameを変更してsignInActionを実行
    //signInAction中でisSignedInをtrueに設定しているためisSignedInは不要
    dispatch(signInAction({
      uid: "00001",
      username
    }));

    //サインイン後にトップページへリダイレクト
    dispatch(push('/'));
  }
}