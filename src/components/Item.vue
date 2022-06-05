<template>
  <div class="item" @mouseenter="showBt(true)" @mouseleave="showBt(false)">
    <input type="checkbox" v-model="isCompleted" @change="changeStatus({ id, isCompleted })">
    <span :style="{ marginLeft: '10px' }" v-show="!todo.isEdit" @dblclick="showEdit">{{ content }}</span>
    <button v-show="isShow" class="btn" @click="delTodo({ id, content })">删除</button>
    <!-- 方法2通过index删 -->
    <!-- <button v-show="isShow" class="btn" @click="delTodo(index)">删除</button> -->

    <!-- 使用了todo.isEdit，因为isEdit是动态生成的，需要在setup里被找得到 失去焦点是用户不想改了，按回车是用户想改-->
    <input type="text" v-show="todo.isEdit" ref="editInput" v-model="editContent" @blur="cancelInput($event)"
      @keyup.enter="save($event)">
  </div>
</template>

<script lang="ts">
import { ref, getCurrentInstance, toRefs, nextTick, onBeforeUnmount } from "@vue/runtime-core";
export default {
  name: "Item",
  props: ['todo'],
  setup(props: any) {

    const todo = props.todo;
    const editInput = ref(null)
    // 为什么还要单独创建一个ref给input，因为不能用todo里的content，不能这边输入框一改一点，App那边也全都改吧
    let editContent = ref(todo.content)
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
      if (todo.isEdit === undefined) {
        todo.isEdit = true;
      }
      todo.isEdit = true;
      nextTick(() => {
        console.log((editInput as any).value.focus());
      })
    };
    // 失去焦点，输入框消失
    function cancelInput(e: any) {
      todo.isEdit = false;
      // editContent继续与todo.content一致
      editContent.value = todo.content;
    }
    // 保存修改的回调
    function save(e: any): void {
      console.log("按了回车");
      todo.isEdit = false;
      // 触发自定义事件，把值给App，这里使用了扩展运算符与属性的重写
      mitterBus.$emit('updateContent', { ...todo, content: editContent.value })
      editContent.value = todo.content;

    }
    onBeforeUnmount(() => {
      delete todo.isEdit;
    });
    // 传过来的todo直接toRefs拿到模板中用
    return {
      isShow, showBt, delTodo, changeStatus, showEdit, ...toRefs(todo), todo, editInput, editContent, cancelInput, save
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