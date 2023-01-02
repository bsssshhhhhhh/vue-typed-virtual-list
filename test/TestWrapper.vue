<template>
  <div style="height: 800px">
    <VirtualList
      ref="scroller"
      :default-size="84"
      :items="arr">
      <template #item="{ index, ref }">
        <ExpandableThing>
          Item # {{ ref?.id }}
          <hr v-if="index % 3 === 0">
          <div v-if="index % 10 === 0" style="height: 30px; width: 30px; background: red" />
        </ExpandableThing>
      </template>
    </VirtualList>
  </div>
  <div>
    <input :value="gotoIndex" @input="onPositionInput" />
  </div>
</template>

<script lang="ts">
import { createVirtualScroller } from '../src/VirtualScroller';
import { defineComponent, ref } from 'vue';
import ExpandableThing from './ExpandableThing.vue';

const VirtualList = createVirtualScroller<TestItem>()
type VirtualListInstance = InstanceType<typeof VirtualList>;

type TestItem = {
  id: number;
}

export default defineComponent({
  components: {
    ExpandableThing,
    VirtualList,
  },
  setup() {
    const arr: TestItem[] = Array
      .from(Array(50000))
      .map((_, i) => ({
        id: i + 1
      }));

    const scroller = ref<VirtualListInstance | null>(null);
    const gotoIndex = ref(0);

    const onPositionInput = (e: Event) => {
      const value = Number((e.target as HTMLInputElement).value);
      if (!Number.isNaN(value)) {
        scroller.value?.scrollTo(value);
      }
    };

    return {
      arr,
      scroller,
      gotoIndex,
      onPositionInput,
    }
  }
});
</script>
