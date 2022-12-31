import { useDynamicSizeScroller } from './dynamic-scroller';
import { defineComponent, ref, PropType, VNode, toRefs, computed, CSSProperties } from 'vue';
import { ItemContext } from './types';
import { useElementSize, useResizeObserver } from '@vueuse/core';
import { useScrollDirection } from './scroll-direction';

export function createVirtualScroller<T>() {

  const ScrollerItem = defineComponent({
    emits: ['sizeUpdated'],
    props: {
      offset: {
        required: true,
        type: Number
      },

      index: {
        required: true,
        type: Number
      }
    },
    setup(props, { emit, slots }) {
      const el = ref<HTMLElement | null>(null);

      const listItemStyles = computed((): CSSProperties => ({
        position: 'absolute',
        transform: `translateY(${props.offset}px)`,
        top: 0,
        left: 0,
        right: 0
      }));

      useResizeObserver(el, ([entry]) => {
        requestAnimationFrame(() => {
          if (!entry) {
            return;
          }
          const { height } = entry.contentRect;
          emit('sizeUpdated', height);
        });
      });

      return () => (
        <div
          ref={el}
          style={listItemStyles.value}
          aria-rowindex={props.index + 1}>
          { slots.default?.() }
        </div>
      );
    }
  });

  const VirtualScroller = defineComponent({
    props: {
      items: {
        required: true,
        type: Array as PropType<T[]>,
      },

      defaultSize: {
        type: Number,
        required: true
      },

      padding: {
        type: Number,
        default: 10
      }
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
        }
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
            position: 'relative'
          }}
        >

          <div style={spacerStyles.value} />

          {
            scroller.visibleItems.value.map((item) =>
              <ScrollerItem
                key={item.index}
                onSizeUpdated={(height: number) => scroller.measure(item.index, height)}
                offset={item.offset}
                index={item.index}
              >
                { slots.item?.(item) }
              </ScrollerItem>
            )
          }
        </div>
      );
    }
  });

  return VirtualScroller as typeof VirtualScroller & {
    new(): {
      $slots: {
        item: (ctx: ItemContext<T>) => VNode[]
      }
    }
  };
}
