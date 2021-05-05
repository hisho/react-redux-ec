import React, {useCallback, useState, ChangeEvent} from "react";
import {PrimaryButton, TextInput} from "@src/components/UIkit";
import {signIn} from "@src/reducks/users/operations";
import {useDispatch} from "react-redux";

export const SignIn = () => {
  const dispatch = useDispatch()

  //emailのstate
  const [email, setEmail] = useState("");
  //passwordのstate
  const [password, setPassword] = useState("");

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


  return (
    <div className="c-section-container">
      <h2 className="u-text__headline u-text-center">サインイン</h2>
      <div className="module-spacer--medium" aria-hidden="true"/>
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
      <div className="module-spacer--medium" aria-hidden="true"/>
      <div className="center">
        <PrimaryButton label="サインイン" onClick={() => dispatch(signIn(email, password))}/>
      </div>
    </div>
  )
}