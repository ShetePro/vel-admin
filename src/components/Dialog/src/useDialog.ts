import { Ref, ref, toRef } from "vue";

export function useDialog () {
  let show = () => {
  }
  let hide = () => {

  }
  // 注入函数
  const register = (showDialog: () => void, hideDialog: () => void) => {
    show = showDialog
    hide = hideDialog
  };
  return {
    show,
    hide,
    register
  }
}
