
<template>
  <div class="list-wrapper">
    <VirtualList
      ref="scroller"
      :default-size="196"
      :items="arr">
      <template #item="{ index, offset, ref }">
        <div class="list-item">
          <div><strong>User ID:</strong> {{ ref?.id }}</div>
          <div><strong>Name:</strong> {{ ref?.name }}</div>
          <div><strong>Notes:</strong> {{ ref?.notes }}</div>
        </div>
      </template>
    </VirtualList>
    <div>
      Go To Index: <input type="number" v-model="gotoIndex" />
    </div>
    <a href="https://github.com/bsssshhhhhhh/vue-typed-virtual-list/blob/gh-pages-src/src/App.vue">Source</a>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { createVirtualScroller } from 'vue-typed-virtual-list';

const VirtualList = createVirtualScroller<User>();

type User = {
  id: number;
  name: string;
  notes: string;
}

const lorem = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  'Integer vitae justo eget magna fermentum iaculis eu non.',
  'Dolor purus non enim praesent elementum.',
  'Cursus eget nunc scelerisque viverra mauris in.',
  'Diam ut venenatis tellus in.',
  'Et netus et malesuada fames ac.',
  'Enim praesent elementum facilisis leo vel fringilla.',
  'Adipiscing bibendum est ultricies integer quis auctor.',
  'Interdum varius sit amet mattis vulputate enim nulla.',
  'Purus sit amet luctus venenatis lectus magna fringilla urna porttitor.'
];

const names = [
  'Maksymilian Welch',
  'Jakub Campbell',
  'Edwin Griffith',
  'Euan Stewart',
  'Sandra Hull',
  'Lewis Escobar',
  'Jodie Villegas',
  'Karim Baird',
  'Vivian Trevino',
  'Cecily Knox',
];


const arr: User[] = Array
  .from(Array(70000))
  .map((_, i) => ({
    id: i + 1,
    name: names[i % names.length],
    notes: lorem.slice(0, Math.ceil(Math.random() * lorem.length)).join('\n')
  }));


type VirtualListInstance = InstanceType<typeof VirtualList>;
const scroller = ref<VirtualListInstance | null>(null);
const gotoIndex = ref(0);
watch(gotoIndex, () => {
  scroller.value?.scrollTo(gotoIndex.value);
})

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
