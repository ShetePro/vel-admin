// 全局限制输入框文字长度
import { useMessage } from '@/hook/useMessage'

export function inputLengthLimit() {
  const { message } = useMessage()
  const inputType: KeyRecordable<{ max: number; msg: (length: number) => string; maxProp: string }> = {
    text: { max: 255, msg: (length) => `输入框最多输入${length}个字符`, maxProp: 'maxlength' },
    textarea: { max: 255, msg: (length) => `文本框最多输入${length}个字符`, maxProp: 'maxlength' },
    number: { max: 9999999999999, msg: (length) => `数字输入框不能大于${length}`, maxProp: 'max' }
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
      const maxLength = (target.getAttribute(inputData.maxProp) || inputData.max)
      // 如果超出则提示
      if (target.value.length >= maxLength) {
        message(inputData.msg(maxLength), { type: 'warning' })
      }
    }
  })
}
