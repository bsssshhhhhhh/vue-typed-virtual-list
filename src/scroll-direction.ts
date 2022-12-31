import { ref, Ref, watch } from 'vue';

export function useScrollDirection(scrollPosition: Ref<number>) {
  const scrollDirection = ref<'up' | 'down'>('down');
  watch([scrollPosition], ([newValue], [oldValue]) => {
    if (newValue > oldValue) {
      scrollDirection.value = 'down';
    } else if (newValue < oldValue) {
      scrollDirection.value = 'up';
    }
  });

  return {
    scrollDirection
  };
}
