<template>
  <div class="item" @click="expanded = !expanded">
    <slot></slot>
    <div v-if="expanded" style="height: 100px; width: 50px; background: blue"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  data: () => ({
    expanded: false
  })
})
</script>

<style scoped>
.item {
  border: 1px solid red;
  margin: 1rem;
  padding: 1rem;
}
</style>
