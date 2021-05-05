// 参考記事
// https://qiita.com/Takepepe/items/6addcb1b0facb8c6ff1f#ambient-module-%E5%AE%A3%E8%A8%80%E3%81%A7-overload-%E3%81%99%E3%82%8B
import 'react-redux'
import {RootStateType} from "@src/reducks/type";

// ______________________________________________________
//

// react-reduxのDefaultRootStateをRootStateTypeでオーバーライドする
declare module 'react-redux' {
  interface DefaultRootState extends RootStateType {
  }
}