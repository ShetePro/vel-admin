import { request } from '@/utils/http'
import { CreateAxiosOptions } from '@/utils/http/axiosTransform'
import { useUserStore } from '@/store/modules/user'
import { DictItem } from "@/types/dict";

export type RequestDictProp = {
  url: string
  method: 'post' | 'get'
  params: Recordable
  data: Recordable
}
export function requestDictByUrl(prop: Partial<CreateAxiosOptions>) {
  return request.request(prop)
}

/*
 * 获取字典数据
 * */
export function getDictData(name: string, dataType: string = 'string'): DictItem[] {
  const { dictAll } = useUserStore()
  let dict = name ? dictAll[name] : undefined
  if (dataType === 'number') {
    dict = dict?.map((item) => {
      return {
        ...item,
        dictValue: Number(item.dictValue)
      }
    })
  }
  return dict || []
}

export function getDictLabelByValue(dictType: string, value: string | number) {
  const dict = getDictData(dictType)
  return dict.find((item) => item.dictValue === value)?.dictLabel
}
