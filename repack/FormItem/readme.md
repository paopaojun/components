## **Form Item** Document

1. Import 
```
import { FormItem } from "@repackel/repack";

  components: {
    FormItem,
  },
```
```
<form-item :form="form" :x="x" v-for="(x,i) in list" :key="i">
    <!-- <el-input v-if="x.name==='construction area'" v-model="form.acreage" placeholder="Construction Area" size="small">
        <template slot="append">m²</template>
    </el-input> -->
</form-item>
```

**Default slot: put the custom content between `<form-item></form-item>`. Can be judged by the `name` of the list item*

2. List field

List structure
```
list:[
    {
        name: "House type",
        type: "select",
        inline: true,
        key: "housingCategory",
        list: this.$dictLoc("House type")
    }
]

```

| Key | Value | Data Type | Default | Example |
| --- | --- | --- |--- | --- |
| name | Display name | `String` | Mandatory |"House type" |
| type | See table below | `String`| Mandatory | "select" |
| key | Key of form item | `String` | Mandatory | "housingCategory"  |
| list | `Select` list | `Array` | Mandatory | this.$dictLoc("House type") |
| pick | Filter the list, only keep `val` items in the array | `Array` |   | ['1','2'] |
| maxlength | Length of input box | `Number`| 50| 11 |
| inline | Inline | `Boolean` | `false` | true  |
| norule | No verification | `Boolean` | - | true  |
| class | content class Name | `String` | - | 'w300'  |
| itemClassName | `<el-form-item>` class Name | `String` | - | 'pct50'  |
| width | Width | `String` | - | '150px'  |
| labelWidth | Same as element-ui `label-width` | `String` | - | '15em'  |
| size | Same as element-ui | `String` | small | 'small'  |
| placeholder | Placeholder | `String` | Please input/select | 'Please input'  |
| filterable | Filterable | `Boolean` | - | true  |
| clearable | Clearable | `Boolean` | - | true  |
| multiple | Same as element-ui | `Boolean` | - | true  |
| readonly | Same as element-ui | `Boolean` | - | true  |
| disabled | Same as element-ui | `Boolean` | - | true  |
| range | I.e., min and max | `Array` | - | [1,20]  |
| overflow | When `type="view"` , show overflow text | `Boolean` | - | true  |
| transform | When `type="view"` , processing displayed text, pass in `form[x.key]` | `Function` | - | `str => str.substr(0,4)`  |
| inputFn | When `type="input"` , trigger input event, same as `@input` | `Function` | - | ` val=>{console.log('input=>',val)}`  |
| changeFn | When `type="input"` and `type="select"` , trigger change event, same as `@change` | `Function` | - | ` val=>{console.log('change=>',val)}` |

** The data of the select list must be set to the following format, key `name`, value `val`*

```
list: [{
  val: "1",
  name: "Residential"
}, {
  val: "2",
  name: "Public facilities"
}, {
  val: "3",
  name: "Commercial premises"
}]
```

3. Supported form item types

| Value | Description |
| -- | -- |
| `input` | Input box |
| `number` | Number input box |
| `textarea` | Textarea box |
| `radio` | Radio |
| `select`| Select | 
| `date`| Date range | 
| `date1`| Single date |
| `view` | View text |