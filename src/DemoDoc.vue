<template>
  <div class="demo-doc-page">
    <div class="vue-country-intl-demo">
      <h1 class="caption">vue-country-intl Demo</h1>
      <div class="demo-container">
        <div class="left">
          <h1>1、模式(model)：scheme = input</h1>

          <h3 class="mb-10">
            <div class="pull-left">1、</div>
            <div class="overflow">
              <div class="mb-5">默认效果(选择手机区号&排序)</div>
              <div>Default effect (select phone area code & sort)</div>
            </div>
          </h3>
          <VueCountryIntl v-model="schemaInputData.default" @change="onChange" :sort="sort">
            <template #emptyData><h1>没有找到该国籍！</h1></template>
            <template #selected>(๑*◡*๑)<span style="margin-left: 5px;font-size: 1.3em;">👍</span></template>
          </VueCountryIntl>
          <h5 class="mt-5">区号代码：{{ schemaInputData.default || '--' }}</h5>
          <div class="hr"></div>

          <h3 class="mb-10">
            <div class="pull-left">1-2、</div>
            <div class="overflow">
              <div class="mb-5">使用中文名称显示</div>
              <div>Use Chinese name display</div>
            </div>
          </h3>
          <VueCountryIntl v-model="schemaInputData.default" :use-chinese="true">
            <template slot="emptyData"><h1>没有找到该国籍！</h1></template>
          </VueCountryIntl>
          <h5 class="mt-5">区号代码：{{ schemaInputData.default || '--' }}</h5>
          <div class="hr"></div>

          <h3 class="mb-10">
            <div class="pull-left">2、</div>
            <div class="overflow">
              <div class="mb-5">选择国籍</div>
              <div>Select country</div>
            </div>
          </h3>
          <VueCountryIntl type="country" v-model="schemaInputData.country" no-data-text="没有找到相关数据"></VueCountryIntl>
          <h5 class="mt-5">国籍代码：{{ schemaInputData.country || '--' }}</h5>
          <div class="hr"></div>

          <h3 class="mb-10">
            <div class="pull-left">3、</div>
            <div class="overflow">
              <div class="mb-5">禁用</div>
              <div>Disable</div>
            </div>
          </h3>
          <VueCountryIntl v-model="schemaInputData.disableUse" :disabled="true"></VueCountryIntl>
          <h5 class="mt-5">区号：{{ schemaInputData.disableUse || '--' }}</h5>
          <div class="hr"></div>

          <h3 class="mb-10">
            <div class="pull-left">4、</div>
            <div class="overflow">
              <div class="mb-5">不显示图片</div>
              <div>Do not display images</div>
            </div>
          </h3>
          <VueCountryIntl v-model="schemaInputData.noImage" :show-label-img="false"></VueCountryIntl>
          <h5 class="mt-5">区号：{{ schemaInputData.noImage || '--' }}</h5>
          <div class="hr"></div>

          <h3 class="mb-10">
            <div class="pull-left">5、</div>
            <div class="overflow">
              <div class="mb-5">静态布局</div>
              <div>Static layout</div>
            </div>
          </h3>
          <VueCountryIntl v-model="schemaInputData.staticLayout" :static="true"></VueCountryIntl>
          <h5 class="mt-5">区号：{{ schemaInputData.staticLayout || '--' }}</h5>
          <div class="hr"></div>

          <h3 class="mb-10">
            <div class="pull-left">7、</div>
            <div class="overflow">
              <div class="mb-5">禁用指定国籍</div>
              <div>Disable specified country</div>
            </div>
          </h3>
          <p class="mb-5">禁用：中国、美国、日本，中国香港(Disabled: China, USA, Japan, Hong Kong China)</p>
          <VueCountryIntl v-model="schemaInputData.disableCountry"
                          disable-country="+86,United States,Japan (日本),hk"></VueCountryIntl>
          <h5 class="mt-5">区号：{{ schemaInputData.disableCountry || '--' }}</h5>
          <div class="hr"></div>

          <h3 class="mb-10">
            <div class="pull-left">8、</div>
            <div class="overflow">
              <div class="mb-5">只显示指定国籍</div>
              <div>Show only designated countries</div>
            </div>
          </h3>
          <p class="mb-5">只显示：中国、美国、日本，中国香港(Disabled: China, USA, Japan, Hong Kong China)</p>
          <VueCountryIntl v-model="schemaInputData.onlyCountry"
                          only-country="+86,United States,Japan (日本),hk"></VueCountryIntl>
          <h5 class="mt-5">区号：{{ schemaInputData.onlyCountry || '--' }}</h5>
          <div class="hr"></div>
        </div>

        <div class="center">
          <h1>2、模式(model)：scheme = popover</h1>

          <h3 class="mb-10">
            <div class="pull-left">1、</div>
            <div class="overflow">
              <div class="mb-5">默认效果(选择手机区号&排序)</div>
              <div>Default effect (select phone area code & sort)</div>
            </div>
          </h3>
          <VueCountryIntl schema="popover" popover-class="popover-class1111" v-model="schemaPopoverData.default"
                          v-model:visible="schemaPopoverData.defaultVisible" :sort="sort">
            <button type="button" @click="schemaPopoverData.defaultVisible = true">选择手机区号</button>
            <template slot="emptyData"><h1>没有找到该国籍！</h1></template>
          </VueCountryIntl>
          <h5 class="mt-5">区号：{{ schemaPopoverData.default || '--' }}</h5>
          <div class="hr"></div>

          <h3 class="mb-10" style="margin-top: 400px;">
            <div class="pull-left">2、</div>
            <div class="overflow">
              <div class="mb-5">测试弹出方位</div>
              <div>Test the pop-up orientation</div>
            </div>
          </h3>
          <VueCountryIntl schema="popover" popover-class="popover-class1111" v-model="schemaPopoverData.default"
                          v-model:visible="schemaPopoverData.defaultVisible2">
            <button type="button" @click="schemaPopoverData.defaultVisible2 = true">选择手机区号</button>
            <template slot="emptyData"><h1>没有找到该国籍！</h1></template>
          </VueCountryIntl>
          <h5 class="mt-5">区号：{{ schemaPopoverData.default || '--' }}</h5>
          <div class="hr"></div>

        </div>
        <div class="right">
          <h1>scheme = modal 模式</h1>
          <h3 class="mb-10">
            <div class="pull-left">1、</div>
            <div class="overflow">
              <div class="mb-5">默认效果(选择手机区号)</div>
              <div>Default effect (select phone area code)</div>
            </div>
          </h3>
          <button type="button" @click="schemaModalVisible.default = true">选择手机区号</button>
          <VueCountryIntl schema="modal" modal-class="modal-class" :listZIndex="5000"
                          v-model:visible="schemaModalVisible.default" v-model="schemaModal.default">
            <template slot="emptyData"><h1>没有找到该国籍！</h1></template>
          </VueCountryIntl>
          <h5 class="mt-5">区号：{{ schemaModal.default || '--' }}</h5>
        </div>
      </div>
    </div>

    <div class="country-flag-demo">
      <h1 class="caption">country-flag Demo</h1>
      <div class="country-flag-list">
        <Vue3CountryFlag
          v-for="(val, key) in svgPathObj"
          :key="key"
          :value="key"></Vue3CountryFlag>
      </div>
      <dl class="country-flag-slot-demo">
        <dt>插槽</dt>
        <dd>
          <Vue3CountryFlag value="cn">
            <template v-slot="{country}">
              <span class="slot-span">国家：<mark>{{country.name}}</mark></span>
            </template>
          </Vue3CountryFlag>
        </dd>
        <dt class="usage">用法：</dt>
        <pre>
  &lt;Vue3CountryFlag value="cn"&gt;
    &lt;template v-slot="{country}"&gt;
      &lt;span class="slot-span"&gt;国家：{country.name}&lt;/span&gt;
    &lt;/template&gt;
  &lt;/Vue3CountryFlag&gt;
