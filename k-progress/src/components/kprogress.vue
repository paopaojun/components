<template>
  <div class="uploadImages">
   <el-upload
      class="upload-demo"
      :action="uploadUrl"
      :headers="headers"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      :on-success="handleSuccess"
      multiple
      :limit="1"
      :on-exceed="handleExceed"
      :file-list="srcList">
      <el-button size="small" type="primary">点击上传</el-button>
      <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
    </el-upload>
    <el-image-viewer
      v-if="showViewer"
      :on-close="closeViewFn"
      :url-list="showImg">
    </el-image-viewer>
  </div>
</template>
<script>
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
// import { getToken } from '@/utils/auth'
  export default {
    props:['value','token','uploadUrl'],
    components:{
      ElImageViewer
    },
    computed:{
      headers:function(){
        return {
          'Authorization': 'Bearer ' + this.token // 让每个请求携带自定义token 请根据实际情况自行修改
        }
      },
      srcList:{
        get(){
          console.log(this.value)
          console.log(this.districtName)
          if(this.value){  //如果有值
            return [
              {
                name:'预览',
                url:this.value
              }
            ]
          }else{
            return []
          }
        },
        set(val){
          if(val.length){
            this.$emit('input',val[0].url)
          }else{
            this.$emit('input','')
          }
        }
      }
    },
    data() {
      return {
        showViewer:false,
        showImg:[]
      };
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
        this.srcList=[];
      },
      handlePreview(file) {
        console.log(file);
        this.showViewer = true;
        this.showImg = [file.url]
      },
      closeViewFn(){
        this.showViewer = false;
      },
      handleExceed(files, fileList) {
        this.$message.warning(`只能上传单个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定要移除？`);
      },
      handleSuccess(res, file, fileList){
        if(res.code==200){
          console.log(res)
          // 成功处理
          this.msgSuccess("上传成功");
          this.srcList = [res.object];
          console.log(res.object)
          console.log(this.srcList)
        }else{
          this.msgError(res.message || '上传失败!');
          this.srcList=[];
        }
      },
    }
  }
</script>

