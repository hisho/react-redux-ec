import React from "react";
import {Route, Switch} from "react-router";
import {Home, SignIn, SignUp} from "@src/pages";

export const Router: React.VFC = () => {
  return (
    <Switch>
      <Route exact path="/signin" component={SignIn}/>
      <Route exact path="/signup" component={SignUp}/>
      <Route exact path="(/)?" component={Home}/>
    </Switch>
  )
}