import { reactive, ref, watch, onMounted, onBeforeUnmount } from 'vue';
import CountryList from '../country-list/CountryList.vue';
// import {vueCountryTool} from "../vueCountryTool";
export default {
  name: "SchemaModal",
  components: {
    'country-list': CountryList
  },
  inheritAttrs: false,
  props: {
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
    /* 禁用的国家(可以传递国家名称、国家代码、国家区号)，可以传递字符串也可以传递数组，传递字符串时禁用多个国家使用逗号分隔 */
    disableCountry: {
      type: [String, Array],
      default () {
        return [];
      }
    },
    // 只显示指定的国家，可以传递字符串也可以传递数组，传递字符串时多个国家使用逗号分隔
    onlyCountry: {
      type: [String, Array],
      default () {
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
  emits: ['update:modelValue', 'onChange', 'update:visible'],
  setup (props, ctx) {
    let selected = reactive({
      item: {}
    });
    let searchText = ref('');
    let schemaModalValue = ref(props.modelValue);
    let modalVisible = ref(props.visible);
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

    let show = () => {
      let classList = document.body.classList;
      if (!classList.contains('lock-scroll')) {
        classList.add('lock-scroll');
      }
      if (!countryListVisible.value) {
        countryListVisible.value = true;
      }
      modalVisible.value = true;
      ctx.emit('update:visible', true);
    }

    let hide = () => {
      let classList = document.body.classList;
      let timer = setTimeout(() => {
        clearTimeout(timer);
        // 解决ios无法点击问题
        if (classList.contains('lock-scroll')) {
          classList.remove('lock-scroll');
        }
        modalVisible.value = false;
        searchText.value = '';
        ctx.emit('update:visible', false);
      }, 100);
    }

    watch(schemaModalValue, (newVal) => {
      console.log('watch schemaModalValue', newVal, schemaModalValue.value);
      if (props.modelValue != newVal) {
        console.log('执行修改modelValue');
        ctx.emit('update:modelValue', newVal);
      }
    }, { immediate: true });
    watch(() => props.modelValue, (newVal) => {
      console.log('watch modelValue', newVal, schemaModalValue.value)
      if (schemaModalValue.value != newVal) {
        console.log('modelValue外部改变，执行同步schemaModalValue')
        schemaModalValue.value = newVal;
      }
    });
    watch(() => props.visible, (newVal) => {
      console.log('watch visible', newVal);
      if(newVal === modalVisible.value){
        return;
      }
      console.log('watch visible 执行显示/隐藏操作')
      if(newVal){
        show();
      }else {
        hide();
      }
    });

    onMounted(() => {
      try {
        document.body.appendChild(intlModal.value);
      } catch (e) {
        console.log(e);
      }
      if (props.visible) {
        show();
      }
    });
    onBeforeUnmount(() => {
      hide();
      try {
        document.body.removeChild(intlModal.value);
      } catch (e) {
        console.log(e);
      }
    });

    return {
      id: ref('vue_country_intl-' + (window._vueCountryIntl_count++)),
      selected,
      searchText,
      schemaModalValue,
      modalVisible,
      countryListVisible,
      intlModal,
      onCountryChange,
      show,
      hide
    };
  }
}
