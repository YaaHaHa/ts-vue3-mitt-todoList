<template>
  <div class="list">
    <Item v-for="(t,index) in todos" :key="t.id" :id="t.id" :content="t.content" :isCompleted="t.isCompleted" :index="index"/>
  </div>
</template>

<script lang="ts">
import { inject, watch } from '@vue/runtime-core';
import Item from "./Item.vue";
export default {
  name: "List",
  components: { Item },
  setup() {
    const todos = inject('todos');
    return { todos }
  }
};
</script>

<style scoped>
.list {
  border: 1px solid red;
}
</style>