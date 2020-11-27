<template>
  <div id="app">
    <span>66{{num | searchLabel('districtStatus')}}</span>
    <jvButton @click="show(1,2,3)"></jvButton>
  </div>
</template>

<script>
import test from './components/test.vue'

export default {
  name: 'app',
  data() {
    return {
      num:1
    }
  },
  mounted() {
    console.log(this)
  },
  methods:{
    show(x,y,z){
      console.log(this)
      console.log(this.utils.test1.sum1(x,y,z))
    }
  }
}
</script>