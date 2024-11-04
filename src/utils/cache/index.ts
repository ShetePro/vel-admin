import systemSettings from "@/config/system";
import { isNullOrUnDef } from "../is";
import { AesEncryption } from "../encryption";

export interface CacheConfig {
  key: string;
  storage?: Storage;
  value?: Recordable | string;
  iv?: string;
  hasEncrypt?: boolean;
  timeout?: null | number;
}

export const createStorage = ({
  storage = sessionStorage,
  key = systemSettings.cacheCipher.key,
  iv = systemSettings.cacheCipher.iv,
  timeout = systemSettings.cacheCipher.cacheTimeOut,
  hasEncrypt = false,
}: Partial<CacheConfig> = {}) => {
  if (hasEncrypt && [key.length, iv.length].some((item) => item !== 16)) {
    throw new Error("密钥或iv必须为16位!");
  }

  // 创建AES加密实例
  const encryption = new AesEncryption({ key, iv });

  // 创建storage 对象
  const WebStorage = class WebStorage {
    private storage: Storage;
    private encryption: AesEncryption;
    private readonly hasEncrypt: boolean;

    constructor() {
      this.storage = storage;
      this.encryption = encryption;
      this.hasEncrypt = hasEncrypt;
    }

    // 获取key
    private static getKey(key: string) {
      return `${key}`.toUpperCase();
    }

    /**
     * 设置缓存
     * @param {string} key
     * @param {Recordable} value 数据值
     * @param {number} expire 有效期
     */
    set(key: string, value: Recordable, expire: number | null = timeout) {
      const stringData = JSON.stringify({
        value,
        time: Date.now(),
        expire: !isNullOrUnDef(expire)
          ? new Date().getTime() + expire * 1000
          : null,
      });
      const stringifyValue = this.hasEncrypt
        ? this.encryption.encryptByAES(stringData)
        : stringData;
      this.storage.setItem(WebStorage.getKey(key), stringifyValue);
    }

    /**
     * 根据key 删除缓存
     * @param {string} key
     * @param {Recordable} def 默认值
     */
    get(key: string, def?: Recordable): Recordable | undefined {
      const val = this.storage.getItem(WebStorage.getKey(key));
      if (!val) return def;

      try {
        const decVal = this.hasEncrypt
          ? this.encryption.decryptByAES(val)
          : val;
        const data = JSON.parse(decVal);
        const { value, expire } = data;
        if (isNullOrUnDef(expire) || expire >= new Date().getTime()) {
          return value;
        }
        this.remove(key);
      } catch (e) {
        return def;
      }
    }

    /**
     * 根据key 删除缓存
     * @param {string} key
     */
    remove(key: string) {
      this.storage.removeItem(WebStorage.getKey(key));
    }

    /**
     * 删除所有缓存
     */
    clear(): void {
      this.storage.clear();
    }
  };
  return new WebStorage();
};
