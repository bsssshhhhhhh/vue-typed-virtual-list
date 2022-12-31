
<template>
  <div style="height: 800px">
    <VirtualList
      :default-size="84"
      :items="arr">
      <template #item="{ index, offset, ref }">
        <ExpandableThing>
          Item # {{ ref?.id }}
          <hr v-if="index % 3 === 0">
          <div v-if="index % 10 === 0" style="height: 30px; width: 30px; background: red" />
        </ExpandableThing>
      </template>
    </VirtualList>
  </div>
</template>

<script lang="ts" setup>
import { createVirtualScroller } from '../src/VirtualScroller';
import ExpandableThing from './ExpandableThing.vue';
const VirtualList = createVirtualScroller<TestItem>();

type TestItem = {
  id: number;
}

const arr: TestItem[] = Array
  .from(Array(50000))
  .map((_, i) => ({
    id: i + 1
  }));

</script>
