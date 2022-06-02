<template>
  <div class="item" @mouseenter="showBt(true)" @mouseleave="showBt(false)">
    <input type="checkbox" v-model="isCompleted">
    <span :style="{ marginLeft: '10px' }">{{ content }}</span>
    <button v-show="isShow" class="btn" @click="delTodo({ id, content })">删除</button>
    <!-- 方法2通过index删 -->
    <!-- <button v-show="isShow" class="btn" @click="delTodo(index)">删除</button> -->
  </div>
</template>

<script lang="ts">
import { ref, getCurrentInstance } from "@vue/runtime-core";
export default {
  name: "Item",
  props: ['id', 'content', "isCompleted", "index"],
  setup(props: any) {
    // 拿到当前实例
    const currentInstance = getCurrentInstance() as any
    // 拿到实例上的全局属性
    const mitterBus = currentInstance.appContext.config.globalProperties.mitterBus
    const isShow = ref<boolean>(false);
    function showBt(flag: boolean) {
      isShow.value = flag;
    }
    // 方法1，因App中设置了todos的toRef，且provice传的是响应式的数据
      function delTodo(todo: { id: string, content: string }) {
        mitterBus.$emit('delTodo', todo)
      }
    // 方法2，通过index删
/*     function delTodo(index:number) {
      mitterBus.$emit('delTodo', index)
    } */
    return { isShow, showBt, delTodo }
  }
};
</script>

<style scoped>
.item {
  width: 100%;
  height: 40px;
  line-height: 40px;
}

.item:hover {
  background: rgba(0, 0, 0, .5);
}

.btn {
  float: right;
  margin-right: 20px;
  height: 34px;
  margin-top: 3px;
}
</style>