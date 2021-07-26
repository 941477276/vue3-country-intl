import { ref, reactive, watch, onMounted, nextTick, onBeforeUnmount } from 'vue';
import CountryList from '../country-list/CountryList.vue';
import {vueCountryTool} from "../vueCountryTool";

export default {
  name: "SchemaPopover",
  components: {
    'country-list': CountryList
  },
  inheritAttrs: false,
  props: {
    visible: { // 是否展示
      type: Boolean,
      default: false
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
    /*listZIndex: {
      type: Number,
      default: 0,
    },*/
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
    /*maxHeight: {
      type: Number,
      default: 0,
    },*/
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
    /*// 触发方式，tippy支持的触发方式
    trigger: {
      type: String,
      default: 'click',
    },
    // 点击reference是否可以显示popover弹窗
    referenceTrigger: {
      type: Boolean,
      default: true,
    },*/
    // popover弹窗距离参照元素的距离。
    /*offsetTop: {
      type: Number,
      default: 10,
    },*/
    // popover弹窗额外class。
    popoverClass: {
      type: String,
      default: '',
    },
    /*elId: {
      type: String,
      default: ''
    },*/
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
    transitionName: { // 过度效果名称
      type: String,
      default: 'zoom_in'
    }
  },
  emits: ['update:modelValue', 'onChange', 'update:visible'],
  setup(props, ctx){
    let selected = reactive({
      item: {}
    });
    let searchText = ref('');
    let countryListShow = ref(false); // 列表是否显示
    let listOnBottom = ref(true); // // 列表在输入框下方
    let schemaPopoverValue = ref(props.modelValue);
    let popoverContainer = ref(null);
    let popover = ref(null);
    let popoverVisible = ref(false);

    // popover 定位数据
    let popoverPosition = reactive({
      left: '-100%',
      top: '-100%'
    });
    let popoverMaxWidth = ref(null);



    // 判断popover是否完全出现在视口
    let popoverInView = (top, left) => {
      // 浏览器滚动条高度
      let scrollTop = vueCountryTool.scrollTop();
      console.log('scrollTop', scrollTop);
      top -= scrollTop;
      let bottom = popover.value.offsetHeight + top;
      let wh = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight; // 浏览器高度兼容写法
      console.log('popoverInView', top, bottom, popover.value.offsetHeight, wh);
      if (top > 0 && top < wh && bottom > 0 && bottom < wh) { // 完全出现在视口中
        return true;
      }else{
        return false;
      }
    };

    let show = () => {
      if(props.disabled || props.readonly){
        return;
      }
      nextTick(() => {
        let containerEl = popoverContainer.value;
        // 容器位置
        let popoverContainerOffset = vueCountryTool.offset(containerEl);
        let popoverContainerHeight = containerEl.offsetHeight;

        let top = 0;
        let left = popoverContainerOffset.left + props.offset[0];
        top = (popoverContainerOffset.top + popoverContainerHeight + props.offset[1]);

        console.log('top left', top, left);
        let isInView = popoverInView(top, left);

        if(isInView){ // 判断popover是否应该出现在参照目标的下方
          listOnBottom.value = true;
          console.log(111);
        }else {
          // 如果popover在参照物下方不能完全展示，则反转一下
          let topNew = (popoverContainerOffset.top - popover.value.offsetHeight - props.offset[1]);
          console.log(222, topNew);
          if(popoverInView(topNew, left)){
            console.log(333);
            top = topNew;
            listOnBottom.value = false;
          }else {
            listOnBottom.value = true;
          }
        }

        popoverPosition.top = top + 'px';
        popoverPosition.left = left + 'px';

        let viewportW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        if(viewportW < 992){
          popoverMaxWidth.value = `calc(100vw - ${left}px - ${props.rightOffset}px)`;
        }else{
          popoverMaxWidth.value = null;
        }
        console.log('popoverMaxWidth', popoverMaxWidth.value);
      });

    }
    let hide = () => {
      ctx.emit('update:visible', false);
    }



    watch(schemaPopoverValue, (newVal) => {
      console.log('watch schemaPopoverValue', newVal, schemaPopoverValue.value);
      if(props.modelValue != newVal){
        console.log('执行修改modelValue');
        ctx.emit('update:modelValue', newVal);
      }
    }, { immediate: true });
    watch(() => props.modelValue, (newVal) => {
      console.log('watch modelValue', newVal, schemaPopoverValue.value)
      if(schemaPopoverValue.value != newVal){
        console.log('modelValue外部改变，执行同步schemaPopoverValue')
        schemaPopoverValue.value = newVal;
      }
    });
    watch(() => props.visible, (newVal) => {
      if(newVal){
        show();
      }
    });

    // 选择的城市改变事件
    let onCountryChange = (newCountry) => {
      console.log('onCountryChange执行了')
      console.log('设置selected', newCountry, newCountry.iso2, selected.item.iso2)
      if(newCountry.iso2 !== selected.item.iso2){
        console.log('设置selected111')
        selected.item = newCountry;
        ctx.emit('onChange', newCountry);
        hide();
      }
    }

    // 给文档绑定点击事件
    let documentClickEvt = function (evt){
      evt = evt || window.event;
      let target = evt.target;
      if(vueCountryTool.elementContains(popoverContainer.value, target) || vueCountryTool.elementContains(popover.value, target)){
        return;
      }
      hide();
    };

    onMounted(() => {
      vueCountryTool.bindEvent(document.body, 'click', documentClickEvt);
    });

    onBeforeUnmount(() => {
      vueCountryTool.unBindEvent(document.body, 'click', documentClickEvt);
    });

    return {
      id: ref('vue_country_intl-' + (window._vueCountryIntl_count++ || 2)),
      selected,
      searchText,
      countryListShow,
      listOnBottom,
      schemaPopoverValue,

      popoverContainer,
      popover,
      popoverVisible,
      popoverPosition,
      popoverMaxWidth,

      onCountryChange,
      show,
      hide
    };
  }
}
