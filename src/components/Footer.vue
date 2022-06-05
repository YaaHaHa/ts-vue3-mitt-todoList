<template>
  <div class="footer">
    <input type="checkbox" id="allChecked" v-model="all">
    <label for="allChecked">全选</label>
    <span>{{ allCompleted }}/{{ todos.length }}</span>
    <button @click="delAll">删除已完成</button>
  </div>
</template>

<script lang="ts">
import { Todo } from '../types/Todo';
import { inject, computed, getCurrentInstance } from 'vue'
export default {
  name: "Footer",
  setup(props: any, context: any) {
    let todos = inject('todos');

    // 创建计算属性，计算已完成的数量
    let allCompleted = computed(() => {
      return (todos as any).value.filter((t: Todo) => {
        return t.isCompleted === true;
      }).length;
    });

    let isCompleteds = (todos as any).value.reduce((pre: Todo[], cur: Todo) => {
      if (cur.isCompleted === true) {
        pre.push(cur);
      }
      return pre;
    }, []).length
    let all = computed({
      get() {
        let isCompleteds: number
        // 通过reduce过滤
        // isCompleteds = (todos as any).value.reduce((pre: Todo[], cur: Todo) => {
        //   if (cur.isCompleted === true) {
        //     pre.push(cur);
        //   }
        // }, []).length

        return allCompleted.value >= (todos as any).value.length
      },
      // 给复选框设置的计算属性设置set，省掉了再绑定事件
      set(value) {
        context.emit('changeAll',value);
      }
    })
    // 删除所有已完成的任务
    function delAll() {
      context.emit('delAll');

    }
    return { todos, allCompleted, delAll, all }
  }
};
</script>

<style scoped>
.footer {
  position: absolute;
  width: 600px;
  bottom: 0;

  border: 1px solid saddlebrown;
}
</style>