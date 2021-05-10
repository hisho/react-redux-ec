import React from "react";
import {imageType} from "@src/components/products/types";

type ImagePreviewPropsType = {
  onDelete: (id: imageType["id"]) => Promise<unknown>;
  image: imageType
}

export const ImagePreview:React.VFC<ImagePreviewPropsType> = (
  {
    onDelete,
    image
  }) => {
  return (
    <button type="button" className="p-media__thumb" onClick={() => onDelete(image.id)}>
      <img src={image.path} alt=""/>
    </button>
  )
}