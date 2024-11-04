import { defineStore } from "pinia";
import { SettingType } from "@/store/types";
import systemSettings from "@/config/system";
import { SystemConfig } from "@/config/types";
import { getStorage, setStorage } from "@/utils/storage";
import { SETTINGS_KEY } from "@/enum/cacheEnum";

export const useSettingStore = defineStore({
  id: "system-setting",
  state: ():SettingType  => ({
    systemConfig: getStorage({key: SETTINGS_KEY}) || systemSettings,
    menuExpand: true,
  }),
  getters: {
    getSystemConfig(state): SystemConfig {
      return state.systemConfig;
    },
    getMenuExpand(state) {
      return state.menuExpand;
    }
  },
  actions: {
    setSetting(data: Record<string, unknown> = {}) {
      this.systemConfig = Object.assign(this.systemConfig, data);
      setStorage({
        key: SETTINGS_KEY,
        value: this.systemConfig,
      })
    },
    toggleMenuExpand() {
      this.menuExpand = !this.menuExpand;
    }
  }
});
