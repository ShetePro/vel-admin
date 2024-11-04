<template>
  <div :class="getClassNames" @click="clickButton" v-if="postPermission">
    <slot>
      <slot name="icon">
        <Icon v-if="icon !== ''" :icon="icon"></Icon>
      </slot>
      <slot name="label">
        <span>{{ label }}</span>
      </slot>
    </slot>
  </div>
</template>

<script>
import Icon from '@/components/Icon/src/Icon.vue'
import { defineComponent } from 'vue'
import { usePermissions } from '@/hook/usePermissions'
export default defineComponent({
  name: 'iconButton',
  components: { Icon },
  props: {
    icon: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'primary'
    },
    color: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    permission: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      prefixCls: 'components-icon-button'
    }
  },
  computed: {
    getClassNames() {
      const classNames = [this.prefixCls]
      switch (this.type) {
      case 'primary':
        classNames.push('components-icon-button-primary')
        break
      case 'success':
        classNames.push('components-icon-button-success')
        break
      case 'danger':
        classNames.push('components-icon-button-danger')
        break
      case 'warning':
        classNames.push('components-icon-button-warning')
        break
      case 'info':
        classNames.push('components-icon-button-info')
        break
      }
      if (this.disabled) {
        classNames.push('components-icon-button-disabled')
      }
      return classNames.join(' ')
    },
    postPermission() {
      const [permission] = usePermissions()
      return this.permission ? permission[this.permission] : true
    }
  },
  methods: {
    clickButton(e) {
      if (!this.disabled) {
        this.$emit('action')
      }
    }
  }
})
</script>

<style lang="scss">
$--icon-button-primary-color: #68b2ff;
$--icon-button-success-color: #65ca3d;
$--icon-button-danger-color: #ec7063;
$--icon-button-warning-color: #f39c12;
$--icon-button-info-color: #909497;
.components-icon-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  color: #fdfefe;
  background: #fdfefe;
  margin: 5px;
  background-color: transparent;
  cursor: pointer;
  height: 40px;
  margin-right: 5px;
  transition: all 0.3s ease-in;
  min-width: 40px;
  i {
    font-size: 16px;
    height: 50%;
  }
  span {
    height: 50%;
  }
  &-disabled {
    cursor: not-allowed;
  }
  &-disabled.components-icon-button-primary {
    color: #90bdec;
    &:hover {
      color: #90bdec;
    }
  }
  &-disabled.components-icon-button-success {
    color: #bce6ab;
    &:hover {
      color: #bce6ab;
    }
  }
  &-disabled.components-icon-button-danger {
    color: #f3bfba;
    &:hover {
      color: #f3bfba;
    }
  }
  &-disabled.components-icon-button-warning {
    color: #f0d898;
    &:hover {
      color: #f0d898;
    }
  }
  &-disabled.components-icon-button-info {
    color: #aaaaaa;
    &:hover {
      color: #aaaaaa;
    }
  }
  &-primary {
    color: $--icon-button-primary-color;
    &:hover {
      color: #2e86c1;
    }
  }
  &-success {
    color: $--icon-button-success-color;
    &:hover {
      color: #1e8449;
    }
  }
  &-danger {
    color: $--icon-button-danger-color;
    &:hover {
      color: #cb4335;
    }
  }
  &-warning {
    color: $--icon-button-warning-color;
    &:hover {
      color: #e67e22;
    }
  }
  &-info {
    color: $--icon-button-info-color;
    &:hover {
      color: #616a6b;
    }
  }
}
</style>
