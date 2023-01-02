import { useResizeObserver } from '@vueuse/core';
import {
  defineComponent, ref, computed, CSSProperties,
} from 'vue';

export const VirtualScrollerItem = defineComponent({
  props: {
    offset: {
      required: true,
      type: Number,
    },

    index: {
      required: true,
      type: Number,
    },
  },
  emits: ['sizeUpdated'],
  setup(props, { emit, slots }) {
    const el = ref<HTMLElement | null>(null);

    const listItemStyles = computed((): CSSProperties => ({
      position: 'absolute',
      top: `${props.offset}px`,
      left: 0,
      right: 0,
    }));

    useResizeObserver(el, ([entry]) => {
      if (!entry) {
        return;
      }
      const { height } = entry.contentRect;
      emit('sizeUpdated', height);
    });

    return () => (
      <div
        ref={el}
        style={listItemStyles.value}
        aria-rowindex={props.index + 1}>
        { slots.default?.() }
      </div>
    );
  },
});
