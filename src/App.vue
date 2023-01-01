
<template>
  <div class="list-wrapper">
    <VirtualList
      :default-size="84"
      :items="arr">
      <template #item="{ index, offset, ref }">
        <div class="list-item">
          <div><strong>User ID:</strong> {{ ref?.id }}</div>
          <div><strong>Name:</strong> {{ ref?.name }}</div>
          <div><strong>Notes:</strong> {{ ref?.notes }}</div>
        </div>
      </template>
    </VirtualList>


    <a href="https://github.com/bsssshhhhhhh/vue-typed-virtual-list/blob/gh-pages-src/src/App.vue">Source</a>
  </div>
</template>

<script lang="ts" setup>
import { createVirtualScroller } from 'vue-typed-virtual-list';
import { faker } from '@faker-js/faker';

const VirtualList = createVirtualScroller<User>();

type User = {
  id: number;
  name: string;
  notes: string;
}

const lorem = faker.lorem.lines(10).split('\n');

const arr: User[] = Array
  .from(Array(100000))
  .map((_, i) => ({
    id: i + 1,
    name: faker.name.fullName(),
    notes: lorem.slice(0, Math.ceil(Math.random() * 10)).join('\n')
  }));

</script>

<style>
* {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.list-wrapper {
  height: 800px;
  width: 600px;
  max-width: 100%;
}

.list-item {
  margin: 0.5rem 1rem;
  padding: 1rem;
  border-bottom: 1px solid grey;
}
</style>