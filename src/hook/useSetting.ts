import { useSettingStore } from "@/store/modules/settings";
import { LayoutModeTypeEnum } from "@/enum/settingsEnum";

type UseSettingReturnType = {
  greyChange: (value: boolean) => void;
  weaknessChange: (value: boolean) => void;
  changeLayoutMode: (mode: LayoutModeTypeEnum) => void;
  colorChange: (color: string) => void;
}
export function useSetting(): UseSettingReturnType {
  const { setSetting } = useSettingStore()

  /** 灰色模式设置 */
  const greyChange = (value: boolean): void => {
    toggleClass(value, "html-grey", document.querySelector("html"));
    setSetting();
  };
  /** 色弱模式设置 */
  const weaknessChange = (value: boolean): void => {
    toggleClass(
      value,
      "html-weakness",
      document.querySelector("html")
    );
    setSetting();
  };
  const changeLayoutMode = (mode: LayoutModeTypeEnum) => {
    setSetting({
      layoutMode: mode,
    })
  }
  const colorChange = (color: string) => {
    const html = document.querySelector('html')
    if (html?.style) {
      html.style.setProperty('--el-color-primary', color)
    }
    setSetting();
  }
  return {
    greyChange,
    weaknessChange,
    changeLayoutMode,
    colorChange
  }
}
function toggleClass(flag: boolean, clsName: string, target?: HTMLElement | null) {
  const targetEl = target || document.body;
  let { className } = targetEl;
  className = className.replace(clsName, "").trim();
  targetEl.className = flag ? `${className} ${clsName} ` : className;
}
