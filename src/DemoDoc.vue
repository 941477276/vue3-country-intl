<template>
  <div class="demo-doc-page clearfix">
    <div class="left">
      <h1>1、模式(model)：scheme = input</h1>

      <h3 class="mb-10">
        <div class="pull-left">1、</div>
        <div class="overflow">
          <div class="mb-5">默认效果(选择手机区号)</div>
          <div>Default effect (select phone area code)</div>
        </div>
      </h3>
      <VueCountryIntl v-model="schemaInputData.default" @onChange="onChange">
        <template slot="vueCountryNoData"><h1>没有找到该国籍！</h1></template>
      </VueCountryIntl>
      <h5 class="mt-5">区号代码：{{schemaInputData.default || '--'}}</h5>
      <div class="hr"></div>

      <h3 class="mb-10">
        <div class="pull-left">1-2、</div>
        <div class="overflow">
          <div class="mb-5">使用中文名称显示</div>
          <div>Use Chinese name display</div>
        </div>
      </h3>
      <VueCountryIntl v-model="schemaInputData.default" :use-chinese="true">
        <template slot="vueCountryNoData"><h1>没有找到该国籍！</h1></template>
      </VueCountryIntl>
      <h5 class="mt-5">区号代码：{{schemaInputData.default || '--'}}</h5>
      <div class="hr"></div>

      <h3 class="mb-10">
        <div class="pull-left">2、</div>
        <div class="overflow">
          <div class="mb-5">选择国籍</div>
          <div>Select country</div>
        </div>
      </h3>
      <VueCountryIntl type="country" v-model="schemaInputData.country" no-data-text="没有找到相关数据"></VueCountryIntl>
      <h5 class="mt-5">国籍代码：{{schemaInputData.country || '--'}}</h5>
      <div class="hr"></div>

      <h3 class="mb-10">
        <div class="pull-left">3、</div>
        <div class="overflow">
          <div class="mb-5">禁用</div>
          <div>Disable</div>
        </div>
      </h3>
      <VueCountryIntl v-model="schemaInputData.disableUse" :disabled="true"></VueCountryIntl>
      <h5 class="mt-5">区号：{{schemaInputData.disableUse || '--'}}</h5>
      <div class="hr"></div>

      <h3 class="mb-10">
        <div class="pull-left">4、</div>
        <div class="overflow">
          <div class="mb-5">不显示图片</div>
          <div>Do not display images</div>
        </div>
      </h3>
      <VueCountryIntl v-model="schemaInputData.noImage" :show-label-img="false"></VueCountryIntl>
      <h5 class="mt-5">区号：{{schemaInputData.noImage || '--'}}</h5>
      <div class="hr"></div>

      <h3 class="mb-10">
        <div class="pull-left">5、</div>
        <div class="overflow">
          <div class="mb-5">静态布局</div>
          <div>Static layout</div>
        </div>
      </h3>
      <VueCountryIntl v-model="schemaInputData.staticLayout" :static="true"></VueCountryIntl>
      <h5 class="mt-5">区号：{{schemaInputData.staticLayout || '--'}}</h5>
      <div class="hr"></div>

      <h3 class="mb-10">
        <div class="pull-left">7、</div>
        <div class="overflow">
          <div class="mb-5">禁用指定国籍</div>
          <div>Disable specified country</div>
        </div>
      </h3>
      <p class="mb-5">禁用：中国、美国、日本，中国香港(Disabled: China, USA, Japan, Hong Kong China)</p>
      <VueCountryIntl v-model="schemaInputData.disableCountry" disable-country="+86,United States,Japan (日本),hk"></VueCountryIntl>
      <h5 class="mt-5">区号：{{schemaInputData.disableCountry || '--'}}</h5>
      <div class="hr"></div>

      <h3 class="mb-10">
        <div class="pull-left">8、</div>
        <div class="overflow">
          <div class="mb-5">只显示指定国籍</div>
          <div>Show only designated countries</div>
        </div>
      </h3>
      <p class="mb-5">只显示：中国、美国、日本，中国香港(Disabled: China, USA, Japan, Hong Kong China)</p>
      <VueCountryIntl v-model="schemaInputData.onlyCountry" only-country="+86,United States,Japan (日本),hk"></VueCountryIntl>
      <h5 class="mt-5">区号：{{schemaInputData.onlyCountry || '--'}}</h5>
      <div class="hr"></div>

    </div>
    <div class="center">
      <h1>2、模式(model)：scheme = popover</h1>

      <h3 class="mb-10">
        <div class="pull-left">1、</div>
        <div class="overflow">
          <div class="mb-5">默认效果(选择手机区号)</div>
          <div>Default effect (select phone area code)</div>
        </div>
      </h3>
      <VueCountryIntl schema="popover" popover-class="popover-class1111" v-model="schemaPopoverData.default" v-model:visible="schemaPopoverData.defaultVisible">
        <button type="button" @click="schemaPopoverData.defaultVisible = true">选择手机区号</button>
        <template slot="vueCountryNoData"><h1>没有找到该国籍！</h1></template>
      </VueCountryIntl>
      <h5 class="mt-5">区号：{{schemaPopoverData.default || '--'}}</h5>
      <div class="hr"></div>

      <h3 class="mb-10" style="margin-top: 400px;">
        <div class="pull-left">2、</div>
        <div class="overflow">
          <div class="mb-5">测试弹出方位</div>
          <div>Test the pop-up orientation</div>
        </div>
      </h3>
      <VueCountryIntl schema="popover" popover-class="popover-class1111" v-model="schemaPopoverData.default" v-model:visible="schemaPopoverData.defaultVisible2">
        <button type="button" @click="schemaPopoverData.defaultVisible2 = true">选择手机区号</button>
        <template slot="vueCountryNoData"><h1>没有找到该国籍！</h1></template>
      </VueCountryIntl>
      <h5 class="mt-5">区号：{{schemaPopoverData.default || '--'}}</h5>
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
      <VueCountryIntl schema="modal" modal-class="modal-class" :listZIndex="5000" v-model:visible="schemaModalVisible.default" v-model="schemaModal.default">
        <template slot="vueCountryNoData"><h1>没有找到该国籍！</h1></template>
      </VueCountryIntl>
      <h5 class="mt-5">区号：{{schemaModal.default || '--'}}</h5>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';
