<template>
  <div class="btn">
    <countTo :startVal='startVal' :endVal='endVal' :duration='3000'></countTo>
    <el-button type="primary" @click="copyText(666)">主要按钮</el-button>
  </div>
</template>

<script>
import copy from 'clipboard-copy'
import countTo from 'vue-count-to';
export default {
  components: { countTo },
  data() {
    return {
      startVal: 0,
      endVal: 2017
    }
  },

  methods: {
    copyText(text){
      copy(text);
      this.$message({
        message: '复制成功',
        type: 'success'
      });
    },
  },
}
</script>
