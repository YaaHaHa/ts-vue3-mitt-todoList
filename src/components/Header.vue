<template>
  <div class="header">
    <!-- 不同于vue2的$ref，vue3的模板中依旧写ref，在setup中要返回才能真正响应式 -->
    <input type="text" placeholder="请输入名称" v-model="todoContent" />
    <button @click="addItem">确定</button>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
export default {
  name: "Header",
  props: ["todos"],
  setup(props:any, content:any) {
    // const input = ref(Element ||null);
    const todoContent = ref('')
    function addItem() {
      if(!todoContent.value.trim()){
        return;
      }
      content.emit("addItem", { id: Date.now(), content: todoContent.value });
      todoContent.value = ''
    }
    return {
      addItem,
      todoContent,
    };
  },
};
</script>

<style scoped>
.header {
  width: 100%;
  text-align: center;
  border: 1px solid aqua;
}
input {
  width: 80%;
  height: 20px;
  font-size: 20px;
}
</style>