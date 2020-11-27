<template>
  <div class="jv-button">
    <div class="btn">
      <span>
        <slot>确认</slot>
      </span>
    </div>
    <!-- <countTo :startVal='startVal' :endVal='endVal' :duration='3000'></countTo>
    <el-button type="primary" @click="copyText(666)">主要按钮</el-button> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },

  methods: {
    
  },
}
</script>
<style lang="less" scoped>
.btn{
  width:100%;
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  // background: #67D3D3;
  // border: 1px solid #67D3D3;
  background:#03Ad91;
  border: 1px solid #03Ad91;
  color: #fff;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: .1s;
  font-weight: 500;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  // letter-spacing:4px;

  padding: 10px 20px;
  font-size: 14px;
  border-radius: 4px;
}
.btn:hover,.btn:focus{
  background:#05c7B6;
  border: 1px solid #05c7B6;
}
.btn:active{
  background:#03Ad91;
  border: 1px solid #03Ad91;
}
.btn.is-loading:before {
    pointer-events: none;
    content: "";
    position: absolute;
    left: -1px;
    top: -1px;
    right: -1px;
    bottom: -1px;
    border-radius: inherit;
    background-color: hsla(0,0%,100%,.35);
}
</style>

