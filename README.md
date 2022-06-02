## 全局属性
### 挂载全局属性
    app.config.globalProperties.变量名
### 拿到实例上的全局属性
    const mitterBus = currentInstance.appContext.config.globalProperties.mitterBus


### 如果vue-Devtools不显示了，这里拿出来执行一遍
 const win: any = window 

```javascript
if (process.env.NODE_ENV === 'development') {

    if ('__VUE_DEVTOOLS_GLOBAL_HOOK__' in win) {

        win.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app

    }

} 
```