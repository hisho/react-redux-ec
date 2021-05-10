import React from "react";
import {db, FirebaseTimestamp, FirebaseTimestampType} from "@src/firebase";
import {push} from "connected-react-router";
import {imageType} from "@src/components/products/types";

//firebaseのdbのproductsを一旦変数に代入
const productsRef = db.collection('products');

//TODO idとcreate_atは必須なのでpartialを無くす
//productのdataの型
type productDataType = {
  images: imageType[];
  id?: string;
  name: string;
  description: string;
  category: string;
  gender: string;
  price: number;
  update_at: FirebaseTimestampType;
  created_at?: FirebaseTimestampType;
}

//商品を追加、編集する時に実行される関数
export const saveProducts = (images: imageType[], name: string, description: string, category: string, gender: string, price: string) => {
  return async (dispatch: React.Dispatch<unknown>) => {
    //現在の時刻
    const timestamp = FirebaseTimestamp.now();

    //productのdata(更新用)
    const data: productDataType = {
      images,
      name,
      description,
      category,
      gender,
      price: parseInt(price, 10),
      update_at: timestamp,
    }

    //firebaseが自動生成するidを取得する
    const {id} = productsRef.doc();

    //productのidにfirebaseが自動生成したidをセットする
    data.id = id;
    //productのcreate_atに作った時刻をセットする
    data.created_at = timestamp;

    //firebaseのproductのidに上記のdataをセットする
    return productsRef.doc(id).set(data)
      .then(() => {
        dispatch(push('/'))
      }).catch((e) => {
        throw new Error(e);
      })
  }
}