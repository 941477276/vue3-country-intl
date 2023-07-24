<template>
  <div class="vue-country-list-wrap"
       :style="{'z-index': listZIndex != 0 ? listZIndex : '', 'max-height': maxHeight > 0 ? (maxHeight + 'px') : ''}">
    <ul class="vue-country-list" @mousedown="countryItemClickEvt">
      <li class="vue-country-item"
          v-for="(item, index) in countryList"
          :class="{selected: item.iso2 === selected.item.iso2}"
          :key="item.iso2 + index"
          :data-index="index"
          :data-iso="item.iso2">
        <SlotRender slot-name="countryItem" :out-slots="rootSlots" :slot-data="item">
          <span class="iti-flag" :class="item.iso2"></span>
          <span class="vue-country-name">{{useChinese ? item.nameCN : item.name}}</span>
          <span class="vue-country-areaCode" v-show="showAreaCode">
              +{{areaCodeView(item.dialCode, item)}}
          </span>
          <span class="selected-text" v-show="showSelectedText">
            <SlotRender slot-name="selected" :out-slots="rootSlots" :slot-data="item">
              {{selectedText}}
            </SlotRender>
          </span>
        </SlotRender>
      </li>
      <li class="vue-country-no-data" v-show="countryList.length === 0">
        <SlotRender slot-name="emptyData" :out-slots="rootSlots">{{noDataText}}</SlotRender>
      </li>
    </ul>
  </div>
</template>

<script>
import { reactive, ref, computed, onMounted, watch, onUnmounted } from 'vue';
import { vueCountryTool } from '../vueCountryTool';
import { countriesData } from './data';
import { countryListProps } from "./country-list-props";
import { SlotRender } from '../slot-render/SlotRender';
import { emitUpdateModelValue, emitOnChange } from '../emits';

export default {
  name: "CountryList",
  props: {
    ...countryListProps,
    rootSlots: { // 根组件的插槽
      type: Object,
      default () {
        return {};
      }
    }
  },
  components: {
    SlotRender
  },
  emits: [emitUpdateModelValue, emitOnChange],
  setup(props, context){
    console.log('context', context);
    // 选中项
    let selected = reactive({
      item: {}
    });
    let currentVal = ref('');

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
        let nameFlag = reg.test(item.name );
        let nameFlag2 = reg.test(item.nameCN);
        if(nameFlag || nameFlag2){
          return true;
        }
        let dialCodeFlag = reg.test(item.dialCode);
        if(dialCodeFlag){
          return true;
        }
        let iso2Flag = reg.test(item.iso2);
        if(iso2Flag){
          return true;
        }
        // 有些国家的手机区号会有多个值
        let diaCodeInMultipleAreaCodeCountry = item.areaCodes && item.areaCodes.some(areaCode => searchText.search(areaCode) > -1);
        return diaCodeInMultipleAreaCodeCountry;

      });
      return countries;
    });

    // 列表项点击事件
    let countryItemClickEvt = function (e) {
      e = e || window.event;
      e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
      let target = e.target;

      let selectedInner;
      console.log('列表项点击了', target)
      if(props.justRead){
        return;
      }
      while (target && target.nodeName !== 'LI') {
        target = target.parentElement;
      }
      if (!target) {
        return;
      }
      console.log('target', target, e.currentTarget);
      let iso = target.getAttribute('data-iso');
      // let index = target.getAttribute('data-index');
      for(let i = 0, len = countryList.value.length; i< len; i++){
        if(countryList.value[i].iso2 == iso){
          selectedInner = countryList.value[i];
          break;
        }
      }
      /*if (iso === this.selected.iso2) {
        selected = {};
      } else {
        selected = this.countryList[index];
      }*/
      // selectedInner = countryList.value[index];
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
      let result = '';
      if(isPhone){
        // 一个国家有多个手机区号
        if(selectedInner.dialCode == 1 && selectedInner.areaCodes) {
          result = selectedInner.areaCodes[0];
        }else {
          result = selectedInner.dialCode || '';
        }
      }else{
        result = selectedInner.iso2 || '';
      }
      currentVal.value = result;
      // 实现自定义v-model第二步
      context.emit('update:modelValue', result);
      // console.log('CountryList.vue  update:modelValue', result, selected);
      // 执行回调
      context.emit('onChange', selectedInner, result);
    }

    // 计算默认选中的值
    /*let calcSelectedOption = () => {
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
          // 一个国家只有一个手机区号的情况
          if(item.dialCode == value){
            return true;
          }

          // 一个国家有多个手机区号的情况
          if(item.dialCode == 1 && item.areaCodes){
            return item.areaCodes.some(areaCode => areaCode == value);
          }
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
    }*/

    let areaCodeView = (dialCode, country) => {
      // 有些国家的手机区号会有多个值
      if(dialCode == 1 && country.areaCodes){
        let otherEnableCodes = country.areaCodes.slice(0, 5);
        return (country.areaCodes[0] + ` [${otherEnableCodes.join(', ')}]`);
      }
      return dialCode;
    }

    let stopWatchModelValue = watch(() => props.modelValue, () => {
      // 防止重复计算
      if(currentVal.value == props.modelValue){
        return;
      }
      // let cur = calcSelectedOption();
      // let cur = vueCountryTool.calcSelectedOption(props, countryList.value);
      let cur = vueCountryTool.findCountryInfo(props.modelValue, props.type, props.iso2, countryList.value);
      console.log('执行watch了');
      if(!cur){
        return;
      }
      if(cur !== selected.item){
        selected.item = cur;
        currentVal.value = props.modelValue;
        let isPhone = props.type.toLowerCase() === 'phone';
        let result = '';
        if(isPhone){
          // 一个国家有多个手机区号
          if(cur.dialCode == 1 && cur.areaCodes) {
            result = cur.areaCodes[0];
          }else {
            result = cur.dialCode || '';
          }
        }else{
          result = cur.iso2 || '';
        }
        context.emit('onChange', cur, result);
      }
    }, { immediate: true });

    onMounted(() => {
      if(props.type == 'phone' && (props.iso2 + '').length == 0){
        console.warn('当type=phone时最好传递iso2属性，否则当区号代码为212或358时会出现选择不正确问题！');
      }
    });

    onUnmounted(function () {
      stopWatchModelValue();
    });

    return {
      selected,
      countryList,
      areaCodeView,
      countryItemClickEvt
    };
  }
}
</script>

<style>
@import "country-list.css";
</style>
