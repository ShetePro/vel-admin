import { ProxyOptions } from "vite";

type ProxyItem = [string, string];

type ProxyList = ProxyItem[];

type ProxyTargetList = Record<string, string | ProxyOptions>;

const httpsRE = /^https:\/\//;

export function createProxy(list: ProxyList = []) {
  const ret: ProxyTargetList = {};
  for (const [prefix, target] of list) {
    const isHttps = httpsRE.test(target);
    ret[prefix] = {
      target: target,
      changeOrigin: true,
      ws: true,
      rewrite: (path: string) => path.replace(new RegExp(`^${prefix}`), ""),
      // https 则开启secure确保请求过程中的数据安全
      ...(isHttps ? { secure: false } : {}),
    };
  }
  return ret;
}
