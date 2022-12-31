# vue-typed-virtual-list

[![npm](https://img.shields.io/npm/v/vue-typed-virtual-list.svg)](https://npmjs.com/package/vue-typed-virtual-list) ![size](https://img.shields.io/bundlephobia/minzip/vue-typed-virtual-list?label=size) [![vue3](https://img.shields.io/badge/vue-3.x-brightgreen.svg)](https://vuejs.org/) ![Typescript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)

A fast, type-safe virtual list component for Vue 3.

Features:
- Extremely efficient calculations
- Provides generic type safety inside the `#item` slot
- Automatically and transparently deals with variable element heights
- Small footprint. 1.71KB gzipped

## Usage

Example:

```vue
<template>
  <div>
    <VirtualScroller
      :default-height="40"
      :items="someArrayOfUsers"
    >
      <template #item="{ ref }">
          <!-- thanks to Volar, `ref` has the type `User` here -->
          {{ ref.name }}
      </template>
    </VirtualScroller>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { createVirtualScroller } from 'vue-typed-virtual-list';

type User = {
  id: string;
  name: string;
  phone: string;
};

export default defineComponent({
  components: {
    // pass the item type as a type parameter to enable type safety in the item slot
    VirtualScroller: createVirtualScroller<User>()
  }
})
</script>
```

or, with `<script setup>`:

```vue
<script setup lang="ts">
import { createVirtualScroller } from 'vue-typed-virtual-list';

const VirtualScroller = createVirtualScroller<User>();

type User = {
  id: string;
  name: string;
  phone: string;
};

</script>
```

### Props

- `defaultHeight` - Placeholder size to use in calculations before an item's actual height has been measured
- `items` - Array of items to render

### Emits

- `visibleItemsChanged` - Fired when the start/end indices have changed
  - argument type: `{ start: number; end: number }`


### Development

```
yarn
yarn dev
```
