import React from "react";
import {push} from "connected-react-router";
import {auth, db, FirebaseTimestamp} from "@src/firebase";
import {signInAction} from "@src/reducks/users/actions";
import {RootStateType} from "@src/reducks/type";
//firebaseのUserとdispatchを受け取りサインインする関数
const setFirebaseUserData = async (user: firebase.User, dispatch: React.Dispatch<unknown>) => {
  const uid = user.uid;
  //firebaseのusersからuidを検索してgetする
  db.collection('users').doc(uid).get()
    .then((snapshot) => {
      //snapshotは返った来たユーザーのdata
      //TODO asを無くす
      const data = snapshot.data() as Omit<RootStateType["users"], 'isSignedIn'>;

      //ユーザーの認証情報をセットする
      dispatch(signInAction({
        role: data.role,
        uid: data.uid,
        username: data.username
      }))
    })
}

//サインインする時に実行する関数
export const signIn = (email: string, password: string) => {
  return async (dispatch: React.Dispatch<unknown>) => {
    //バリデーション
    //emailとpasswordが空の場合alertを出す
    //TODO バリデーションをちゃんとする
    if (email === "" || password === '') {
      alert("必須項目が未入力です");
      return false;
    }

    //メアドとパスワードで認証する
    auth.signInWithEmailAndPassword(email, password)
      .then(result => {
        const user = result.user;
        //サインインしている場合
        if (user) {
          setFirebaseUserData(user, dispatch);
          //Homeに遷移させる
          dispatch(push('/'));
        }
      })
  }
}

export const signUp = (username: string, email: string, password: string, confirmPassword: string) => {
  return async (dispatch: React.Dispatch<unknown>) => {
    //バリデーション
    //usernameとemailとpasswordとconfirmPasswordが空の場合alertを出す
    //TODO バリデーションをちゃんとする
    if (username === "" || email === "" || password === '' || confirmPassword === "") {
      alert("必須項目が未入力です");
      return false;
    }

    //passwordとconfirmPasswordが一致しない場合alertを出す
    //TODO バリデーションをちゃんとする
    if (password !== confirmPassword) {
      alert("パスワードが一致しません。");
      return false;
    }

    //emailとpasswordでユーザーを作成する
    return auth.createUserWithEmailAndPassword(email, password)
      .then(result => {
        const user = result.user;

        //アカウント作成が成功していたら処理を続ける
        if (user) {
          const uid = user.uid;
          //現在の時間を設定する
          const timestamp = FirebaseTimestamp.now();

          //ユーザーのデータの雛形に当てはめる
          const userInitialData = {
            created_at: timestamp,
            email,
            role: "customer",
            uid,
            updated_at: timestamp,
            username
          }

          //firebaseのusersのuidが一致すれば保存しhomeに遷移させる
          db.collection('users').doc(uid).set(userInitialData)
            .then(() => {
              dispatch(push('/'));
            })
        }
      })
  }
}
