import { isString } from "@/utils/is";
import { CacheConfig, createStorage } from "@/utils/cache";

// 获取storage
export function getStorage ({key, storage = sessionStorage}: CacheConfig): any {
  if (isString(key)) {
    return createStorage({key, storage}).get(key)
  }
}

// 设置storage
export function setStorage(config: CacheConfig) {
  const {key, value} = config
  if (isString(key) && value) {
    createStorage(config).set(key, value)
  }
}
