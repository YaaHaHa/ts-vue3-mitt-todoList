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
  setup(props: any, content: any) {
    // vue3中这么拿ref，import先引入ref，创建一个新的ref，以ref的名字(input)命名，在setup的return里面返回(input)
    // const input = ref(null);
    const todoContent = ref('')
    function addItem() {
      if (!todoContent.value.trim()) {
        return;
      }
      content.emit("addItem", { id: Date.now(), content: todoContent.value, isCompleted: false });
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
  height: 40px;

}

input {

  width: 80%;
  height: 30px;
  line-height: 40px;
  font-size: 18px;
  border-radius: 5px;
}

button {
  background-color: #da4f49;
  border-color: #bd362f;
  height: 36px;
  border-radius: 5px;
  color: #fff;
  padding: 4px 12px;
  cursor: pointer;

  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 1px 2px rgba(0, 0, 0, 0.05);
}

button:hover {
  color: #fff;
  background: #bd362f;
}
</style>