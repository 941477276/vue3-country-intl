<template>
  <div class="vue3-yn-country-flag" :title="useTitle ? eleTitle : null" @click="onClick_">
    <img class="country-flag-img" :src="countryFlagPath" :alt="value">
    <slot :country="country.value"></slot>
  </div>
</template>

<script>
import {reactive, computed} from 'vue';
import {countriesData} from '../country-list/data';

export default {
  name: "Vue3CountryFlag",
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    // 类型，有两种类型，第一种：选择手机号码区号，值为phone;第二种：选择国家，值为country
    type: {
      type: String,
      default: 'country',
    },
    iso2: { // 国籍代码，当type=phone时必须传递iso2属性，否则当区号代码为212或358时会出问题！
      type: String,
      default: ''
    },
    useTitle: {
      type: Boolean,
      default: true
    }
  },
  emits: ['click'],
  setup(props, ctx){
    let country = reactive({
      value: {}
    });
    // 计算选中的国家
    let calcSelectedOption = function (value, type, countryList) {
      if((value + '').length == 0){
        return {};
      }
      if ((value + '').charAt(0) === '+') {
        value = value.substr(1);
      }
      let item = countryList.filter((item) => {
        // 判断国籍编码是否与value相等
        let iso2Equal = item.iso2 == value;
        if(iso2Equal){
          return true;
        }
        // 判断传递的props里的iso2是否相等
        let propIso2Equal = item.iso2 == props.iso2;
        if(propIso2Equal){
          return true;
        }
        // 一个国家只有一个手机区号的情况
        let dialCodeEqual = item.dialCode == value;
        if(dialCodeEqual){
          return true;
        }
        // 一个国家有多个手机区号的情况
        let mutipleDialCodeEqual = (item.dialCode == 1 && item.areaCodes) && item.areaCodes.some(areaCode => areaCode == value);
        if(mutipleDialCodeEqual){
          return true;
        }
      });
      if (!item || item.length === 0) {
        item = {};
      } else {
        item = item[0] || {};
      }
      country.value = item;
      return item;
    };

    // 计算选中国籍的国旗文件的路径
    let countryFlagPath = computed(() => {
      let svgPathObj = (window || Math).__vue3_country_flag_files_path_obj || {};
      if(!props.value){
        // 空白
        return svgPathObj['empty'];
      }
      let country = calcSelectedOption(props.value, props.type, countriesData);
      // console.log('country', country);
      if(country){
        return svgPathObj[country.iso2];
      }
      // 未知国家
      return svgPathObj['unknown'];
    });

    // 计算dom元素title
    let eleTitle = computed(() => {
      let countryInner = country.value;
      let value = (props.value + '').charAt(0) == '+' ? props.value.substr(1) : props.value;
      if (props.type.toLowerCase() === 'phone') {
        // let dialCode = country.dialCode;
        // 处理一个国家有多个手机区号的情况
        if (countryInner.dialCode == 1 && countryInner.areaCodes) {
          return `${countryInner.name}(+${value || countryInner.areaCodes[0]})`;
        }
        return countryInner.name + '(+' + countryInner.dialCode + ')';
      } else {
        return countryInner.name;
      }
    });

    let getCountry = function (){
      return {...country.value};
    };
    let onClick_ = () => {
      ctx.emit('click');
    };

    return {
      country,
      countryFlagPath,
      eleTitle,
      getCountry,
      onClick_
    }

  }
};
</script>

<style>
.vue3-yn-country-flag{
  display: inline-block;
  vertical-align: middle;
}
.vue3-yn-country-flag .country-flag-img{
  display: inline-block;
  vertical-align: middle;
  max-width: 100%;
  width: 20px;
  min-height: 10px;
}
</style>
