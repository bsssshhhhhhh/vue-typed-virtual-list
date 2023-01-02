import {
  defineComponent, ref, PropType, VNode, toRefs, computed, CSSProperties,
} from 'vue';
import { useElementSize } from '@vueuse/core';
import { useDynamicSizeScroller } from './dynamic-scroller';
import { ItemContext } from './types';
import { useScrollDirection } from './scroll-direction';
import { VirtualScrollerItem } from './VirtualScrollerItem';

export function createVirtualScroller<T>() {
  const VirtualScroller = defineComponent({
    props: {
      items: {
        required: true,
        type: Array as PropType<T[]>,
      },

      defaultSize: {
        type: Number,
        required: true,
      },

      padding: {
        type: Number,
        default: 10,
      },
    },

    emits: ['visibleItemsChanged'],

    setup(propsObject, { emit, slots }) {
      const props = toRefs(propsObject);

      const container = ref<HTMLDivElement | null>(null);
      const scrollPosition = ref(0);
      const { height } = useElementSize(container);
      const { scrollDirection } = useScrollDirection(scrollPosition);

      const scroller = useDynamicSizeScroller({
        assumedSize: props.defaultSize,
        items: props.items,
        scrollPosition,
        containerSize: height,
        padding: props.padding,

        onItemsChanged: (arg) => emit('visibleItemsChanged', arg),

        onTotalSizeChanged: (delta) => {
          if (!container.value
            || scrollDirection.value !== 'up'
            || scrollPosition.value === 0) {
            return;
          }
          container.value.scrollTop += delta;
        },
      });

      const spacerStyles = computed((): CSSProperties => ({
        width: '1px',
        height: `${scroller.totalSize.value}px`,
      }));

      return () => (
        <div
          aria-rowcount={props.items.value.length}
          onScroll={() => { scrollPosition.value = container.value?.scrollTop ?? 0; }}
          ref={container}
          style={{
            height: '100%',
            overflowY: 'auto',
            position: 'relative',
          }}
        >

          <div style={spacerStyles.value} />

          {
            scroller.visibleItems.value.map((item) => <VirtualScrollerItem
                key={item.index}
                onSizeUpdated={(size: number) => scroller.measure(item.index, size)}
                offset={item.offset}
                index={item.index}
              >
                { slots.item?.(item) }
              </VirtualScrollerItem>)
          }
        </div>
      );
    },
  });

  return VirtualScroller as typeof VirtualScroller & {
    new(): {
      $slots: {
        item: (ctx: ItemContext<T>) => VNode[]
      }
    }
  };
}
