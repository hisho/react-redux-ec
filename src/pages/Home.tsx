import React from "react";
import {getUserId} from "@src/reducks/users/selector";
import {useSelector} from "react-redux";

export const Home: React.VFC = () => {
  const selector = useSelector(state => state);
  const uid = getUserId(selector);

  return (
    <>
      this is home
      <p>{uid}</p>
    </>
  )
}