</pre>
      </dl>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue';
import VueCountryIntl from './components/Vue3CountryIntl.vue';
// import VueCountryIntl from '../lib/vue3CountryIntl.esm.min';
// import '../lib/vue3-country-intl.css';
console.log('VueCountryIntl', VueCountryIntl);

// import Vue3CountryFlag from './components/country-flag/Vue3CountryFlag.vue';
// console.log('Vue3CountryFlag', Vue3CountryFlag);

// 批量导入国籍旗帜svg文件
const svgFiles = import.meta.globEager('./components/country-flag/flags/*.svg');
console.log('svgFiles', svgFiles);
// 获取svg文件名称正则
const reg = /(\w+)(\.\w*)*\.svg$/;
console.log('svgFiles', svgFiles);
const svgPaths = Object.keys(svgFiles).reduce((res, key) => {
  let svgPath = svgFiles[key].default;
  let matched = svgPath.match(reg);
  // console.log('svgPath', svgPath, matched[1]);
  if(matched){
    let countryIso2 = matched[1];
    if(countryIso2 != 'empty' && countryIso2 != 'unknown'){
      res[countryIso2] = svgPath;
    }
  }
  return res;
}, {});
// window.__vue3_country_flag_files_path_obj = svgPaths;
console.log('svgPaths', svgPaths);

