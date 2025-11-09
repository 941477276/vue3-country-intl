//import "babel-polyfill"
import { createApp } from 'vue'
import App from './App.vue'

// import Vue3CountryFlag from '../lib/vue3CountryFlag.esm.min';
// import Vue3CountryFlag from 'vue3-country-flag';
import Vue3CountryFlag from './components/country-flag/index';

/*import VueCountryIntl from '../lib/vue3CountryIntl.js';
import '../lib/vue3CountryIntl.css';

console.log('Vue3CountryIntl', VueCountryIntl);*/

const app = createApp(App);

// app.component('VueCountryIntl', VueCountryIntl)
// 引入各个国籍国旗的svg文件
/* let svgFilesCtx = require.context('../lib/country-flag-svgs', true, /\.svg$/);
app.use(Vue3CountryFlag, svgFilesCtx); */
const svgFiles = import.meta.glob('./components/country-flag/flags/*.svg', { eager: true });
console.log('svgFiles3333', svgFiles);
app.use(Vue3CountryFlag, svgFiles);

/*// 获取svg文件名称正则
let reg = /(\w+)(\.\w*)*\.svg$/;
console.log('svgFiles', svgFilesCtx);
// 获取svg文件路径
let svgPathList = svgFilesCtx.keys().map(item => svgFilesCtx(item))

// 将svg路径转换成对象
const svgPathObj = svgPathList.reduce((res, svgPath) => {
  let pathIsString = typeof svgPath === 'string';
  let matched = pathIsString ? svgPath.match(reg) : svgPath.default.match(reg);
  console.log('matched', matched, svgPath);
  if(matched){
    res[matched[1]] = pathIsString ? svgPath : svgPath.default;
  }
  return res;
}, {});
console.log(svgPathObj);
(window || Object).__vue3_country_flag_files_path_obj = svgPathObj;*/

app.mount('#app')
