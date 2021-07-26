<template>
<!--  <CountryList type="phone" value="+86"></CountryList>-->
  <!--<SchemaInput ref="schemaInput" type="phone" v-model="schemaInputVal" :readonly="disabled" :static="false"></SchemaInput>-->
 <!-- <SchemaPopover type="phone" v-model="schemaInputVal" v-model:visible="popoverVisible" :readonly="disabled">
    <button type="button" slot="reference" @click="popoverVisible = true">显示</button>
  </SchemaPopover>-->

  <SchemaModal v-model="schemaInputVal" v-model:visible="visible"></SchemaModal>
  <button type="button" @click="show">显示</button>

<!--  <VueCountryIntl ref="schemaInput" schema="input"  type="phone" v-model="schemaInputVal"></VueCountryIntl>
  <VueCountryIntl ref="schemaPopover" schema="popover"  type="phone" v-model="schemaInputVal">
    <button type="button" slot="reference">显示</button>
    <template slot="vueCountryNoData">
      <div>三大法师的是</div>
    </template>
  </VueCountryIntl>
  <div></div>
  <button type="button" @click="show">显示</button>
  <VueCountryIntl schema="modal"  type="phone" v-model:visible="visible" v-model="schemaInputVal"></VueCountryIntl>-->

  <!--<DemoDoc></DemoDoc>-->
</template>

<script setup>
/*import HelloWorld from './components/HelloWorld.vue'*/
import CountryList from './components/country-list/CountryList.vue';
import SchemaInput from './components/schema-input/SchemaInput.vue';
import SchemaPopover from './components/schema-popover/SchemaPopover.vue';
import SchemaModal from './components/schema-modal/SchemaModal.vue';
import VueCountryIntl from './components/index.vue';
import DemoDoc from './DemoDoc.vue';
import {ref, onMounted} from 'vue';

// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md
let disabled = ref(false);
let schemaInput = ref(null);
let schemaPopover = ref(null);
let schemaInputVal = ref('+86');
let visible = ref(false);
let popoverVisible = ref(false);

let show = () => {
  console.log(111)
  visible.value = true;
}

/*
setTimeout(() => {
  console.log('手动展现');
  schemaInput.value.show();
}, 1500);
*/

/*onMounted(() => {
  setTimeout(() => {
    console.log('自动显示！');
    console.log('schemaPopover', schemaPopover.value);
    schemaPopover.value.show();
  }, 1500);
});*/

/*setTimeout(() => {
  console.log('禁用了');
  disabled.value = true;
}, 1500);*/
/*setTimeout(()=>{
  console.log('自动展开');
  console.log('schemaInput', schemaInput)
  schemaInput.value.show(true);
}, 1500);*/
/*setTimeout(() => {
  console.log('切换城市了！');
  schemaInputVal.value = '213';
}, 1500);*/
</script>

<style scoped>

</style>
<style>
body{
  padding: 700px 50px 50px 50px;
  height: 2000px;
}
</style>
