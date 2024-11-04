// 全局限制输入框文字长度
import { useMessage } from '@/hook/useMessage'

export function inputLengthLimit() {
  const { message } = useMessage()
  const inputType: KeyRecordable<{ max: number; msg: string; maxProp: string }> = {
    text: { max: 255, msg: '输入框最多输入255个字符', maxProp: 'maxlength' },
    textarea: { max: 255, msg: '文本框最多输入255个字符', maxProp: 'maxlength' },
    number: { max: 9999999999999, msg: '数字输入框不能大于9999999999999', maxProp: 'max' }
  }
  document.addEventListener('input', function (e: Event) {
    const target: HTMLInputElement = e.target as HTMLInputElement
    if (!target) return false
    const inputData = inputType[target.type]
    if (inputData) {
      // 设置输入框长度
      if (target.getAttribute(inputData.maxProp) === null) {
        target.setAttribute(inputData.maxProp, inputData.max.toString()) // 限制最长输入100个字符
      }
      // 如果超出则提示
      if (target.value.length >= inputData.max) {
        message(inputData.msg, { type: 'warning' })
      }
    }
  })
}
