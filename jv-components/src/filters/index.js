import dictionary from './dictionary'   //本地静态字典

function showLabel(value,options){  //直接传配置文件(标准 value,lable)
  if (!value) return ''
  let res = options.filter((item) => {
    return item.value == value;
  });
  let label = res.length?res[0].label:'';
  return label
}

function showApiLabel(value,options,tValue,label){  //直接传配置文件(自定义 value,lable)
  if (!value) return ''
  let res = options.filter((item) => {
    return item[tValue] == value;
  });
  let reslabel = res.length?res[0][label]:'';
  return reslabel
}

function searchLabel(value,dictionaryKey){  //传dictionaryKey字段获取本地字典options
  console.log(value,dictionaryKey)
  if (!value) return ''
  let options = dictionary[dictionaryKey];
  if(!options) return value;
  let res = options.filter((item) => {
    return item.value == value;
  });
  let label = res.length?res[0].label:'';
  return label
}

export default{
  dictionary,
  showLabel,
  showApiLabel,
  searchLabel,
}