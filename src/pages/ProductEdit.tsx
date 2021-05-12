import React, {ChangeEvent, useCallback, useEffect, useState} from "react";
import {PrimaryButton, SelectBox, TextInput} from "@src/components/UIkit";
import {useDispatch} from "react-redux";
import {productDataType, saveProducts} from "@src/reducks/products/operations";
import {categories, genders} from "@src/reducks/products/type";
import {ImageArea} from "@src/components/products/ImageArea";
import {imageType, sizeType} from "@src/components/products/types";
import {db} from "@src/firebase";
import {SetSizeArea} from "@src/components/products";

//商品を追加・編集するページ
export const ProductEdit: React.VFC = () => {
  const dispatch = useDispatch();

  /**
   * URLから商品情報のIDを取得する関数
   * /product/edit/商品ID
   * から/product/edit/を削除する
   * /product/edit/ページの場合は ''
   * その他は商品IDが入る
   */
  const id = window.location.pathname.replace(/\/product\/edit(\/)?/, '');

  //画像を管理するstate
  const [images, setImages] = useState<imageType[]>([]);

  //商品名を管理するstate
  const [name, setName] = useState('');

  //商品の説明を管理するstate
  const [description, setDescription] = useState('');

  //商品のカテゴリーを管理するstate
  const [category, setCategory] = useState('');

  //商品の性別を管理するstate
  const [gender, setGender] = useState('');

  //商品の価格を管理するstate
  const [price, setPrice] = useState('');

  //商品のサイズと数量のセットを管理するstate
  const [sizes, setSizes] = useState<sizeType[]>([]);

  //nameのinputがchangeしたら走るイベント
  const inputName = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }, [setName]);

  //descriptionのinputがchangeしたら走るイベント
  const inputDescription = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  }, [setDescription]);

  //priceのinputがchangeしたら走るイベント
  const inputPrice = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setPrice(event.target.value);
  }, [setPrice]);

  useEffect(() => {
    //idが空の場合は早期リターン
    if (!id) return;

    //現在のfirebaseからidのproductsを取得する
    db.collection('products').doc(id).get()
      .then((snapshot) => {
        //TODO 型キャストをやめる
        const data = snapshot.data() as productDataType;
        //data.nameをnameに代入する
        setName(data.name);

        //data.descriptionをdescriptionに代入する
        setDescription(data.description);

        //data.categoryをcategoryに代入する
        setCategory(data.category);

        //data.genderをgenderに代入する
        setGender(data.gender);

        //data.priceをpriceに代入する
        setPrice(String(data.price));

        //data.priceをpriceに代入する
        setPrice(String(data.price));

        //data.sizesをsizesに代入する
        setSizes(data.sizes);
      })
  }, [id]);

  return (
    <section>
      <h2 className="u-text__headline u-text-center">商品の登録・編集</h2>
      <div className="c-section-container">
        <ImageArea images={images} setImages={setImages}/>
        <TextInput label="商品名" value={name} onChange={inputName}/>
        <TextInput label="商品説明" value={description} onChange={inputDescription} multiline={true} rows={5}/>
        <SelectBox label="カテゴリー" select={setCategory} value={category} options={categories}/>
        <SelectBox label="性別" select={setGender} value={gender} options={genders}/>
        <TextInput label="価格" value={price} onChange={inputPrice} type="number"/>
        <div className="module-spacer--small"/>
        <SetSizeArea sizes={sizes} setSizes={setSizes}/>
        <div className="module-spacer--medium"/>
        <div className="center">
          <PrimaryButton
            label="商品情報を保存"
            onClick={() => dispatch(saveProducts(id, images, name, description, category, gender, price, sizes))}/>
        </div>
      </div>
    </section>
  )
}