<template>
  <div class="footer">
    <input type="checkbox">
  </div>
</template>

<script lang="ts">
import { Todo } from '../types/Todo'
import { inject, computed } from 'vue'
export default {
  name: "Footer",
  setup() {
    const todos = inject('todos');
   /*  let isDone = computed(() => {
      // 类型断言，我知道自己在做什么
      (<Todo[]>todos>).forEach(element => {
        
      });
      return (todos).length
    }) */
    return { todos }
  }
};
</script>

<style scoped>
.footer {
  position: absolute;
  width: 600px;
  bottom: 0;
  text-align: center;
  border: 1px solid saddlebrown;
}
</style>