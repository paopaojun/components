<template>
  <el-form-item :label="x.name" :label-width="x.labelWidth" :rules="rules(x)" :class="x.itemClassName||{'inline-block':x.inline}">
    <template v-if="x.type==='view'">
      <el-tooltip effect="dark" :content="form[x.key]" placement="top" v-if="x.overflow">
        <div class="overtext">{{x.transform ? x.transform(form[x.key]) :form[x.key]}}</div>        
      </el-tooltip>
      <span v-else>{{x.transform ? x.transform(form[x.key]) :form[x.key] || locz('na')}}</span>
    </template>
    <template v-if="x.type==='input'">
      <el-input v-model="form[x.key]" v-bind="inputcfg(x)" @change="val=> x.changeFn ? x.changeFn(val) : void 0"  @input="val=> x.inputFn ? x.inputFn(val) : void 0"/>
    </template>
    <template v-if="x.type==='number'">
      <el-input-number v-model="form[x.key]" :min="(x.range&&x.range[0])||1" :max="(x.range&&x.range[1])||10" v-bind="inputcfg(x)" />
    </template>
    <template v-if="x.type==='textarea'">
      <el-input v-model="form[x.key]" type="textarea" resize='none' rows="3" v-bind="inputcfg(x)" />
    </template>
    <template v-if="x.type==='radio'">
      <el-radio-group v-model="form[x.key]" v-bind="inputcfg(x)">
        <el-radio v-for="y in (x.dict ? dictList : x.list || [])" :key="y.val" :label="y.val">{{y.name}}</el-radio>
      </el-radio-group>
    </template>
    <template v-else-if="x.type==='select'">
      <el-select v-model="form[x.key]" v-bind="inputcfg(x)" @change="val=> x.changeFn ? x.changeFn(val) : void 0">
        <el-option v-for="dict in (x.dict ? dictList : x.list || [])" :key="dict.val" :label="dict.name" :value="dict.val" />
      </el-select>
    </template>
    <template v-else-if="x.type==='date'">
      <el-date-picker v-model="form[x.key]" type="daterange" :start-placeholder="locz('startDate')" :end-placeholder="locz('endDate')" v-bind="inputcfg(x)" value-format="yyyy-MM-dd">
      </el-date-picker>
    </template>
    <template v-else-if="x.type==='date1'">
      <el-date-picker v-model="form[x.key]" type="date" :placeholder="locz('pleaseSelect')+x.name" v-bind="inputcfg(x)" value-format="yyyy-MM-dd">
      </el-date-picker>
    </template>
    <template v-else>
      <slot></slot>
    </template>
  </el-form-item>
</template>
<script>
import { locz } from "../commonFn/commonFn.js";
const tipsFn = x => {
  if (x.type === "input") {
    return locz("pleaseInput") + x.name;
  } else if (x.type === "select") {
    return locz("pleaseSelect")  + x.name;
  }
};
export default {
  name: "rl-form-item",
  props: ["x", "form"],
  data() {
    const self = this;
    return {
      queryParams: {},
      dictList: []
    };
  },
  async mounted() {
    if (this.x.dict) {
      const list = await this.$dict(this.x.dict);
      if (this.x.pick) {
        this.dictList = list.filter(x => this.x.pick.includes(x.val));
      } else {
        this.dictList = list;
      }
    }
  },
  computed: {},
  methods: {
    locz,
    inputcfg: x => ({
      clearable: true,
      size: "small",
      filterable: x.filterable || Boolean(x.dict),
      style: x.width ? "width:" + x.width : "",
      class: x.class,
      readonly: x.readonly,
      disabled: x.disabled,
      placeholder: tipsFn(x),
      multiple: x.multiple,
      maxlength:
        x.type === "input" || x.type === "textarea" ? x.maxlength || 50 : null
    }),
    rules: x => [
      {
        required: !(x.norule || x.type === "view"),
        message: tipsFn(x),
        trigger: x.type === "select" ? "change " : "blur"
      }
    ]
  }
};
</script>
<style scoped>
.el-form-item {
  vertical-align: top;
}
.overtext  {
    white-space: nowrap;
    overflow: hidden;
    width: 100%;
    text-overflow: ellipsis;
}
</style>
