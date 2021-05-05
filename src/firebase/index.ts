import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/functions';
import {firebaseConfig} from "@src/firebase/config";

//firebaseの初期化
firebase.initializeApp(firebaseConfig);

//firebase関連を予めexportしておく
export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();
export const functions = firebase.functions();
export const FirebaseTimestamp = firebase.firestore.Timestamp;
