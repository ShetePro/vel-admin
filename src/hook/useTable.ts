import { BasicTableOptions } from '@/components/Table/src/types'
import { onMounted, reactive, Ref, ref, ShallowRef, shallowRef, unref, watch } from 'vue'
import { PaginationProps } from 'element-plus'
import { request } from '@/utils/http'
import type { AxiosRequestConfig } from 'axios'
import type { RequestOptions } from '@/utils/http/types'
import { isFunction } from '@/utils/is'
type TableSearch = {
  data: Recordable
  params: Recordable
}
type UseTableConfig = {
  api?: string | Ref<string>
  apiMethod?: 'POST' | 'GET' | string
  apiConfig?: AxiosRequestConfig | (() => AxiosRequestConfig)
  apiOptions?: RequestOptions
  apiHandler?: (data: Recordable[]) => void
  options: BasicTableOptions | Ref<BasicTableOptions>
  page?: Partial<PaginationProps>
  searchTransform?: (data: TableSearch) => TableSearch
}
export type UseTableRegisterProps<T> = {
  options: BasicTableOptions | Ref<BasicTableOptions>
  data: ShallowRef<T[]>
  pagination: PaginationProps & {
    currentChange?: () => void
    sizeChange?: () => void
  }
  loading: Ref<boolean>
}
interface UseTableReturn<T> {
  register: () => UseTableRegisterProps<T>
  getData: () => T[]
  setData: (data: T[]) => void
  setLoading: (data: boolean) => void
  getList: (data?: Recordable, query?: Recordable) => void
  searchData: Ref<Recordable>
  searchQuery: Ref<Recordable>
  resetPagination: () => void
}
export function useTable<T extends object>(config: UseTableConfig): UseTableReturn<T> {
  const {
    api,
    apiHandler,
    apiOptions,
    apiConfig,
    apiMethod = 'POST',
    searchTransform,
    page
  } = config
  const searchData = ref({})
  const searchQuery = ref({})
  // 使用shallowRef 不对数据进行深度监听 优化性能
  const tableData = shallowRef<T[]>([])
  // 监听 api 变化
  watch(
    () => unref(api),
    () => {
      api && getList()
    }
  )
  let pagination = reactive(
    Object.assign(
      {
        currentPage: 1,
        pageSize: 10,
        total: 0,
        pageSizes: [10, 20, 30, 40, 50],
        sizeChange: getList,
        currentChange: getList
      },
      page
    )
  )
  const loading = ref<boolean>(false)
  const apiRequest = async (data: Recordable = {}, query: Recordable = {}) => {
    loading.value = true
    const searchBody: TableSearch = {
      data: {
        pageIndex: pagination.currentPage,
        pageSize: pagination.pageSize,
        ...data
      },
      params: {
        ...query,
        pageIndex: pagination.currentPage,
        pageSize: pagination.pageSize
      }
    }
    // 如果有处理函数 则使用处理后的请求数据
    let requestSearch = searchTransform ? searchTransform(searchBody) : searchBody
    try {
      const config = isFunction(apiConfig) ? apiConfig() : apiConfig
      const { data: dataBody } = await request.request(
        {
          method: apiMethod,
          url: unref(api),
          ...config,
          ...requestSearch
        },
        apiOptions
      )
      const apiData = apiHandler ? apiHandler(dataBody) : dataBody
      setData(apiData.rows)
      pagination.total = apiData.total
    } finally {
      loading.value = false
    }
  }
  // 请求表格数据
  function getList(data: Recordable = {}, query: Recordable = {}) {
    if (!api) return
    unref(api) && apiRequest({ ...searchData.value, ...data }, { ...searchQuery.value, ...query })
  }
  onMounted(() => {
    getList()
  })
  // 注入表格
  const register = () => {
    pagination = Object.assign(pagination, config.page)
    return {
      options: config.options,
      data: tableData,
      pagination: pagination as unknown as PaginationProps,
      loading
    }
  }

  // 获取表格数据
  const getData = () => {
    return [...unref(tableData.value)]
  }

  const setData = (data: T[]) => {
    tableData.value = data
  }
  const setLoading = (data: boolean) => {
    loading.value = data
  }
  const resetPagination = () => {
    pagination.currentPage = 1
    getList()
  }
  return {
    register,
    getData,
    setData,
    setLoading,
    getList,
    searchData,
    searchQuery,
    resetPagination
  }
}
