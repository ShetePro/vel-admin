import { loadEnv, ConfigEnv, UserConfigExport } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import svgLoader from 'vite-svg-loader'
import { createProxy } from './build/proxy'
import { createAlias } from './build/alias'
import { wrapperEnv } from './build'

const root: string = process.cwd()
// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfigExport => {
  const { VITE_PORT, VITE_APP_API_URL, VITE_OUT_DIR, VITE_PUBLIC_PATH } = wrapperEnv(
    loadEnv(mode, root)
  )
  return {
    plugins: [
      vue({
        script: {
          defineModel: true
        }
      }),
      legacy({
        targets: ['defaults', 'not IE 11']
      }),
      svgLoader()
    ],
    resolve: {
      alias: createAlias([
        ['@/', 'src/'],
        ['#/', 'types/']
      ])
    },
    server: {
      // 是否开启 https
      https: false,
      // 端口号
      port: VITE_PORT,
      host: '0.0.0.0',
      proxy: createProxy(VITE_APP_API_URL)
    },
    base: VITE_PUBLIC_PATH
  }
}
