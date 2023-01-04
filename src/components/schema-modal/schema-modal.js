import { reactive, ref, watch, onBeforeUnmount, onUnmounted } from 'vue';
import CountryList from '../country-list/CountryList.vue';
import { vueCountryTool } from '../vueCountryTool';
import { countriesData } from '../country-list/data';
import { useLockScroll } from '../hooks/useLockScroll';
import { countryListProps } from "../country-list/country-list-props";

export default {
  name: "SchemaModal",
  components: {
    'country-list': CountryList
  },
  inheritAttrs: false,
  props: {
    ...countryListProps,
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
    cancelText: {
      type: String,
      default: '取消'
    },
    visible: {
      type: Boolean,
      default: false
    },
    modalClass: {
      type: String,
      default: '',
    },
    transitionName: { // 过度效果名称
      type: String,
      default: 'fade'
    }
  },
  emits: ['update:modelValue', 'onChange', 'update:visible'],
  setup (props, ctx) {
    let selected = reactive({
      item: {}
    });
    let searchText = ref('');
    let modalVisible = ref(props.visible);
    let modalDisplay = ref(false);
    let countryListVisible = ref(false);
    let intlModal = ref(null);

    // 选择的城市改变事件
    let onCountryChange = (newCountry) => {
      console.log('onCountryChange执行了')
      console.log('设置selected', newCountry, newCountry.iso2, selected.item.iso2)
      if (newCountry.iso2 !== selected.item.iso2) {
        console.log('设置selected111')
        selected.item = newCountry;
        ctx.emit('onChange', newCountry);
        hide();
      }
    }
    let unlockScroll; // 解锁浏览器滚动条

    let show = () => {
      unlockScroll = useLockScroll();
      if (!countryListVisible.value) {
        countryListVisible.value = true;
      }
      modalVisible.value = true;
      ctx.emit('update:visible', true);
    }

    let hide = () => {
      if (!countryListVisible.value) {
        return;
      }
      let timer = setTimeout(() => {
        clearTimeout(timer);
        if (typeof unlockScroll == 'function') {
          unlockScroll();
          unlockScroll = null;
        }
        modalVisible.value = false;
        searchText.value = '';
        ctx.emit('update:visible', false);
      }, 100);
    }

    let onModelValueChange = function (newVal) {
      ctx.emit('update:modelValue', newVal);
    }

    let stopWatchVisible = watch(() => props.visible, (newVal) => {
      console.log('watch visible', newVal);
      if(newVal === modalVisible.value){
        return;
      }
      console.log('watch visible 执行显示/隐藏操作')
      if(newVal){
        if(!modalDisplay.value){
          modalDisplay.value = true;
          // selected.item = vueCountryTool.calcSelectedOption(props, countriesData);
          selected.item = vueCountryTool.findCountryInfo(props.modelValue, props.type, props.iso2, countriesData);
          let timer = setTimeout(() => {
            clearTimeout(timer);
            show();
          }, 0);
        }else{
          show();
        }
      }else {
        hide();
      }
    }, {
      immediate: true
    });

    onBeforeUnmount(() => {
      hide();
    });
    onUnmounted(function () {
      stopWatchVisible();
    });


    return {
      id: ref('vue_country_intl-' + (window._vueCountryIntl_count++)),
      selected,
      searchText,
      modalVisible,
      modalDisplay,
      countryListVisible,
      intlModal,
      onCountryChange,
      onModelValueChange,
      show,
      hide,
      // 根据国籍编码或国家区号查找国籍信息
      getCountryInfo (countryCodeOrAreaCode, type = 'phone', iso2) {
        let country = vueCountryTool.findCountryInfo(countryCodeOrAreaCode, type, iso2, countriesData);
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
