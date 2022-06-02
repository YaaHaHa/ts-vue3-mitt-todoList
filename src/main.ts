import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { bus } from './mitter/index'



const app = createApp(App);
// 因为在App组件里的onMounted钩子里要用到mitterBus，所以先放进去，再挂载App，不然拿不到mitterBus
app.config.globalProperties.mitterBus = bus;
app.use(store).use(router).mount('#app')

// 如果vue-Devtools不显示了，这里拿出来执行一遍
/* const win: any = window 

if (process.env.NODE_ENV === 'development') {

    if ('__VUE_DEVTOOLS_GLOBAL_HOOK__' in win) {

        win.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app

    }

} */