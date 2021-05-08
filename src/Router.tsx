import React from "react";
import {Route, Switch} from "react-router";
import {Home, SignIn, SignUp, Reset,ProductEdit} from "@src/pages";
import {Auth} from "@src/Auth";

export const Router: React.VFC = () => {
  return (
    <Switch>
      <Route exact path="/signin" component={SignIn}/>
      <Route exact path="/signin/reset" component={Reset}/>
      <Route exact path="/signup" component={SignUp}/>
      <Auth>
        <Route exact path="(/)?" component={Home}/>
        <Route exact path="(/product/edit)" component={ProductEdit}/>
      </Auth>
    </Switch>
  )
}