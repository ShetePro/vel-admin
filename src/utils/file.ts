import { isString } from "@/utils/is";

/**
 * @description 根据二进制数据下载文件
 * @param {二进制数据源} ref
 * @param {文件名} fileName
 */
export function downloadByBlob(ref: Blob, fileName: string) {
  const blob = new Blob([ref], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  })
  const link = document.createElement('a')
  link.href = window.URL.createObjectURL(blob)
  link.download = fileName
  link.click()
}

// 打开文件选择
export function openFileSelect(config?: {accept: string}): Promise<FileList | null> {
  const {accept = '*'} = config
  return new Promise((resolve, reject) => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = accept
    input.click()
    input.addEventListener('change', () => {
      resolve(input.files)
    })
  })
}

// blob 对象转换成json对象
export function blobTransformJson(blob: Blob) : Promise<Recordable>{
  return new Promise((resolve, reject) => {
    // 创建一个 FileReader 对象
    const reader = new FileReader()
    // 为 FileReader 添加加载完成的事件处理程序
    reader.onload = function (event) {
      try {
        // 将结果解析为 JSON 对象
        if (isString(event?.target?.result)) {
          console.log(event);
          const jsonObject = JSON.parse(event?.target?.result as string)
          resolve(jsonObject)
        }
      } catch (error) {
        reject(error)
        console.error('json 转换错误');
      }
    }
    reader.readAsText(blob);
  })
}
