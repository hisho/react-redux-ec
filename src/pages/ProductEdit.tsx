import React, {ChangeEvent, useCallback, useState} from "react";
import {PrimaryButton, SelectBox, TextInput} from "@src/components/UIkit";
import {useDispatch} from "react-redux";
import {saveProducts} from "@src/reducks/products/operations";
import {categories,genders} from "@src/reducks/products/type";

//商品を追加・編集するページ
export const ProductEdit: React.VFC = () => {
  const dispatch = useDispatch();
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

  return (
    <section>
      <h2 className="u-text__headline u-text-center">商品の登録・編集</h2>
      <div className="c-section-container">
        <TextInput label="商品名" value={name} onChange={inputName}/>
        <TextInput label="商品説明" value={description} onChange={inputDescription} multiline={true} rows={5}/>
        <SelectBox label="カテゴリー" select={setCategory} value={category} options={categories} />
        <SelectBox label="性別" select={setGender} value={gender} options={genders} />
        <TextInput label="価格" value={price} onChange={inputPrice} type="number"/>
        <div className="module-spacer--medium"/>
        <div className="center">
          <PrimaryButton label="商品情報を保存" onClick={() => dispatch(saveProducts(name,description,category,gender,price))} />
        </div>
      </div>
    </section>
  )
}