import { iconType } from "./types";
import { h, defineComponent, Component } from "vue";
import {Icon, FontIcon} from '../index'

/**
 * 支持 `iconfont`、自定义 `svg` 以及 `iconify` 中所有的图标
 * @param icon 必传 图标
 * @param attrs 可选 iconType 属性
 * @returns Component
 */
export function useRenderIcon(icon: any, attrs?: iconType): string | Component {
  // 判断是否时iconfont
  const ifReg = /^IF-/;
  if (ifReg.test(icon)) {
    // iconfont
    const name = icon.split(ifReg)[1];
    const iconName = name.slice(
      0,
      name.indexOf(" ") == -1 ? name.length : name.indexOf(" ")
    );
    const iconType = name.slice(name.indexOf(" ") + 1, name.length);
    return defineComponent({
      name: "FontIcon",
      render() {
        return h(FontIcon, {
          icon: iconName,
          iconType,
          ...attrs
        });
      }
    });
  } else if (typeof icon === "function" || typeof icon?.render === "function") {
    // svg
    return icon;
  } else {
    return defineComponent({
      name: "OfflineIcon",
      render() {
        return h(Icon, {
          icon: icon,
          ...attrs
        });
      }
    });
  }
}
