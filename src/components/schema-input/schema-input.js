import { reactive, ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue';
import CountryList from '../country-list/CountryList.vue';
import {vueCountryTool} from "../vueCountryTool";
import {countriesData} from '../country-list/data';

export default {
  name: "SchemaInput",
  components: {
    'country-list': CountryList
  },
  inheritAttrs: false,
  props: {
    // 下拉框placeholder
    placeholder: {
      type: String,
      default: '请选择国家',
    },
    // 是否显示区号
    showAreaCode: {
      type: Boolean,
      default: true,
    },
    // 实现自定义v-model第一步
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
    // 是否可以搜索
    searchAble: {
      type: Boolean,
      default: true,
    },
    // 列表的层级
    listZIndex: {
      type: Number,
      default: 0,
    },
    // 输入框中是否显示图片
    showLabelImg: {
      type: Boolean,
      default: true,
    },
    // input是否只显示选中的值，而不显示国际名称
    onlyValue: {
      type: Boolean,
      default: false,
    },
    // 列表最大高度
    maxHeight: {
      type: Number,
      default: 0,
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false,
    },
    // 是否只读
    readonly: {
      type: Boolean,
      default: false
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
    // ios移动终端输入框是否只读，默认为true，因为在ios手机终端中如不是只读模式会弹出选择下来框出来
    iosMobileReadonly: {
      type: Boolean,
      default: true
    },
    // 是否使用中文显示国籍名称
    useChinese: {
      type: Boolean,
      default: false
    },
    // 是否使用static布局
    static: {
      type: Boolean,
      default: false
    },
    transitionName: { // 过度效果名称
      type: String,
      default: 'fade_in_up'
    }
  },
  emits: ['update:modelValue', 'onChange'],
  setup(props, ctx){
    let selected = reactive({
      item: {}
    });
    let inputWrap = ref(null);
    let countryList = ref(null);
    let viewText = computed(() => {
      let selectedInner = selected.item;
      let name = props.useChinese ? selectedInner.nameCN : selectedInner.name;
      let value = (props.modelValue + '').charAt(0) == '+' ? props.modelValue.substr(1) : props.modelValue;
      if (props.type.toLowerCase() === 'phone') {
        let dialCode = selectedInner.dialCode;
        if (props.onlyValue) {
          // 处理一个国家有多个手机区号的情况
          if (dialCode == 1 && selectedInner.areaCodes) {
            return '+' + (value || selectedInner.areaCodes[0]);
          }
          return '+' + selectedInner.dialCode;
        } else if (props.showAreaCode) {
          // 处理一个国家有多个手机区号的情况
          if (dialCode == 1 && selectedInner.areaCodes) {
            return `${selectedInner.name}(+${value || selectedInner.areaCodes[0]})`;
          }
          return name + '(+' + selectedInner.dialCode + ')';
        } else {
          return name;
        }
      } else {
        if (props.onlyValue) {
          return selectedInner.iso2;
        } else {
          return name;
        }
      }
    });
    let searchText = ref('');
    let countryListDisplay = ref(false); // 列表是否渲染
    let countryListShow = ref(false); // 列表是否显示
    let inputFocused = ref(false); // input输入框是否获得了焦点
    let listOnBottom = ref(true); // // 列表在输入框下方
    let isIos = ref(false);
    let deviceWidth = ref(window.innerWidth);
    let schemaInputValue = ref(props.modelValue);
    let searchInput = ref(null);
    let vueCountryIntlWrapper = ref(null);
    let countryListVisible = computed(() => {
      return props.static || countryListShow.value;
    });

    // 选择的城市改变事件
    let onCountryChange = (newCountry) => {
      console.log('onCountryChange执行了')
      console.log('设置selected', newCountry, newCountry.iso2, selected.item.iso2)
      if(newCountry.iso2 !== selected.item.iso2){
        console.log('设置selected111')
        selected.item = newCountry;
        ctx.emit('onChange', newCountry);
      }
    }

    // 计算弹出层方位
    let calculatePopoverDirection = (ele, fn) => {
      let eleInView = vueCountryTool.eleIsIntoView(ele);
      if (eleInView) { // 元素完全出现在视口中
        listOnBottom.value = true;
      } else {
        // console.log('元素未完全出现在视口中，现尝试将位置反过来');
        // 如果列表朝下不能完全出现在视口时，则尝试将列表朝上
        ele.style.opacity = 0;
        listOnBottom.value = false;
        fn && typeof fn === 'function' && fn();
        nextTick(() => {
          ele.style.opacity = null;
          if (vueCountryTool.eleIsIntoView(ele)) { // 位置反过来后，元素完全出现在视口中
            // console.log('位置反过来后，元素完全出现在视口中');
          } else {
            // 位置反过来后，元素还是不能完全出现在视口中，则将其恢复原来的方向
            listOnBottom.value = true;
            fn && typeof fn === 'function' && fn();
          }
        });
      }
    }

    let show = () => {
      if (props.disabled || props.readonly || props.static) {
        return;
      }
      let handleShow = () => {
        inputFocused.value = true;
        countryListShow.value = true;
        searchText.value = '';

        if(!props.readonly){
          console.log('自动获得焦点')
          let timer = setTimeout(() => {
            clearTimeout(timer);
            searchInput.value.focus();
          }, 0);
        }

        // 每次显示时重新计算方位
        nextTick(() => {
          calculatePopoverDirection(countryList.value.$el);
        });
      }
      if(!countryListDisplay.value){
        countryListDisplay.value = true;
        let timer = setTimeout(() => {
          clearTimeout(timer);
          handleShow();
        }, 0);
      }else {
        handleShow();
      }
    }

    let hide = () => {
      if (props.disabled || props.readonly || props.static) {
        return;
      }
      let timer = setTimeout(() => {
        clearTimeout(timer);
        searchText.value = '';
        inputFocused.value = false;
        countryListShow.value = false;
        // 隐藏后需要将方位复位，否则会计算不正确
        listOnBottom.value = true;
      }, 100);
    }

    let stopWatchSchemaInputValue = watch(schemaInputValue, (newVal) => {
      console.log('watch schemaInputValue', newVal, schemaInputValue.value);
      if(props.modelValue != newVal){
        console.log('执行修改modelValue');
        ctx.emit('update:modelValue', newVal);
      }
    }, { immediate: true });
    let stopWatchModelValue = watch(() => props.modelValue, (newVal) => {
      console.log('watch modelValue', newVal, schemaInputValue.value)
      if(schemaInputValue.value != newVal){
        console.log('modelValue外部改变，执行同步schemaInputValue')
        schemaInputValue.value = newVal;
      }
      console.log('countryListDisplay', countryListDisplay.value);
      // 如果列表未被渲染过，则自己计算选中的项
      if(!countryListDisplay.value){
        console.log('列表未被渲染过，自己计算选中的项');
        selected.item = vueCountryTool.calcSelectedOption(props, countriesData);
      }
    }, { immediate: true });

    onMounted(() => {
      if(props.static){
        countryListDisplay.value = true;
      }
    });

    onUnmounted(function () {
      stopWatchModelValue();
      stopWatchSchemaInputValue();
    });

    return {
      id: ref('vue_country_intl-' + (window._vueCountryIntl_count++ || 1)),
      searchText,
      countryListDisplay,
      countryListVisible,
      inputFocused,
      listOnBottom,
      isIos,
      deviceWidth,
      schemaInputValue,
      inputWrap,
      countryList,
      viewText,
      selected,
      searchInput,
      vueCountryIntlWrapper,
      onCountryChange,
      hide,
      show
    }
  }
}
