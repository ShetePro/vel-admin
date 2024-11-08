import { defineComponent, h } from 'vue'

export default defineComponent({
  props: {
    name: String,
    slots: Object,
    row: Object
  },
  setup(props) {
    return () => h('span', props.slots?.[props.name || 'default']?.({ row: props.row }))
  }
})
