import React from "react";
import {Router} from "@src/Router";
import './assets/reset.css';
import './assets/style.css';

export const App: React.VFC = () => {
  return (
    <main>
      <Router/>
    </main>
  )
}