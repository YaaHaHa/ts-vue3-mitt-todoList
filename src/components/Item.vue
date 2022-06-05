<template>
  <div class="item" @mouseenter="showBt(true)" @mouseleave="showBt(false)">
    <input type="checkbox" v-model="isCompleted" @change="changeStatus({ id, isCompleted })">
    <span :style="{ marginLeft: '10px' }" @dblclick="showEdit">{{ content }}</span>
    <button v-show="isShow" class="btn" @click="delTodo({ id, content })">删除</button>
    <!-- 方法2通过index删 -->
    <!-- <button v-show="isShow" class="btn" @click="delTodo(index)">删除</button> -->
    <input type="text" v-show="isEdit" ref="editInput" v-model="editContent">
  </div>
</template>

<script lang="ts">
import { ref, getCurrentInstance, toRefs, nextTick, onBeforeUnmount } from "@vue/runtime-core";
export default {
  name: "Item",
  props: ['todo'],
  setup(props: any) {

    const editInput = ref(null)
    // 为什么还要单独创建一个ref给input，因为不能用todo里的content，不能这边输入框一改一点，App那边也全都改吧
    let editContent = ref(props.todo.content)
    // 拿到content，不然v-model直接就改了，我们要按回车才改
    // 拿到实例上的全局属性
    // 拿到当前实例上的mitterBus，?的用法是前面的有了才会去访问后面的
    const mitterBus = getCurrentInstance()?.appContext.config.globalProperties.mitterBus
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

    // 更改完成状态
    function changeStatus(todo: { id: string, isCompleted: boolean }) {
      mitterBus.$emit('changeStatus', todo)
    }

    // 转换到输入模式
    function showEdit() {

      // 如果当前todo上有isEdit，就让他为true，没有就添加一个
      if (props.todo.isEdit === undefined) {
        props.todo.isEdit = true;
      }
      props.todo.isEdit = true;
      nextTick(() => {
        console.log((editInput as any).value.focus());
      })
    };
    onBeforeUnmount(() => {
      delete props.todo.isEdit;
    });
    // 传过来的todo直接toRefs拿到模板中用
    return {
      isShow, showBt, delTodo, changeStatus, showEdit, ...toRefs(props.todo), editInput, editContent
    }
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