import React, {useCallback, useState, ChangeEvent} from "react";
import {PrimaryButton, TextInput} from "@src/components/UIkit";
import {signUp} from "@src/reducks/users/operations";
import {useDispatch} from "react-redux";

export const SignUp = () => {
  const dispatch = useDispatch()

  //usernameのstate
  const [username, setUsername] = useState("");
  //emailのstate
  const [email, setEmail] = useState("");
  //passwordのstate
  const [password, setPassword] = useState("");
  //confirmPasswordのstate
  const [confirmPassword, setConfirmPassword] = useState("");

  //usernameのinputがchangeしたら走るイベント
  const inputUsername = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    //現在のvalueをusernameにセットする
    setUsername(event.target.value);
  }, [setUsername]);

  //emailのinputがchangeしたら走るイベント
  const inputEmail = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    //現在のvalueをemailにセットする
    setEmail(event.target.value);
  }, [setEmail]);

  //passwordのinputがchangeしたら走るイベント
  const inputPassword = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    //現在のvalueをpasswordにセットする
    setPassword(event.target.value);
  }, [setPassword]);

  //confirmPasswordのinputがchangeしたら走るイベント
  const inputConfirmPassword = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    //現在のvalueをconfirmPasswordにセットする
    setConfirmPassword(event.target.value);
  }, [setConfirmPassword]);

  return (
    <div className="c-section-container">
      <h2 className="u-text__headline u-text-center">アカウント登録</h2>
      <div className="module-spacer--medium" aria-hidden="true"/>
      <TextInput
        label="ユーザー名"
        value={username}
        onChange={inputUsername}
      />
      <TextInput
        label="メールアドレス"
        value={email}
        type="email"
        onChange={inputEmail}
      />
      <TextInput
        label="パスワード"
        value={password}
        type="password"
        onChange={inputPassword}
      />
      <TextInput
        label="パスワード確認用"
        value={confirmPassword}
        type="password"
        onChange={inputConfirmPassword}
      />
      <div className="module-spacer--medium" aria-hidden="true"/>
      <div className="center">
        <PrimaryButton label="アカウントを登録する" onClick={() => dispatch(signUp(username, email, password, confirmPassword))}/>
      </div>
    </div>
  )
}