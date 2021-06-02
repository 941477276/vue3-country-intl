<template>
  <div class="vue-country-list-wrap"
       :style="{'z-index': listZIndex != 0 ? listZIndex : '', 'max-height': maxHeight > 0 ? (maxHeight + 'px') : ''}">
    <ul class="vue-country-list" @click="countryItemClickEvt">
      <li class="vue-country-item"
          v-for="(item, index) in countryList"
          :class="{selected: item.iso2 === selected.item.iso2}"
          :key="item.iso2 + index"
          :data-index="index"
          :data-iso="item.iso2">
        <span class="iti-flag" :class="item.iso2"></span>
        <span class="vue-country-name">{{useChinese ? item.nameCN : item.name}}</span>
        <span class="vue-country-areaCode" v-show="showAreaCode">+{{item.dialCode}}</span>
        <span class="selected-text" v-show="showSelectedText">{{selectedText}}</span>
      </li>
      <li class="vue-country-no-data" v-show="countryList.length === 0">
        <slot name="vueCountryNoData">{{noDataText}}</slot>
      </li>
    </ul>
  </div>
</template>

<script>
import { reactive, computed, onMounted, watch } from 'vue';
import { vueCountryTool } from '../vueCountryTool';
import { countriesData } from './data';

export default {
  name: "CountryList",
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    // 类型，有两种类型，第一种：选择手机号码区号，值为phone;第二种：选择国家，值为country
    type: {
      type: String,
      default: 'phone',
    },
    iso2: { // 国籍代码，当type=phone时必须传递iso2属性，否则当区号代码为212或358时会出问题！
      type: String,
      default: ''
    },
    listZIndex: { // 列表的层级
      type: Number,
      default: 0,
    },
    maxHeight: { // 列表最大高度
      type: Number,
      default: 0,
    },
    searchText:{ // 查询条件
      type: [String, Number],
      default: ''
    },
    // 是否显示区号
    showAreaCode: {
      type: Boolean,
      default: true,
    },
    // 选中项中右侧 "select" 的文案
    selectedText: {
      type: String,
      default: 'Selected',
    },
    // 是否显示选中项右侧的 "select" 文案
    showSelectedText: {
      type: Boolean,
      default: true,
    },
    // 是否可以搜索
    searchAble: {
      type: Boolean,
      default: true,
    },
    /* 禁用的国家(可以传递国家名称、国家代码、国家区号)，可以传递字符串也可以传递数组，传递字符串时禁用多个国家使用逗号分隔 */
    disableCountry: {
      type: [String, Array],
      default(){
        return [];
      }
    },
    // 只显示指定的国家，可以传递字符串也可以传递数组，传递字符串时多个国家使用逗号分隔
    onlyCountry: {
      type: [String, Array],
      default(){
        return [];
      }
    },
    // 未搜索到国家数据时显示的文案
    noDataText: {
      type: String,
      default: '未找到任何数据！'
    },
    // 是否使用中文显示国籍名称
    useChinese: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue', 'onChange'],
  setup(props, context){
    console.log('context', context);
    // 选中项
    let selected = reactive({
      item: {}
    });

    // 数据列表
    let countryList = computed(() => {
      let searchText = props.searchText || '';
      let countries = countriesData;
      let disableCountry = typeof props.disableCountry === 'string' ? props.disableCountry.split(',') : props.disableCountry;
      let onlyCountry = typeof props.onlyCountry === 'string' ? props.onlyCountry.split(',') : props.onlyCountry;
      // 根据国家名称或国家代码或国家区号过滤只显示的国家
      if(onlyCountry.length > 0){
        countries = countries.filter(country => {
          let index = vueCountryTool.getIndex(onlyCountry, (item) => {
            let dialCode = item + '';
            if(dialCode.charAt(0) === '+'){
              dialCode = dialCode.replace('+', '');
            }
            return country.name === item || country.nameCN === item || country.dialCode === dialCode || country.iso2 === item;
          });
          return index > -1;
        });
        // console.log('只显示指定国家', countries, onlyCountry)
      }
      // console.log('disableCountry', disableCountry)
      // 根据国家名称或国家代码或国家区号过滤禁用的国家
      if(disableCountry.length > 0){
        countries = countries.filter(country => {
          let index = vueCountryTool.getIndex(disableCountry, (item) => {
            let dialCode = item + '';
            if(dialCode.charAt(0) === '+'){
              dialCode = dialCode.replace('+', '');
            }
            return country.name === item || country.nameCN === item || country.dialCode === dialCode || country.iso2 === item;
          });
          return index === -1;
        });
      }
      if (!props.searchAble || searchText.length === 0) {
        return countries;
      }
      // 解决用户输入"+"作为搜索条件时，而导致new RegExp(searchText, 'gi')时将"+"认为是需要一个或多个字符
      searchText = searchText.replace('+', '\\+');
      // 按搜索条件进行查询
      countries =  countries.filter(item => {
        let reg = new RegExp(searchText, 'gi');
        // console.log('reg',reg);
        let nameFlag = reg.test(item.name || item.nameCN);
        let dialCodeFlag = reg.test(item.dialCode);
        let iso2Flag = reg.test(item.iso2);
        return nameFlag || dialCodeFlag || iso2Flag;
      });
      return countries;
    });

    // 列表项点击事件
    let countryItemClickEvt = function (e) {
      e = e || window.event;
      e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
      let target = e.target;

      let selectedInner;
      console.log('列表项点击了')
      if(props.justRead){
        return;
      }
      while (target.nodeName !== 'LI') {
        target = target.parentElement;
      }
      console.log('target', target, e.currentTarget);
      // let iso = target.getAttribute('data-iso');
      let index = target.getAttribute('data-index');
      /*if (iso === this.selected.iso2) {
        selected = {};
      } else {
        selected = this.countryList[index];
      }*/
      selectedInner = countryList.value[index];
      // 如果用户点击的是“无数据提示”则select会为undefined
      if(!selectedInner){
        return;
      }

      // 如果是收到把列表显示出来的，则点击后需要收到隐藏
      /*if (this.isManualShow) {
        this.inputFocused = false;
        this.countryListShow = false;
        this.isManualShow = false;
      }*/
      selected.item = selectedInner;
      let isPhone = props.type.toLowerCase() === 'phone';
      // 实现自定义v-model第二步
      context.emit('update:modelValue', isPhone ? (selectedInner.dialCode || '') : (selectedInner.iso2 || ''));
      // 执行回调
      context.emit('onChange', selectedInner, isPhone ? (selectedInner.dialCode || '') : (selectedInner.iso2 || ''));
    }

    // 计算默认选中的值
    let calcSelectedOption = () => {
      // console.log('计算选中值');
      let value = props.modelValue;
      if((value + '').length == 0){
        return {};
      }
      let isPhone = props.type.toLowerCase() === 'phone';
      if ((value + '').charAt(0) === '+') {
        value = value.substr(1);
      }
      let item = countryList.value.filter((item) => {
        if (isPhone) {
          if(props.iso2){
            // console.log('iso2', this.iso2, item.iso2);
            return item.iso2 == this.iso2;
          }
          return item.dialCode == value;
        } else {
          return item.iso2 == value;
        }
      });
      if (!item || item.length === 0) {
        item = {};
      } else {
        item = item[0] || {};
      }
      return item;
    }

    watch(() => props.modelValue, () => {
      let cur = calcSelectedOption();
      console.log('执行watch了');
      if(!cur){
        return;
      }
      if(cur !== selected.item){
        selected.item = cur;
        context.emit('onChange', cur, props.type.toLowerCase() === 'phone' ? (cur.dialCode || '') : (cur.iso2 || ''));
      }
    }, { immediate: true });

    onMounted(() => {
      if(props.type == 'phone' && (props.iso2 + '').length == 0){
        console.warn('当type=phone时最好传递iso2属性，否则当区号代码为212或358时会出现选择不正确问题！');
      }
    });

    return {
      selected,
      countryList,
      countryItemClickEvt
    };
  }
}
</script>

<style>
@import "country-list.css";
</style>
