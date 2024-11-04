import { request } from '@/utils/http'

const DICT_TYPE_URL = '/rest/sys/dict'
const DICT_DATA_URL = '/rest/sys/dictEntry'
// 获取所有字典列表
export function getDictAllApi() {
  return request.post({
    url: `${DICT_TYPE_URL}/getAll`
  })
}
// 查询字典类型表列表
export function getDictTypeListApi(data = {}) {
  return request.post({
    url: `${DICT_TYPE_URL}/getList`,
    data
  })
}
// 查询字典类型表分页
export function getDictTypePageApi(data: Recordable = {}) {
  return request.post({
    url: `${DICT_TYPE_URL}/getPage`,
    data
  })
}
// 获取字典选择框列表
export function getDictTypeSelectList() {
  return request.get({
    url: `${DICT_TYPE_URL}/optionselect`
  })
}
// 刷新字典缓存
export function refreshDictCache() {
  return request.post({
    url: `${DICT_TYPE_URL}/refreshCache`
  })
}
// 新增字典表
export function addDictTypeApi(data: Recordable) {
  return request.post({
    url: `${DICT_TYPE_URL}/add`,
    data
  })
}
// 编辑字典表
export function updateDictTypeApi(data: Recordable) {
  return request.post({
    url: `${DICT_TYPE_URL}/update`,
    data
  })
}
// 删除字典表
export function deleteDictTypeApi(id: string) {
  return request.post({
    url: `${DICT_TYPE_URL}/delete`,
    data: { id }
  })
}
// 获取字典详情
export function getDetailDictTypeApi(id: string) {
  return request.get({
    url: `${DICT_TYPE_URL}/${id}`
  })
}

// 查询字典数据表列表
export function getDictDataPageApi() {
  return request.post({
    url: `${DICT_DATA_URL}/getPage`
  })
}
// 根据字典type获取字典数据表
export function getDictDataPageByType(type: string) {
  return request.get({
    url: `${DICT_DATA_URL}/type/${type}`
  })
}
// 新增字典数据表
export function addDictDataApi(data: Recordable) {
  return request.post({
    url: `${DICT_DATA_URL}/add`,
    data
  })
}
// 编辑字典数据表
export function updateDictDataApi(data: Recordable) {
  return request.post({
    url: `${DICT_DATA_URL}/update`,
    data
  })
}
// 删除字典数据表
export function deleteDictDataApi(id: string) {
  return request.post({
    url: `${DICT_DATA_URL}/delete`,
    data: { id }
  })
}
// 获取字典数据详情
export function getDetailDictDataApi(id: string) {
  return request.get({
    url: `${DICT_DATA_URL}/${id}`
  })
}
