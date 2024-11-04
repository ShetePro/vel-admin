import { MenuDataTypeEnum } from "@/enum/settingsEnum";

export type MenuDataItem = {
  id: string;
  menuName: string;
  menuPath: string;
  icon: string;
  meta?: { isTab: boolean };
  keepAlive?: boolean;
  transition?: string;
  type: MenuDataTypeEnum;
  children: MenuDataItem[];
  [key: string]: any;
};
export const menuData: MenuDataItem[] = [
];