// import VueCountryIntl from './components/Vue3CountryIntl.vue';
import VueCountryIntl from '../lib/vue3CountryIntl.esm.min';
import '../lib/vue3-country-intl.css';

console.log(VueCountryIntl);
export default {
  name: 'DemoDoc',
  components: {
    VueCountryIntl
  },
  setup(props, ctx){
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
    })
    let onChange = (selected) => {
      schemaInputData.selected = selected;
    }
    return {
      schemaInputData,
      schemaPopoverData,
      schemaModalVisible,
      schemaModal,
      onChange
    }
  }
}
</script>

<style>
*{box-sizing: border-box;}
body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,code,form,fieldset,legend,input,button,textarea,p,blockquote,th,td { margin:0; padding:0; }
body { background:#fff; color:#555; font-size:14px; font-family: "Arial","Microsoft YaHei","黑体","宋体",sans-serif; }
td,th,caption { font-size:14px; }
address, caption, cite, code, dfn, em, strong, th, var { font-style:normal; font-weight:normal;}
a { color:#555; text-decoration:none; }
a:hover { text-decoration:underline; }
img { border:none; }
ol,ul,li { list-style:none; }
input, textarea, select, button { font:14px "Arial","Microsoft YaHei","黑体","宋体",sans-serif; }
table { border-collapse:collapse; }
html {overflow-y: scroll;}

.clearfix:after {content: "."; display: block; height:0; clear:both; visibility: hidden;}
.clearfix { *zoom:1; }/*公共类*/
.al {text-align:left}
.ac {text-align:center}
.ar {text-align:right}
.hide {display:none}
.pull-left{
  float: left;
}
.pull-right{
  float: right;
}
.overflow{
  overflow: hidden;;
}
.mb-5{
  margin-bottom: 5px;
}
body{
  /*padding-top: 0!important;
  height: 100% !important;*/
}
html,body,.demo-doc-page,.app{
  height: 100%;
}
/*.app{
  overflow: auto;
}*/
h1{
  margin-bottom: 20px;
  font-size: 2.2em;
}
h3{
  font-size: 1.15em;
}
.hr{
  height: 1px;
  margin: 10px 0 20px 0;
  background-color: #ccc;
}
.mb-10{
  margin-bottom: 10px;
}
.mt-5{
  margin-top: 5px;
}
.demo-doc-page{
  display: flex;
  flex-wrap: wrap;
}
.left{
  /*float: left;*/
  width: 33%;
  min-height: 100%;
  padding: 20px;
  border-right: 1px solid #ccc;
}
.center{
  /*float: left;*/
  width: 33%;
  min-height: 100%;
  padding: 20px;
  border-right: 1px solid #ccc;
}
.right{
  /*float: right;*/
  width: 33%;
  min-height: 100%;
  padding: 20px;
  /*border-left: 1px solid #ccc;*/
}

@media (max-width: 991px) {
  .left,
  .right,
  .center{
    /*float: none;*/
    width: 100%;
    height: auto;
    min-height: auto;
  }
  .left{
    border-right: none;
  }
  .right,
  .center{
    border-top: 1px solid #ccc;
    border-right: none;
  }
}
.popover-class1111 .vue-country-no-data{
  color: #f60;
}
</style>
