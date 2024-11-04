import type { App } from "vue";
import { createPinia } from "pinia";
const store = createPinia();

// 设置状态管理
export function setupStore(app: App<Element>) {
  app.use(store);
}

export { store };
