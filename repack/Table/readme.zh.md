## **Table** 表格文档

### 引入
```
import { Table } from "@repackel/repack";
```
```
components: {
  [Table.name]: Table,
},
```
```
<rl-table :cfg="cfg" ref="staffTable" @getSelection="getSelection">
  <!-- <template slot="searchbox">slot</template> -->
</rl-table>
```

**插槽：**


| 名称 | 插槽 | 示例 |
| --- | --- | --- |
| pageBegin | 位于页面开始 | `slot="pageBegin"` |
| beforeTable | `Table` 标签之前 | `slot="beforeTable"` |
| searchBegin | 位于 searchList 开始 | `slot="searchBegin"` |
| searchbox | searchList 之间，由 `type='slot'` 控制 | `slot="searchbox"` |
| customTable | 自定义表格，当 `cfg.customTable` 为 `true` 时生效 | `slot="customTable"` |


### 配置

- 1 `cfg` 配置
```
{
  actionList:[], // 操作按钮列表，可选
  actionAlign: "right", // 操作按钮对齐，默认 `"right"`
  searchList:[], // 搜索列表
  searchFn: this.getList, // 搜索方法 `Function`
  fetchConditionFn: this.fetchConditionList, // 异步获取搜索条件列表的方法 `Function`
  tableSelection: true, // 表格是否可勾选，默认 `false`
  customTable: true, // 自定义表格，默认 `false`
  tableList:[], // 表格表头，自定义表格时不需要
  tableCellFallbackText: '-', // 表格单元备用文本，可选。当表格的值为空时显示，对整个表格生效。无默认
  hideSearchForm: true, // 隐藏搜索条件和搜索按钮，默认显示
  hidePagination: true, // 隐藏分页组件，默认显示
}
```

- 1-1 `searchFn` 配置

搜索接口通过异步函数传入，最终由组件内部调用，组件外完成数据的拼装。
组件内在 `mounted()` 时调用 搜索，组件外无需再次调用。

示例：
```
getList(p, reset) {
  // `p` 为组件内传入的搜索条件
  // `reset` 为重置搜索开关，当使用到了外部条件时，这里要清除
  // 最后 `resolve` 的包含 `table` 数据和分页
  let { ...pr } = p;
  if (!reset) {
    // 搜索时，带上外部的省市区数据
    const divList = this.divList;
    switch (divList.length) {
      case 1:
        pr.provinceCode = this._last(divList);
        break;
      case 2:
        pr.cityCode = this._last(divList);
        break;
      case 3:
        pr.areaCode = this._last(divList);
        break;
      default:
        break;
    }
  } else {
    // 重置时清空外部的省市区数组
    this.divList = [];
  }
  // 同时可以带上其他必传条件
  pr.buildingType = 1;
  return new Promise((resolve, reject) => {
    this.$req("/community/building/list", {
      method: "GET",
      params: pr
    }).then(res => {
      resolve({
        list: res.rows,
        total: res.total
      });
    });
  });
},
```

- 1-2 `fetchConditionFn` 配置

异步获取搜索条件列表的方法，`return` 一个 `Promise`，最后 `resolve` 一个对象。
每一个键名为 `searchList` 某项的 `key` ，键值为其对应的下拉框选项 `list`。
在 `mounted()` 时调用。

示例：
```
fetchConditionList() {
  return new Promise(async (resolve, reject) => {
    const childType = await this.$req("/getList");
    // const subChildType = await this.$req("/getChildType");
    resolve({
      childType: childType,
      // subChildType: subChildType
    });
  });
},
```

- 1-3 `searchList` 配置

> 格式：
```
searchList: [
  {
    name: "姓名",
    type: "input",
    key: "name"
  },
  {
    name: "性别",
    type: "select",
    key: "sex",
    list: "XB"
  },
  {
    name: "时间范围",
    type: "date",
    key1: "beginDate",
    key2: "endDate"
  }
]
```
> 属性说明：

