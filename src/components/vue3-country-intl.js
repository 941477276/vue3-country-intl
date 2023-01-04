import SchemaInput from './schema-input/SchemaInput.vue';
import SchemaPopover from './schema-popover/SchemaPopover.vue';
import SchemaModal from './schema-modal/SchemaModal.vue';
import {vueCountryTool} from "./vueCountryTool";
import { reactive, ref, onMounted, watch, onUnmounted } from 'vue';

/*
  {
    // 区域代码
    areaCodes: null,
    // 国际区号
    dialCode: "86",
    // iso2国家代码
    iso2: "cn",
    // 显示的文字
    name: "China (中国)",
    // 优先级
    priority: 0
  }
   */
export default {
  name: 'Vue3CountryIntl',
  components: {
    'schema-input': SchemaInput,
    'schema-popover': SchemaPopover,
    'schema-modal': SchemaModal
  },
  props: {
    // 展示模式
    schema: {
      type: String,
      // 有两种模式，input: 输入框模式(默认)；popover: popover弹窗模式
      default: 'input',
    },
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
    searchInputPlaceholder: {
      type: String,
      default: '输入国家名称、区号搜索'
    },
    // popover弹窗距离参照元素的距离。只有在schema=popover时有效
    offsetTop: {
      type: Number,
      default: 10,
    },
    // popover弹窗额外class。只有在schema=popover时有效
    popoverClass: {
      type: String,
      default: '',
    },
    // modal弹出显示。只有在schema=modal时有效
    visible: {
      type: Boolean,
      default: false
    },
    // model弹窗额外class。只有在schema=model时有效
    modalClass: {
      type: String,
      default: '',
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    /* 禁用的国家(可以传递国家名称、国家代码、国家区号)，可以传递字符串也可以传递数组，传递字符串时禁用多个国家使用逗号分隔 */
    disableCountry: {
      type: [String, Array],
      default(){
        return [];
      }
    },
    // 只显示指定的国家，可以传递字符串也可以传递数组，传递字符串时禁用多个国家使用逗号分隔
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
    // popover弹窗距离点击区域的距离，只有在schema=popover时有效
    offset: {
      type: Array,
      default(){
        return [0, 10]
      }
    },
    // popover弹窗距离浏览器右侧距离，该值只有在小屏下有效，只有在schema=popover时有效
    rightOffset: {
      type: Number,
      default: 20
    },
    transitionName: { // 过度效果名称
      type: [String, undefined],
      default: undefined
    }
  },
  emits: ['update:modelValue', 'update:visible', 'onChange'],
  setup(props, ctx){
    if(!window._vueCountryIntl_count){
      window._vueCountryIntl_count = 1;
    }
    let selected = reactive({
      item: {}
    });
    let onChange = (newCountry) => {
      selected.item = newCountry;
      ctx.emit('onChange', newCountry);
    };
    let modalVisible = ref(props.visible);
    /* let countryIntlValue = ref(props.modelValue);

    let stopWatchCountryIntlValue = watch(countryIntlValue, (newVal) => {
      if(props.modelValue != newVal){
        ctx.emit('update:modelValue', newVal);
      }
    }, { immediate: true }); */
    /* let stopWatchModelValue = watch(() => props.modelValue, (newVal) => {
      if(countryIntlValue.value != newVal){
        countryIntlValue.value = newVal;
      }
    }); */

    let stopWatchVisible;
    let stopWatchModalVisible;
    if(props.schema == 'modal' || props.schema == 'popover'){
      stopWatchVisible = watch(() => props.visible, (newVal) => {
        if(newVal != modalVisible.value){
          modalVisible.value = newVal;
        }
      });
      stopWatchModalVisible = watch(modalVisible, (newVal) => {
        if(newVal != props.visible){
          ctx.emit('update:visible', newVal);
        }
      });
    }

    let onModelValueChange = function (newValue) {
      ctx.emit('update:modelValue', newValue)
    };

    let schemaInput = ref(null);
    let schemaPopover = ref(null);
    let modalPopover = ref(null);

    let getSelected = () => {
      return selected.item;
    }
    let show = () => {
      let com;
      switch (props.schema) {
        case 'input':
          com = schemaInput;
          break;
        case 'popover':
          com = schemaPopover;
          break;
        case 'modal':
          com = modalPopover;
          break;
      }
      com.value.show();
    };
    let hide = () => {
      let com;
      switch (props.schema) {
        case 'input':
          com = schemaInput;
          break;
        case 'popover':
          com = schemaPopover;
          break;
        case 'modal':
          com = modalPopover;
          break;
      }
      com.value.hide();
    };

    onMounted(() => {
      let classList = document.body.classList;
      // 解决ios无法点击问题
      if(vueCountryTool.termianl().ios && !classList.contains('vue-country-ios')){
        classList.add('vue-country-ios');
      }
    });

    onUnmounted(function () {
      // stopWatchCountryIntlValue();
      // stopWatchModelValue();
      if (typeof stopWatchVisible === 'function') {
        stopWatchVisible();
      }
      if (typeof stopWatchModalVisible === 'function') {
        stopWatchModalVisible();
      }
    });

    return {
      onChange,
      version: '1.0.16',
      getSelected,
      modalVisible,
      // countryIntlValue,
      show,
      hide,
      schemaInput,
      schemaPopover,
      modalPopover,
      onModelValueChange,
      // 根据国籍编码或国家区号查找国籍信息
      getCountryInfo (countryCodeOrAreaCode, type = 'phone', iso2) {
        let com;
        switch (props.schema) {
          case 'input':
            com = schemaInput;
            break;
          case 'popover':
            com = schemaPopover;
            break;
          case 'modal':
            com = modalPopover;
            break;
        }
        return com.value.getCountryInfo(countryCodeOrAreaCode, type, iso2);
      }
    }
  }
};
