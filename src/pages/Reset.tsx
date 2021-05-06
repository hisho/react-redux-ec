import React, {useCallback, useState, ChangeEvent} from "react";
import {PrimaryButton, TextInput} from "@src/components/UIkit";
import {resetPassword} from "@src/reducks/users/operations";
import {useDispatch} from "react-redux";
import {push} from "connected-react-router";

export const Reset = () => {
  const dispatch = useDispatch()

  //emailのstate
  const [email, setEmail] = useState("");

  //emailのinputがchangeしたら走るイベント
  const inputEmail = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    //現在のvalueをemailにセットする
    setEmail(event.target.value);
  }, [setEmail]);

  return (
    <div className="c-section-container">
      <h2 className="u-text__headline u-text-center">リセット</h2>
      <div className="module-spacer--medium" aria-hidden="true"/>
      <TextInput
        label="メールアドレス"
        value={email}
        type="email"
        onChange={inputEmail}
      />
      <div className="module-spacer--medium" aria-hidden="true"/>
      <div className="center">
        <PrimaryButton label="Reset Password" onClick={() => dispatch(resetPassword(email))}/>
        <div className="module-spacer--medium" aria-hidden="true"/>
        <button type="button" onClick={() => dispatch(push('/signin'))}>アカウントをお持ちの方はこちら</button>
        <button type="button" onClick={() => dispatch(push('/signup'))}>アカウントをお持ちではない方はこちら</button>
      </div>
    </div>
  )
}