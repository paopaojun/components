import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'

Vue.use(ElementUI);

import jvComponents from './jvExport/index.js';


Object.keys(jvComponents.filters).forEach(key => {
  Vue.filter(key,jvComponents.filters[key])
})

Object.keys(jvComponents).forEach(key => {
  Vue.component(key,jvComponents[key])
})

console.log(jvComponents)




Vue.config.productionTip = false
Vue.prototype.utils = jvComponents.utils

new Vue({
  render: h => h(App),
}).$mount('#app')
