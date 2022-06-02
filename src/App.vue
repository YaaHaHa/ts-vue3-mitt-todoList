<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <!-- <Child /> -->
  <Header :todos="todos" @addItem="addItem" />
  <List />
  <Footer />
</template>

<script lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
import Child from "./components/Child.vue";
import Header from "./components/Header.vue";
import List from "./components/List.vue";
import Footer from "./components/Footer.vue";
import { Todo } from './types/Todo'
import { provide, reactive, toRef, toRefs, watch, getCurrentInstance, onMounted } from "vue";


export default {
  name: "App",
  components: {
    HelloWorld,
    Child,
    Header,
    List,
    Footer,
  },
  setup() {
    /*     let states = reactive<{ todos: Todo[] }>({
          todos: [
            { id: '1', content: '第一条', isCompleted: false },
            { id: '2', content: '第二条', isCompleted: true },
            { id: '3', content: '第三条', isCompleted: false }
          ]
        }); */
    /* const todos = reactive<Todo[]>([
      { id: '1', content: '第一条', isCompleted: false },
      { id: '2', content: '第二条', isCompleted: true },
      { id: '3', content: '第三条', isCompleted: false }
    ]
    ); */
    //    这里满足JSON.parse的解析要求，符合被解析的格式
    // let todos = reactive<Todo[] | []>(JSON.parse(localStorage.getItem('todos') || '[{"id":"1","content":"原始值","isCompleted":false}]'))
    let states = reactive<{ todos: Todo[] }>({
      todos: JSON.parse(localStorage.getItem('todos') || '[{"id":"1","content":"原始值","isCompleted":false}]')
    });

    // 要给todos设置响应式，不然删除的时候需要最简单的方法是splice
    let todos = toRef(states, "todos")

    // 把响应式ref的todos传值给后代，当这里改变todos的时候。inject那里就能马上获取最新的了
    // 方法1
    provide("todos", todos);
    // 方法2直接传死的，这样是没有响应式的
/*     provide: {
      todos: states.todos
    } */

    // 添加
    function addItem(value: Todo) {
      // 因为unshift本身就是响应式的，所以直接使用就是会触发页面的更新
      todos.value.unshift(value);

    };


    // 拿到当前实例，因为要用到全局事件总线   类型断言
    const currentInstance = (getCurrentInstance() as any);
    // 拿到实例上的全局属性
    const mitterBus = currentInstance.appContext.config.globalProperties.mitterBus

    // 删除todo，方法1
    function delTodo(todo: { id: string, content: string }) {
      if (window.confirm(`${todo.content}将被删除！`)) {

        // 当todos被设置成代理后，toRef后，下面这样写才能触发响应式，一删马上更新页面
        todos.value = todos.value.filter((t) => t.id !== todo.id);
      } 


    }
    // 删除todo，方法2，不需要设置states.todos的toRef
/*     function delTodo(index: number) {
      if (window.confirm(`${index}将被删除！`)) {
        // 因为splice是响应式方法，即使states.todos没设置toRef也会刷新
        states.todos.splice(index, 1)  //用index算的时候
      }
    } */
    onMounted(() => {
      // 绑定
      mitterBus.$on('delTodo', delTodo);
      // console.log(mitterBus)


    });
    // 监视todos变了就改，因为watch监视的对象不包括普通对象，所以用箭头函数指定需要被监视的数据
    watch(() => states.todos, () => {
      console.log('监视todos了')
      localStorage.setItem('todos', JSON.stringify(states.todos))
    }, { deep: true })
    return {
      ...toRefs(states),
      addItem,
    };
  },
};
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
#app {
  height: 400px;
  width: 600px;
  /* background: #000; */
  border: 1px solid #000;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
}
</style>