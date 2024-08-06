import { reactive, ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue';
import CountryList from '../country-list/CountryList.vue';
import { SlotRender } from '../slot-render/SlotRender';
import { countriesData } from '../country-list/data';
import { findCountryInfo } from '../utils';
import { countryListProps } from "../country-list/country-list-props";
import EasyestDropdownTransition from 'easyest-dropdown/vue3/es/index';
import { emitOnChange, emitUpdateModelValue } from '../emits';

export default {
  name: "SchemaInput",
  components: {
    'country-list': CountryList,
    EasyestDropdownTransition,
    SlotRender
  },
  inheritAttrs: false,
  props: {
    ...countryListProps,
    // 下拉框placeholder
    placeholder: {
      type: String,
      default: '请选择国家',
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
    // ios移动终端输入框是否只读，默认为true，因为在ios手机终端中如不是只读模式会弹出选择下来框出来
    iosMobileReadonly: {
      type: Boolean,
      default: true
    },
    // 是否使用static布局
    static: {
      type: Boolean,
      default: false
    },
    transitionName: { // 过度效果名称
      type: String
    },
    rootSlots: { // 根组件的插槽
      type: Object,
      default () {
        return {};
      }
    },
    appendToBody: { // 是否将列表插入到body中
      type: Boolean,
      default: true
    }
  },
  emits: [emitUpdateModelValue, emitOnChange],
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

    let inputFocused = ref(false); // input输入框是否获得了焦点
    let listOnBottom = ref(true); // // 列表在输入框下方
    let isIos = ref(false);
    let deviceWidth = ref(window.innerWidth);
    let searchInput = ref(null);
    let vueCountryIntlWrapper = ref(null);

    let countryListDisplay = ref(false); // 列表是否渲染
    let countryListShow = ref(false); // 列表是否显示
    let countryListWillShow = ref(false); // 列表是否即将显示
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

    let show = () => {
      if (props.disabled || props.readonly) {
        return;
      }
      if (props.static) {
        inputFocused.value = true;
        searchText.value = '';
        return;
      }
      let handleShow = () => {
        countryListWillShow.value = true;

        let timer2 = setTimeout(function () {
          clearTimeout(timer2);
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
        }, 60);
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
      if (!countryListVisible.value || props.disabled || props.readonly) {
        return;
      }
      let timer = setTimeout(() => {
        clearTimeout(timer);
        searchText.value = '';
        inputFocused.value = false;
        countryListWillShow.value = false;
        countryListShow.value = false;
        // 隐藏后需要将方位复位，否则会计算不正确
        // listOnBottom.value = true;
      }, 100);
    }

    let onModelValue = function (newVal) {
      ctx.emit('update:modelValue', newVal);
    };

    watch(() => props.modelValue, (newVal) => {
      console.log('countryListDisplay', countryListDisplay.value);
      // 如果列表未被渲染过，则自己计算选中的项
      if(!countryListDisplay.value){
        console.log('列表未被渲染过，自己计算选中的项');
        // selected.item = vueCountryTool.calcSelectedOption(props, countriesData);
        selected.item = findCountryInfo(props.modelValue, props.type, props.iso2, countriesData);
      }
    }, { immediate: true });

    onMounted(() => {
      if(props.static){
        countryListDisplay.value = true;
      }
    });

    return {
      searchText,
      countryListDisplay,
      countryListVisible,
      inputFocused,
      listOnBottom,
      isIos,
      deviceWidth,
      inputWrap,
      countryList,
      viewText,
      selected,
      searchInput,
      vueCountryIntlWrapper,
      countryListWillShow,
      onCountryChange,
      onModelValue,
      hide,
      show,
      // 根据国籍编码或国家区号查找国籍信息
      getCountryInfo (countryCodeOrAreaCode, type = 'phone', iso2) {
        let country = findCountryInfo(countryCodeOrAreaCode, type, iso2, countriesData);
        if (!country.iso2) {
          return null;
        }
        return {
          ...country
        };
      },
      onPositionChange (positionInfo) {
        console.log('positionInfo', positionInfo);
        listOnBottom.value = positionInfo.direction == 'bottom';
      }
    }
  }
}
