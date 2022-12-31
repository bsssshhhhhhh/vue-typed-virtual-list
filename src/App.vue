
<template>
  <div class="list-wrapper">
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
import { createVirtualScroller } from 'vue-typed-virtual-list';
import ExpandableThing from './ExpandableThing.vue';
const VirtualList = createVirtualScroller<TestItem>();

type TestItem = {
  id: number;
}

const arr: TestItem[] = Array
  .from(Array(100000))
  .map((_, i) => ({
    id: i + 1
  }));

</script>

<style>
.list-wrapper {
  height: 800px;
  width: 600px;
}
</style>