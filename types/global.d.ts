/**
 * 全局自定义环境变量的类型声明
 * @see {@link https://yiming_chang.gitee.io/pure-admin-doc/pages/config/#%E5%85%B7%E4%BD%93%E9%85%8D%E7%BD%AE}
 */
interface ViteEnv {
    VITE_PORT: number;
    VITE_PUBLIC_PATH: string;
    VITE_ROUTER_HISTORY: string;
    VITE_OUT_DIR: string;
    VITE_DROP_CONSOLE: string;
    VITE_APP_API_URL: [string, string][];
}
