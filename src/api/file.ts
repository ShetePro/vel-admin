import { request } from "@/utils/http";

// 附件下载接口
export function fileDownloadApi (params: {fileName: string, fileUrl: string}) {
  return request.get(
    {
      url: `/rest/file/downloadFile`,
      responseType: 'blob',
      params
    },
    {
      isTransformRequestResult: false
    }
  )
}
// 文件详情
export function fileDetailInfoApi (data: {id: string}) {
  return request.post(
    {
      url: `/rest/file/getFileDetail`,
      data
    },
  )
}