| 键名 | 值 | 类型 | 默认值 | 示例 |
| --- | --- | --- |--- | --- |
| name | 中文名 | `String` |必传 |"姓名" |
| type | 见下表 | `String` | 必传 |"select" |
| key | 表单的键 | `String` | 必传 | "name"  |
| list | 下拉类型的列表 | `Array` | 必传 | [{name:'男',val:'1'}]
| useLabel | 使用下拉框的 `label` 传值 | `Boolean` |  | true  |
| key1 | `type="date"` 的开始时间 | `String` |  | "beginDate"  |
| key2 | `type="date"` 的结束时间 | `String` |  | "endDate"  |
| maxlength | 同 element-ui | `Number` | 20 | 20  |
| clearable | 同 element-ui | `Boolean` | true | true  |
| readonly | 同 element-ui | `Boolean` | - | true  |
| disabled | 同 element-ui | `Boolean` | - | true  |
| placeholder | 同 element-ui | `String` | - | "请选择"  |
| startPlaceholder | 同 element-ui | `String` | - | "请选择开始时间"  |
| endPlaceholder | 同 element-ui | `String` | - | "请选择结束时间"  |
| valueFormat | 同 element-ui | `String` | - | "yyyy-MM-dd HH:mm:ss"  |
| hidden | 隐藏该搜索项 | `Boolean` | - | true  |
| width | item content 宽度，单位为 px | `Number` | - | "220"  |
| class | item content 类名 | `String` | - | "w250"  |
| itemClassName | item 类名 | `String` | - | "w250"  |


> `type` 类型

| 传值 | 含义 |
| -- | -- |
| `input` | 输入框 |
| `select`| 下拉框 | 
| `date`| 日期范围 |
| `datetime` | 日期时间范围 |
| `date1`| 单个日期 |
| `slot` | 插槽 |

**注：当 `type="slot"` 的时候，可以使用 `name="searchbox"` 的具名插槽，配置更加灵活的内容。*

**下拉框列表数据的必须设为以下格式，键名 `name`, 键值 `val`*

```
list: [{
  val: "1",
  name: "住宅"
}, {
  val: "2",
  name: "公共设施用房"
}, {
  val: "3",
  name: "商业用房"
}]
```

- 1-4 `tableList` 配置
> 格式：
```
tableList: [
  {
    label: "姓名",
    prop: "name",
    width: 80
  },
  {
    label: "性别",
    transform: row => ["","男", "女"][row.sex],
    width: 120
  }
]
```
> 属性说明：

| 键名 | 值 | 类型 | 默认值 | 示例 |
| --- | --- | --- |--- | --- |
| label | 表头 | `String` | 必传 |`"姓名"` |
| prop | 表单循环的 key | `String` | 必传 |`"name"` |
| hidden | 隐藏该列 | `Boolean` | `false` |`true` |
| viewImg | 取 prop 字段显示看图 | `Boolean` | | `true` |
| width | 宽度 (同element) | `Number` | | `80`  |
| minWidth | 最小宽度 (同) | `Number` | | `120`  |
| align | 列表对齐 (同) | `String` |  | `'right'`  |
| overflow | showOverflowTooltip (同) | `Boolean` |  | `true` |
| fixed | 列表固定 (同) | `Boolean` `String` | `false` | `'right'`  |
| transform | 处理显示文字的函数，传入`row` ，显示返回结果 | `Function` |  | `row => row.num + 'kg'` | 
| class | 类名 | `String` `Function` | | `row => ["", "green", "red"][row.state]`  |
| style | 内联样式 | `String` `Function` | | `row => ({ color: ["", "green", "red"][row.state]})`  |
| fn | 点击事件，传入 `(row,index)` | `Function` | | `(row,index) => this.alert(row,index)`  |
| buttonList | 操作按钮的列表 | `Array` | | 见下表  |


- 1-5-1 `buttonList` 配置：
> 格式：
```
buttonList:[
   {
     text: "编辑",
     fn: () => this.$info("编辑")
   }
 ]
```
> 属性说明：

| 键名 | 值 | 类型 | 默认值 | 示例 |
| --- | --- | --- |--- | --- |
| icon | 按钮图标 | `String` | | `"el-icon-edit"`  |
| type | 按钮类型(同) | `String` | `'text'` | `"primary"`  |
| disabled | 禁用 | `Boolean` `Function` | | `true`  |
| class | 类名 | `String` `Function` | | `row => ["", "green", "red"][row.state]`  |
| style | 内联样式 | `String` `Function` | | `row => ({ color: ["", "green", "red"][row.state]})` |
| text | 按钮文字 | `String` `Function` | | `row => ["", "查看", "编辑"][row.state]`  |
| fn | 点击事件，传入 `(row,index)` | `Function` | | `(row,index) => this.alert(row,index)`  |

### 方法

用法：

```
this.$refs[ ref名 ].[ 方法名 ]
// this.$refs.staffTable.getList()
```
> 方法列表：

| 方法名 | 说明 | 
| --- | --- |
| `searchButton()` | 搜索按钮 |
| `getList()` | 搜索函数 |
| `resetQuery()` | 重置函数 |
| `handleSizeChange()` | 分页大小改变 |
| `handleCurrentChange()` | 分页索引改变 |

### 事件

用法：

```
@getSelection="myGetSelectionMethod"
// 即为 element 的 `selection-change` 方法
```