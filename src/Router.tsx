import React from "react";
import {Route, Switch} from "react-router";
import {Home, Login} from "@src/pages";

export const Router: React.VFC = () => {
  return (
    <Switch>
      <Route exact path="/login" component={Login}/>
      <Route exact path="(/)?" component={Home}/>
    </Switch>
  )
}