export default {
  name: 'DemoDoc',
  components: {
    VueCountryIntl,
    // Vue3CountryFlag
  },
  setup (props, ctx) {
    let schemaInputData = reactive({
      default: '',
      country: 'cn',
      disableUse: '+86',
      noImage: '',
      staticLayout: '86',
      disableCountry: '',
      onlyCountry: '',
      selected: {}
    });
    let schemaPopoverData = reactive({
      default: '+86',
      defaultVisible: false,
      defaultVisible2: false
    });
    let schemaModalVisible = reactive({
      default: false
    });
    let schemaModal = reactive({
      default: ''
    });
    let onChange = (selected) => {
      schemaInputData.selected = selected;
    };

    let svgPathObj = reactive({
      ...svgPaths
    })
    return {
      schemaInputData,
      schemaPopoverData,
      schemaModalVisible,
      schemaModal,
      onChange,
      sort (country) {
        if (['cn', 'hk', 'tw'].includes(country.iso2)) {
          return -1;
        }
      },

      svgPathObj
    };
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}

body, div, dl, dt, dd, ul, ol, li, h1, h2, h3, h4, h5, h6, pre, code, form, fieldset, legend, input, button, textarea, p, blockquote, th, td {
  margin: 0;
  padding: 0;
}

body {
  background: #fff;
  color: #555;
  font-size: 14px;
  font-family: "Arial", "Microsoft YaHei", "黑体", "宋体", sans-serif;
}

td, th, caption {
  font-size: 14px;
}

address, caption, cite, code, dfn, em, strong, th, var {
  font-style: normal;
  font-weight: normal;
}

a {
  color: #555;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

img {
  border: none;
}

ol, ul, li {
  list-style: none;
}

input, textarea, select, button {
  font: 14px "Arial", "Microsoft YaHei", "黑体", "宋体", sans-serif;
}

table {
  border-collapse: collapse;
}

html {
  overflow-y: scroll;
}

pre{
  display: inline-block;
  padding: 10px;
  color: #A9B7C6;
  background-color: #2B2B2B;
}

.clearfix:after {
  content: ".";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}

.clearfix {
  *zoom: 1;
}

/*公共类*/
.al {
  text-align: left
}

.ac {
  text-align: center
}

.ar {
  text-align: right
}

.hide {
  display: none
}

.pull-left {
  float: left;
}

.pull-right {
  float: right;
}

.overflow {
  overflow: hidden;;
}

.mb-5 {
  margin-bottom: 5px;
}

body {
  /*padding-top: 0!important;
  height: 100% !important;*/
}

/*html,body,.demo-doc-page,.app{
  height: 100%;
}*/
/*.app{
  overflow: auto;
}*/
h1 {
  margin-bottom: 20px;
  font-size: 2.2em;
}

h3 {
  font-size: 1.15em;
}

.hr {
  height: 1px;
  margin: 10px 0 20px 0;
  background-color: #ccc;
}

.mb-10 {
  margin-bottom: 10px;
}

.mt-5 {
  margin-top: 5px;
}

.caption {
  position: relative;
  padding: 10px 0 10px 25px;
  margin-left: 10px;
  font-size: 3em;
  color: #387EE8;
}

.caption::before {
  position: absolute;
  left: 0;
  top: 15%;
  content: ' ';
  width: 8px;
  height: 70%;
  background-color: #387EE8;
}


.demo-container {
  display: flex;
  flex-wrap: wrap;
}

.left {
  /*float: left;*/
  width: 33%;
  /*min-height: 100%;*/
  padding: 20px;
  border-right: 1px solid #ccc;
}

.center {
  /*float: left;*/
  width: 33%;
  /*min-height: 100%;*/
  padding: 20px;
  border-right: 1px solid #ccc;
}

.right {
  /*float: right;*/
  width: 33%;
  /*min-height: 100%;*/
  padding: 20px;
  /*border-left: 1px solid #ccc;*/
}



.popover-class1111 .vue-country-no-data {
  color: #f60;
}



.country-flag-demo{
  margin-bottom: 20px;
}


.country-flag-list{
  padding-left: 20px;
}
.country-flag-list .vue3-yn-country-flag{
  display: inline-block;
  margin: 0 20px 20px 0;
}
.country-flag-list .vue3-yn-country-flag .country-flag-img{
  width: 40px;
}
.country-flag-slot-demo{
  padding-left: 20px;
}
.country-flag-slot-demo dt{
  font-size: 1.8em;
}
.country-flag-slot-demo dd{
  display: block;
  margin-top: 10px;
  margin-bottom: 10px;
}
.country-flag-slot-demo dd .country-flag-img{
  width: 40px;
}
.country-flag-slot-demo dd .slot-span{
  margin-left: 15px;
  font-size: 1.1em;
}



@media (max-width: 991px) {
  html body{
    padding: 0 15px;
  }
  .left,
  .right,
  .center {
    /*float: none;*/
    width: 100%;
    height: auto;
    min-height: auto;
  }

  .left {
    border-right: none;
  }

  .right,
  .center {
    border-top: 1px solid #ccc;
    border-right: none;
  }

  .country-flag-list .vue3-yn-country-flag .country-flag-img,
  .country-flag-slot-demo dd .country-flag-img{
    width: 30px;
  }
}
</style>
