import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "@src/reducks/type";
import {signInAction} from "@src/reducks/users/actions";

function App() {
  const dispatch = useDispatch();
  const selector = useSelector((state:RootStateType) => state);
  console.log(selector)

  return (
    <div>
      <button type="button" onClick={() => dispatch(signInAction({uid: "ssssss",username: 'test'}))}>
        Sign In
      </button>
    </div>
  );
}

export default App;
