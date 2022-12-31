import { computed, reactive, ref, Ref, isRef, watch } from 'vue';
import { MaybeRef } from '@vueuse/core';
import { ItemContext, ScrollerArray } from './types';
import { binaryClosest } from './utils';
import { debounce } from 'lodash';

type DyanmicSizeScrollerArgs<T> = {
  items: MaybeRef<ScrollerArray<T>>;
  assumedSize: MaybeRef<number>;
  scrollPosition: Ref<number>;
  containerSize: Ref<number>;
  padding: MaybeRef<number>;

  onItemsChanged?: (arg: { start: number, end: number }) => void;
  onTotalSizeChanged?: (delta: number) => void;
}

const OFFSET_DEBOUNCE_INTERVAL = 1;

const resolveMaybeRef = <T>(ref: MaybeRef<T>) => (isRef(ref) ? ref.value : ref);

export function useDynamicSizeScroller<T>(args: DyanmicSizeScrollerArgs<T>) {
  const getItems = () => resolveMaybeRef(args.items);
  const getAssumedSize = () => resolveMaybeRef(args.assumedSize);
  const getPadding = () => resolveMaybeRef(args.padding);

  const measuredSizes = reactive<Record<number, number>>({});
  const measure = (index: number, size: number) => {
    measuredSizes[index] = size;
    updateOffsets();
  };

  const offsets = ref<Record<number | 'length', number>>({ length: 0 });
  const updateOffsets = debounce(() => {
    const items = getItems();
    offsets.value.length = items.length;

    offsets.value[0] = 0;
    for (let i = 1; i < items.length; i++) {
      offsets.value[i] = offsets.value[i - 1]! + (measuredSizes[i - 1] ?? getAssumedSize());
    }
  }, OFFSET_DEBOUNCE_INTERVAL);

  const getOffset = (index: number) => offsets.value[index];

  updateOffsets();
  updateOffsets.flush();


  let lastStart = 0;
  let lastEnd = 0;

  const visibleItems = computed(() => {
    // since `offsets` is sorted, we can use a binary search instead of a linear search
    let start = binaryClosest(offsets.value, args.scrollPosition.value);
    let end = start;

    while (offsets.value[end]! < offsets.value[start]! + args.containerSize.value) {
      end++;
    }

    const halfPadding = Math.ceil(getPadding() / 2);
    start = Math.max(0, start - halfPadding);
    end += halfPadding + 1;

    if (lastStart !== start || lastEnd !== end) {
      lastStart = start;
      lastEnd = end;

      args.onItemsChanged?.({ start, end });
    }

    return getItems()
      .slice(start, end)
      .map((item, index): ItemContext<T> => ({
        index: index + start,
        ref: item,
        offset: offsets.value[index + start] ?? 0
      }));
  });

  const totalSize = computed(() => {
    const len = getItems().length;
    if (len === 0) {
      return 0;
    }
    return offsets.value[len - 1]! + (measuredSizes[len - 1] ?? getAssumedSize());
  });

  watch(totalSize, (newValue, oldValue) => {
    if (newValue !== oldValue) {
      args.onTotalSizeChanged?.(newValue - oldValue);
    }
  });

  return {
    getOffset,
    measure,
    visibleItems,
    totalSize
  };
}
