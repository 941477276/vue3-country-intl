import { ref, reactive, watch, onMounted, nextTick, onUnmounted } from 'vue';
import CountryList from '../country-list/CountryList.vue';
import {vueCountryTool} from "../vueCountryTool";
import {countriesData} from '../country-list/data';
import { countryListProps } from "../country-list/country-list-props";

export default {
  name: "SchemaPopover",
  components: {
    'country-list': CountryList
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
    let listOnBottom = ref(true); // // 列表在输入框下方
    let popoverContainer = ref(null);
    let popover = ref(null);
    let popoverVisible = ref(false);
    let popoverDisplay = ref(false);

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
      // console.log('scrollTop', scrollTop);
      top = top - scrollTop;
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
        // 参照物距浏览器顶部的距离
        let popoverContainerOffset = vueCountryTool.offset(containerEl);
        let popoverContainerHeight = containerEl.offsetHeight;
        let scrollParent = vueCountryTool.getScrollParent(containerEl);
        // 参照物有滚动条的父级容器滚动条的位置
        let eleWrapperScrollTop = 0;
        // 浏览器滚动条的位置
        let scrollTop = vueCountryTool.scrollTop();
        if(scrollParent && scrollParent.nodeName != 'HTML'){
          eleWrapperScrollTop = eleWrapperScrollTop = vueCountryTool.scrollTop(containerEl);
        }

        let top = 0;
        let left = popoverContainerOffset.left + props.offset[0];
        top = (popoverContainerOffset.top + popoverContainerHeight + props.offset[1] - eleWrapperScrollTop);
        // console.log('popoverContainerOffset', popoverContainerOffset);
        // console.log('eleWrapperScrollTop', eleWrapperScrollTop);
        // console.log('eleWrapperScrollTop', eleWrapperScrollTop);
        console.log('top left', top, left);
        let isInView = popoverInView(top, left);

        if(isInView){ // 判断popover是否应该出现在参照目标的下方
          listOnBottom.value = true;
          console.log(111);
        }else {
          // 如果popover在参照物下方不能完全展示，则反转一下
          let topNew = (popoverContainerOffset.top - popover.value.offsetHeight - props.offset[1] - eleWrapperScrollTop);
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
      console.log('hide fun');
      ctx.emit('update:visible', false);
    }

    let onModelValueChange = function (newVal) {
      ctx.emit('update:modelValue', newVal);
    };

    let stopWatchVisible = watch(() => props.visible, (newVal) => {
      if(newVal){
        if(!popoverDisplay.value){
          popoverDisplay.value = true;
          // selected.item = vueCountryTool.calcSelectedOption(props, countriesData);
          selected.item = vueCountryTool.findCountryInfo(props.modelValue, props.type, props.iso2, countriesData);
          console.log('首次计算默认选中项', selected.item);
          let timer = setTimeout(() => {
            clearTimeout(timer);
            show();
          }, 0);
        }else{
          show();
        }
      }
    });

    // 选择的城市改变事件
    let onCountryChange = (newCountry) => {
      console.log('onCountryChange执行了')
      console.log('设置selected', newCountry, newCountry.iso2, selected.item.iso2)
      if(newCountry.iso2 !== selected.item.iso2){
        selected.item = newCountry;
        ctx.emit('onChange', newCountry);
        hide();
      }
    }

    // 给文档绑定点击事件
    let documentClickEvt = function (evt){
      evt = evt || window.event;
      let target = evt.target;
      console.log('document.body click');
      if (!props.visible) {
        return;
      }
      if(vueCountryTool.elementContains(popoverContainer.value, target) || vueCountryTool.elementContains(popover.value, target)){
        console.log('阻止了');
        return;
      }
      hide();
    };

    onMounted(() => {
      vueCountryTool.bindEvent(document.body, 'click', documentClickEvt);
    });

    onUnmounted(function () {
      stopWatchVisible();

      vueCountryTool.unBindEvent(document.body, 'click', documentClickEvt);
    });

    return {
      id: ref('vue_country_intl-' + (window._vueCountryIntl_count++ || 2)),
      selected,
      searchText,
      listOnBottom,
      popoverDisplay,

      popoverContainer,
      popover,
      popoverVisible,
      popoverPosition,
      popoverMaxWidth,

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
