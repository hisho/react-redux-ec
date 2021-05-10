import React, {useCallback} from "react";
import {IconButton} from "@material-ui/core";
import {AddPhotoAlternate} from "@material-ui/icons";
import {makeStyles} from '@material-ui/styles';
import {storage} from "@src/firebase";
import {imageType} from "@src/components/products/types";
import {ImagePreview} from "@src/components/products/ImagePreview";

type ImageAreaPropsType = {
  images: imageType[];
  setImages: React.Dispatch<React.SetStateAction<imageType[]>>
}

const useStyles = makeStyles({
  icon: {
    height: 48,
    width: 48
  }
})

/**
 * ランダムな文字列を返す関数
 * @param length - 何文字返すか　
 * @return string - 欲を言えばlengthと同じ長さのstringを返す型にしたい
 */
function randomString(length: number = 16): string {
  const strings = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array.from(crypto.getRandomValues(new Uint8Array(length))).map((n) => {
    return strings[n % strings.length];
  }).join('');
}

export const ImageArea: React.VFC<ImageAreaPropsType> = (
  {
    images,
    setImages
  }) => {
  const classes = useStyles();

  //画像をfirebaseにアップロードする関数
  const uploadImages = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files;
    //fileがない場合は早期リターンする
    if (!file) return;

    //TODO キャストを消す
    const blob = new Blob(file as unknown as BlobPart[], {type: 'image/jpeg'});

    //アップロードするファイルのidをランダムな文字列にする
    const id = randomString();

    //idを代入したrefを一旦変数に代入する
    const uploadRef = storage.ref('images').child(id);
    //refから実際にファイルをアップロードする
    const uploadTask = uploadRef.put(blob);

    //アップロード中後の処理
    uploadTask.then(() => {
      uploadTask.snapshot.ref.getDownloadURL()
        .then((downloadURL) => {
          //ダウンロードリンクを取得する
          //ダウンロードリンクが文字列じゃない場合は早期リターンする
          if (!(typeof downloadURL === 'string')) return;

          //現在のアップロードした画像のidとpath
          const newImage = {
            id,
            path: downloadURL
          };

          //複数登録可能なので、前の値とマージさせてステートを更新する
          setImages((prevState) => ([...prevState, newImage]));
        })
    })
  }, [setImages])

  //画像を削除する関数
  const deleteImages = useCallback(async (id: imageType['id']) => {
    //alertを出す
    const ret = window.confirm('この画像を削除しますか？');

    //いいえをクリック場合は処理を終了させる
    if (!ret) return;

    //クリックされた画像以外をフィルタリングした配列を返す
    const newImages = images.filter((image) => image.id !== id);
    //stateを更新する
    setImages(newImages);
    //firebaseの画像を削除する
    return storage.ref('images').child(id).delete();

  }, [images, setImages]);

  return (
    <div>
      <div className="p-grid__list-images">
        {images.length > 0 && (
          images.map((image) => (
            <ImagePreview onDelete={deleteImages} image={image} key={image.id}/>
          ))
        )}
      </div>
      <div className="u-text-right">
        <span>商品を登録する</span>
        <IconButton className={classes.icon}>
          <label>
            <AddPhotoAlternate/>
            <input className="u-display-none" type="file" id="image" onChange={(event) => uploadImages(event)}/>
          </label>
        </IconButton>
      </div>
    </div>
  )
}