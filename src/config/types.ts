import { CacheTypeEnum } from "@/enum/cacheEnum";
import { LayoutModeTypeEnum, NavsTypeEnum } from "@/enum/settingsEnum";
import { PermissionsType } from "@/hook/usePermissions";

export interface SystemConfig {
  projectName: string;
  defaultPage: string;
  logoUrl: string,
  cacheType: CacheTypeEnum;
  cacheCipher:{ key: string; iv: string, cacheTimeOut: number },
  socketUrl?: string;
  headerHeight: string | number;
  menuWidth: string | number;
  menuProps: MenuPropsType
  colorMode: boolean;
  grayMode: boolean;
  weaknessMode: boolean;
  showNavs: boolean;
  navsType: NavsTypeEnum;
  permissionProps: Record<PermissionsType, string>
  layoutMode: LayoutModeTypeEnum;
  transition: boolean;
}

export interface MenuPropsType {
  children: string;
  name: string;
  path: string;
  meta: string;
  icon: string;
  type: string;
}

