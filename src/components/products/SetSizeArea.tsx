import React, {useCallback, useMemo, useState} from "react";
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  makeStyles, Paper
} from "@material-ui/core";
import {CheckCircle, Delete, Edit} from "@material-ui/icons";
import {TextInput} from "@src/components/UIkit";
import {sizeType} from "@src/components/products/types";

const useStyles = makeStyles({
  checkIcon: {
    float: 'right'
  },
  iconCell: {
    height: 48,
    width: 48
  }
})

type changeSize = (index: number, {size, quantity}: sizeType) => void;

type SetSizeAreaPropsType = {
  sizes: sizeType[];
  setSizes: React.Dispatch<React.SetStateAction<sizeType[]>>
}

export const SetSizeArea: React.VFC<SetSizeAreaPropsType> = (
  {
    sizes,
    setSizes
  }) => {
  const classes = useStyles();

  //商品のサイズと数量のセット数を管理するstate
  const [index, setIndex] = useState(0);

  //サイズを管理するstate
  const [size, setSize] = useState("");

  //数量を管理するstate
  const [quantity, setQuantity] = useState(0);

  //sizeのinputがchangeしたら走るイベント
  const inputSize = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSize(event.target.value);
  }, [setSize]);

  //quantityのinputがchangeしたら走るイベント
  const inputQuantity = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value) return;
    setQuantity(parseInt(event.target.value));
  }, [setQuantity]);

  //商品のサイズと数量のセットを増やす時の関数
  const addSize: changeSize = (index, {size, quantity}) => {
    //sizeかquantityどちらか一つでも空の場合早期リターン
    if (!size || !quantity) return;

    //最新(新規)なら追加する
    if (index === sizes.length) {
      //前の値とマージする
      setSizes((prevState) => [...prevState, {size, quantity}]);
      //indexを+1する
      setIndex((prevState => prevState + 1));

      //既存の場合
    } else {
      //sizeを一旦変数に代入
      const newSizes = sizes;
      //sizeのindex番(選択した既存の番号)のsizeとquantityを上書きする
      newSizes[index] = {size, quantity};
      //setSizesでstateに保存する
      setSizes(newSizes);
      //indexをnewSizes.length(最新の長さ)にする
      setIndex(newSizes.length);
    }
    //共通の設定
    //値を初期化する
    setSize("");
    setQuantity(0);
  }

  //現在選択されている商品のサイズと数量のセットを編集する関数
  const editSize: changeSize = (index, {size, quantity}) => {
    setIndex(index);
    setSize(size);
    setQuantity(quantity);
  }

  //現在選択されている商品のサイズと数量のセットを削除する関数
  const deleteSize = (index: number) => {
    const newSizes = sizes.filter((_, i) => i !== index);
    setSizes(newSizes);
  }

  //indexをmemo化
  useMemo(() => {
    setIndex(sizes.length);
  }, [sizes.length])

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>サイズ</TableCell>
              <TableCell>数量</TableCell>
              <TableCell className={classes.iconCell}/>
              <TableCell className={classes.iconCell}/>
            </TableRow>
          </TableHead>
          <TableBody>
            {sizes.length > 0 && (
              sizes.map((item, i) => (
                <TableRow key={item.size}>
                  <TableCell>{item.size}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>
                    <IconButton
                      className={classes.iconCell}
                      onClick={() => editSize(i, {size: item.size, quantity: item.quantity})}>
                      <Edit/>
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton className={classes.iconCell} onClick={() => deleteSize(i)}>
                      <Delete/>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <div>
          <TextInput fullWidth={false} label="サイズ" value={size} onChange={inputSize}/>
          <TextInput fullWidth={false} label="数量" value={quantity} onChange={inputQuantity} type="number"/>
          <IconButton className={classes.checkIcon} onClick={() => addSize(index, {size, quantity})}>
            <CheckCircle/>
          </IconButton>
        </div>
      </TableContainer>
    </div>
  )
}