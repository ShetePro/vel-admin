import {isMobile, isNullOrUnDef} from "@/utils/is";

// 表单校验 方法
export function validateMobile (rule: any, value: any, callback: any) {
  if (value === '' || isNullOrUnDef(value)) {
    callback()
  } else {
    if (!isMobile(value)) {
      callback(new Error("手机号格式错误"))
    }
    callback()
  }
}
