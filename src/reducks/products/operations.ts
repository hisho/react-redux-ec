import React from "react";
import {db, FirebaseTimestamp, FirebaseTimestampType} from "@src/firebase";
import {push} from "connected-react-router";
import {imageType, sizeType} from "@src/components/products/types";

//firebaseのdbのproductsを一旦変数に代入
const productsRef = db.collection('products');

//TODO idとcreate_atは必須なのでpartialを無くす
//productのdataの型
//どこかに移動させる
export type productDataType = {
  images: imageType[];
  id?: string;
  name: string;
  description: string;
  category: string;
  gender: string;
  price: number;
  sizes: sizeType[];
  update_at: FirebaseTimestampType;
  created_at?: FirebaseTimestampType;
}

//商品を追加、編集する時に実行される関数
export const saveProducts = (
  id: string,
  images: imageType[],
  name: string,
  description: string,
  category: string,
  gender: string,
  price: string,
  sizes: sizeType[]
) => {
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
      sizes,
      update_at: timestamp,
    }

    //idが空の場合(Productを新規作成の場合)
    if (id === '') {
      //firebaseが自動生成するidを取得する
      const {id: currentId} = productsRef.doc();
      //productのidにfirebaseが自動生成したidをセットする
      data.id = currentId;
      //productのcreate_atに作った時刻をセットする
      data.created_at = timestamp;
    }

    //idが空の場合は上記の新規作成したIDを代入する
    const productId = id || productsRef.doc().id;

    //firebaseのproductのidに上記のdataをセットする
    return productsRef.doc(productId).set(data, {merge: true})
      .then(() => {
        dispatch(push('/'))
      }).catch((e) => {
        throw new Error(e);
      })
  }
}