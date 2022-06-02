<template>
  <!-- <h1>这里是Child</h1> -->
  <h1>{{ car }}</h1>
  <h2>品牌：{{ car.brand }}</h2>
  <h2>价格：（toRef）{{ price }}</h2>
  <button @click="pp">品牌</button>
  <button @click="jg">价格</button>
  <button @click="cd">长度</button>
</template>

<script>
import { reactive, toRaw, toRef, toRefs, watch } from "vue";
export default {
  name: "Child",
  setup() {
    let car = reactive({
      brand: "奔驰",
      price: "30",
      size: {
        length: 2,
      },
    });
    let price = toRef(car, "price");
    function pp() {
      /* reactiveFoo.brand += "!";
      console.log(reactiveFoo) */
      car.brand+='!'
    }
    function jg() {
      price.value++;
    }
    function cd() {
      car.size.length++;
    }

    // 关于reactive对象，deep强制true
    watch(
      car,
      (newValue, oldValue) => {
        console.log("car变化了", newValue, oldValue);
      },
      { deep: false }
    );

    watch(price, (newValue, oldValue) => {
      console.log("price变化了", newValue, oldValue);
    });
    // 由proxy转成了普通对象
    const reactiveFoo = toRaw(car)
    console.log(reactiveFoo)
    // return { ...toRefs(car) };
    return { car, price, pp, jg, cd };
  },
};
</script>

<style>
</style>