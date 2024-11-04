import { Directive, type DirectiveBinding, type VNode  } from "vue";
import { useDebounceFn, useResizeObserver } from "@vueuse/core";

export const resize: Directive = {
  mounted(el: HTMLElement, binding?: DirectiveBinding, vnode?: VNode) {
    if (binding?.value) {
      // 监听元素大小变化
      useResizeObserver(el, useDebounceFn(() => {
        binding?.value(el);
      }, 200));
    }
  },
  unmounted(el: HTMLElement) {
    // 卸载监听
    el.onresize = null;
  }
};
