import { ref, reactive, watch, onMounted, nextTick, onUnmounted } from 'vue';
import CountryList from '../country-list/CountryList.vue';
import {countriesData} from '../country-list/data';
import { countryListProps } from "../country-list/country-list-props";
import EasyestDropdownTransition from 'easyest-dropdown/vue3/es/index';
import { findCountryInfo, elementContains } from '../utils';
import { emitUpdateVisible, emitUpdateModelValue, emitOnChange } from '../emits';

export default {
  name: "SchemaPopover",
  components: {
    'country-list': CountryList,
    EasyestDropdownTransition
  },
  inheritAttrs: false,
  props: {
    ...countryListProps,
    visible: { // 是否展示
      type: Boolean,
      default: false
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
    searchInputPlaceholder: {
      type: String,
      default: '输入国家名称、区号搜索'
    },
    // popover弹窗额外class。
    popoverClass: {
      type: String,
      default: '',
    },
    // popover弹窗距离点击区域的距离
    offset: {
      type: Array,
      default(){
        return [0, 10]
      }
    },
    // popover弹窗距离浏览器右侧距离，该值只有在小屏下有效
    rightOffset: {
      type: Number,
      default: 20
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
    },
    transitionName: { // 过度效果名称
      type: String,
      default: 'easyest-zoom'
    }
  },
  emits: [emitUpdateVisible, emitUpdateModelValue, emitOnChange],
  setup(props, ctx){
    let selected = reactive({
      item: {}
    });
    let searchText = ref('');
    let listOnBottom = ref(true); // // 列表在输入框下方
    let popoverContainer = ref(null);
    let popover = ref(null);

    let popoverVisible = ref(false);
    let popoverWillVisible = ref(false);
    let popoverDisplay = ref(false);

    let hide = () => {
      popoverWillVisible.value = false;
      popoverVisible.value = false;
      ctx.emit('update:visible', false);
    }

    let onModelValueChange = function (newVal) {
      ctx.emit('update:modelValue', newVal);
    };

    let watchVisibleTimer;
    watch(() => props.visible, (newVal) => {
      let doShow = function () {
        popoverWillVisible.value = true;
        watchVisibleTimer = setTimeout(function () {
          clearTimeout(watchVisibleTimer);
          popoverVisible.value = true;
        }, 60);
      }
      if(newVal){
        if(!popoverDisplay.value){
          popoverDisplay.value = true;
          selected.item = findCountryInfo(props.modelValue, props.type, props.iso2, countriesData);
          console.log('首次计算默认选中项', selected.item);
          let timer = setTimeout(() => {
            clearTimeout(timer);
            // show();
            clearTimeout(watchVisibleTimer);
            doShow();
          }, 20);
        }else{
          // show();
          clearTimeout(watchVisibleTimer);
          doShow();
        }
      } else {
        popoverWillVisible.value = false;
        popoverVisible.value = false;
      }
    });

    // 选择的城市改变事件
    let onCountryChange = (newCountry) => {
      console.log('onCountryChange执行了')
      if(newCountry.iso2 !== selected.item.iso2){
        selected.item = newCountry;
        ctx.emit('onChange', newCountry);
        let timer = setTimeout(function () {
          clearTimeout(timer);
          hide();
        }, 150);
      }
    }

    // 给文档绑定点击事件
    let documentClickEvt = function (evt){
      evt = evt || window.event;
      let target = evt.target;
      if (!props.visible) {
        return;
      }
      console.log('document.body click');
      if(elementContains(popoverContainer.value, target) || elementContains(popover.value, target)){
        console.log('阻止了');
        return;
      }
      hide();
    };

    onMounted(() => {
      document.documentElement.addEventListener('click', documentClickEvt, false);
    });

    onUnmounted(function () {
      document.documentElement.removeEventListener('click', documentClickEvt, false);
    });

    return {
      selected,
      searchText,
      listOnBottom,
      popoverDisplay,

      popoverContainer,
      popover,
      popoverVisible,
      popoverWillVisible,

      onCountryChange,
      onModelValueChange,
      hide,
      // 根据国籍编码或国家区号查找国籍信息
      getCountryInfo (countryCodeOrAreaCode, type = 'phone', iso2) {
        let country = findCountryInfo(countryCodeOrAreaCode, type, iso2, countriesData);
        if (!country.iso2) {
          return null;
        }
        return {
          ...country
        };
      }
    };
  }
}
