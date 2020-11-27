<template>
  <div class="jvTable">
    <slot name="tree"></slot>
    <div class="cp-page-inner" :class="{hasLeft:cfg.tree}">
      <div class="cp-action-bar" :class="cfg.actionAlign" v-if="_get(cfg, 'actionList.length')">
        <div v-for="(x,i) in (cfg.actionAlign ==='between' ? cfg.actionList:[cfg.actionList]  )" :key="i">
          <el-button :type="y.type||'primary'" :plain="y.plain" :icon="y.icon" size="small" @click="y.fn ? y.fn() : $emit(y.e)" v-for="(y,j) in x" :key="j">{{y.name}}</el-button>
        </div>
      </div>
      <cpTitle v-if="1 || _get(cfg, 'actionList.length')">{{cfg.rightName}}</cpTitle>
      <el-form :inline="true" class="cp-form" label-width="6em">
        <slot name="searchBefore"></slot>
        <template v-for="(x,i) in cfg.searchList">
          <el-form-item :label="x.name" :key="i">
            <template v-if="x.type==='input'">
              <el-input v-model="queryParams[x.key]" :placeholder="'请输入'+x.name" :maxlength="x.key==='mobile'?11:20" v-bind="inputcfg(x, i)" @keyup.enter.native="getList()" :value="x.value" />
            </template>
            <template v-else-if="x.type==='select'">
              <el-select v-model="queryParams[x.key]" :placeholder="'请选择'+x.name" v-bind="inputcfg(x, i)">
                <el-option v-for="dict in ( x.list instanceof Array ? x.list : queryList[x.list] || [] )" :key="dict.val" :label="dict.name" :value="dict.val" />
              </el-select>
            </template>
            <template v-else-if="x.type==='date'">
              <el-date-picker type="daterange" v-model="searchDateArr" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" v-bind="inputcfg(x, i)" @change="arr=>([queryParams[x.key1],queryParams[x.key2] ]=arr)">
              </el-date-picker>
            </template>
            <template v-else-if="x.type==='date1'">
              <el-date-picker type="date" v-model="queryParams[x.key]" :placeholder="'请选择'+x.name" value-format="yyyy-MM-dd " v-bind="inputcfg(x, i)">
              </el-date-picker>
            </template>
            <template v-else-if="x.type==='division'">
              <cp-divisions v-model="queryParams[x.key]" :placeholder="'请选择'+x.name" :lev="3" :checkStrictly="true" v-bind="inputcfg(x, i)" />
            </template>
          </el-form-item>
          <br class="break" :key="i" v-if="x.br" />
        </template>
        <el-form-item class="btns">
          <el-button type="primary" icon="el-icon-search" size="mini" @click="getList()" v-if="searchCfg.queryText || searchCfg.queryBtn + '' === '2' ">{{searchCfg.queryText || '筛选'}}</el-button>
          <el-button type="plain" icon="el-icon-refresh-right" size="mini" @click="resetQuery" v-if="searchCfg.resetText || searchCfg.queryBtn + '' === '2'">{{searchCfg.resetText || '重置'}}</el-button>
        </el-form-item>
      </el-form>
      <!-- <cpTitle v-if="!_get(cfg, 'actionList.length')">{{cfg.rightName}}</cpTitle> -->
      <el-table :data="tableData" style="width: 100%" stripe v-loading="loading" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" v-if="cfg.tableSelection" fixed="left" />
        <el-table-column type="index" width="80" label="序号" />
        <template v-for="(x,i) in cfg.tableList">
          <el-table-column v-bind="colcfg(x,i)" :key="i" v-if="x.buttonList" :fixed="x.fixed==='false'? false : x.fixed || 'right'">
            <template slot-scope="scope">
              <el-button size="mini" :type="y.type|| 'text'" v-for="(y,j) in x.buttonList" :key="j" @click="y.fn ? y.fn(scope.row,scope.$index) : void 0" :icon="y.icon" :style="typeof y.style ==='function' ? y.style(scope.row):y.style" v-if="!y.hidden || !(y.hidden && y.hidden(scope.row) )">
                {{ typeof y.text === 'function' ? y.text(scope.row,scope.$index) : y.text }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column v-bind="colcfg(x,i)" :key="i" v-else-if="x.transform">
            <template slot-scope="scope">
              <span :style="typeof x.style ==='function' ? x.style(scope.row):x.style" :class="x.class" @click="x.fn ? x.fn(scope.row,scope.$index) : void 0">{{x.transform(scope.row) }}</span>
            </template>
          </el-table-column>
          <el-table-column v-bind="colcfg(x,i)" :key="i" v-else />
        </template>
      </el-table>
      <div class="pager-container">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryParams.pageNum" :page-sizes="[10, 20, 50, 100]" :page-size="queryParams.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tableTotal">
        </el-pagination>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "rl-table",
  props: ["cfg"],
  data() {
    return {
      loading: false,
      // hidden: false,
      searchDateArr: [],
      queryParams: {
        pageNum: 1,
        pageSize: 10
      },
      queryList: {},
      list: [
        {
          dictValue: "1",
          dictLabel: "选择"
        }
      ],
      tableData: this.cfg.tableData || [],
      tableTotal: 0,
      dialogVisible: false,
      searchCfg: {
        queryBtn: 2
      },
      currentPage: 1
    };
  },
  computed: {},
  mounted() {
    this.searchCfg = this.cfg.searchCfg || this.searchCfg;
    // 搜索下拉框的列表
    const searchList =
      (this.cfg.searchList &&
        this.cfg.searchList
          .map(x => !(x.list instanceof Array) && x.list)
          .filter(x => x)) ||
      [];
    if (searchList.length) {
      this.$dictArr(...searchList).then(res => {
        searchList.forEach((x, i) => {
          this.$set(this.queryList, x, res[i]);
        });
      });
    }
    this.$nextTick(_ => {
      const hasVal =
        this.cfg.searchList &&
        this.cfg.searchList.find(x => x.type === "input" && x.value);
      if (hasVal) {
        this.queryParams[hasVal.key] = hasVal.value;
        this.getList();
      } else {
        this.getList("reset");
      }
    });
  },
  methods: {
    getList(reset) {
      // 搜索函数
      if (this.cfg.searchFn) {
        this.loading = true;

        this.cfg
          .searchFn(this.queryParams, reset)
          .then(res => {
            this.loading = false;
            this.tableData = res.list;
            this.tableTotal = res.total;
          })
          .catch(e => {
            console.error(e);
            this.loading = false;
          });
      }
    },
    inputcfg: (x, i) => ({
      clearable: true,
      size: "small",
      style: x.width ? "width:" + x.width : ""
    }),
    colcfg: (x, i) => ({
      label: x.label,
      width: x.width,
      minWidth: x.minWidth,
      prop: x.prop,
      align: x.align,
      showOverflowTooltip: x.overflow,
      fixed: x.fixed
    }),
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.$msg("qq");
        })
        .catch(_ => {});
    },
    handleSizeChange(size) {
      this.queryParams.pageNum = 1;
      this.queryParams.pageSize = size;
      this.getList();
    },
    handleCurrentChange(page) {
      this.queryParams.pageNum = page;
      this.getList();
    },
    resetQuery() {
      this.queryParams = this._pick(this.queryParams, ["pageSize"]);
      this.queryParams.pageNum = 1;
      this.searchDateArr = [];
      this.getList("reset");
    },
    handleSelectionChange(val) {
      this.$emit("getSelection", val);
    }
  }
};
</script>