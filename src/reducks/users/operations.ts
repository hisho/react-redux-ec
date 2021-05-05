import React from "react";
import {signInAction} from "@src/reducks/users/actions";
import {push} from "connected-react-router";
import {RootStateType} from "@src/reducks/type";

export const signIn = () => {
  return async (dispatch: React.Dispatch<unknown>, getState: () => RootStateType) => {
    const {users} = getState();
    const isSignedIn = users.isSignedIn;
    if (isSignedIn) return;

    const url = "https://api.github.com/users/hisho";
    const response: {
      login: string
    } = await fetch(url).then(res => res.json()).catch(() => null);

    const username = response.login;

    dispatch(signInAction({
      uid: "00001",
      username
    }));

    dispatch(push('/'));
  }
}