import { CacheTypeEnum } from '@/enum/cacheEnum'
import { SystemConfig } from '@/config/types'
import logoImage from '../../public/vite.svg?url'
import { LayoutModeTypeEnum, NavsTypeEnum } from '@/enum/settingsEnum'

const systemSettings: SystemConfig = {
  projectName: 'Vue Vel Admin',
  defaultPage: '/welcome',
  cacheType: CacheTypeEnum.SESSION,
  logoUrl: logoImage,
  cacheCipher: {
    key: '_11111000001111@',
    iv: '@11111000001111_',
    cacheTimeOut: 864000
  },
  menuWidth: 240,
  headerHeight: 50,
  // 路由数据参数配置
  menuProps: {
    name: 'menuName',
    path: 'menuPath',
    children: 'children',
    meta: 'meta',
    icon: 'icon',
    type: 'type'
  },
  permissionProps: {
    create: 'add',
    update: 'update',
    delete: 'delete',
    view: 'view',
    audit: 'audit'
  },
  colorMode: false,
  primaryColor: '#409eff',
  grayMode: false, // 暗黑模式
  weaknessMode: false, // 色弱模式
  showNavs: true, // 隐藏标签页
  navsType: NavsTypeEnum.flat,
  layoutMode: LayoutModeTypeEnum.twoMenu,
  transition: true
}
export default systemSettings
