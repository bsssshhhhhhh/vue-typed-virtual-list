# vue-typed-virtual-list

[![npm](https://img.shields.io/npm/v/vue-typed-virtual-list.svg)](https://npmjs.com/package/vue-typed-virtual-list) [![size](https://img.shields.io/bundlephobia/minzip/vue-typed-virtual-list?label=size)](https://bundlephobia.com/package/vue-typed-virtual-list) [![vue3](https://img.shields.io/badge/vue-3.x-blue.svg)](https://vuejs.org/) [![Typescript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

A fast, type-safe virtual list component for Vue 3.

[Live Demo](https://bsssshhhhhhh.github.io/vue-typed-virtual-list/) **&middot;** [Try it on CodeSandbox](https://codesandbox.io/s/vue-typed-virtual-list-w26j1l?file=/src/App.vue)

Features:
- Extremely efficient calculations
- Provides generic type safety inside the `#item` slot
- Automatically and transparently deals with variable element heights
- Small footprint. <10KB gzipped, including dependencies



## Usage

Example:

```vue
<template>
  <div>
    <VirtualScroller
      :default-size="40"
      :items="someArrayOfUsers"
    >
      <template #item="{ ref, offset, index }">
        <!-- `ref` is the array item. Thanks to Volar, `ref` has the type `User` here -->

        {{ ref.name }}
      </template>
    </VirtualScroller>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { createVirtualScroller } from 'vue-typed-virtual-list';

type User = {
  id: number;
  name: string;
  phone: string;
};

export default defineComponent({
  components: {
    // pass the item type as a type parameter to enable type safety in the item slot
    VirtualScroller: createVirtualScroller<User>()
  },
  data: () => ({
    someArrayOfUsers: Array
      .from(Array(100))
      .map((_, i) => ({
        id: i + 1,
        name: 'Name',
        phone: 'Phone'
      }))
  })
})
</script>
```

or, with `<script setup>`:

```vue
<script setup lang="ts">
import { createVirtualScroller } from 'vue-typed-virtual-list';

const VirtualScroller = createVirtualScroller<User>();

type User = {
  id: number;
  name: string;
  phone: string;
};

const someArrayOfUsers: User[] = Array
  .from(Array(100))
  .map((_, i) => ({
    id: i + 1,
    name: 'Name',
    phone: 'Phone'
  }));

</script>
```

#### JavaScript Usage

If you're not using TypeScript in your project:

```diff
-const VirtualScroller = createVirtualScroller<User>();
+const VirtualScroller = createVirtualScroller();
```

### Props

- `defaultSize` - Placeholder size to use in calculations before an item's actual height has been measured
- `items` - Array of items to render
- `padding` - Number of items beyond what is visible in the overflow viewport to render. *(Default: 10)*

### Emits

- `visibleItemsChanged` - Fired when the start/end indices have changed
  - argument type: `{ start: number; end: number }`


### Exposed Instance Methods

-  `scrollTo(index: number): void` - scrolls an index into view ([Example](https://github.com/bsssshhhhhhh/vue-typed-virtual-list/blob/gh-pages-src/src/App.vue#L71-L78))




### Development

```
yarn
yarn dev
```

### Contributing

PRs welcome
