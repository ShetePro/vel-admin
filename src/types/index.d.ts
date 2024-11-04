type Recordable<T = any> = Record<string, T>;
type KeyRecordable<T> = {
  [key: string]: T
}
type KeyString = {
  [key: string]: string
}
type VoidFunction = () => void
type MainDialogStatus = "create" | "update" | "detail"
type MainDialogBaseFn = {
  open: (data: Recordable, status: MainDialogStatus) => void
}
declare module 'element-plus/dist/locale/zh-cn.min.mjs';
