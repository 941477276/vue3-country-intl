import { ref, onMounted, onBeforeUnmount } from 'vue';
import { vueCountryTool } from '../components/vueCountryTool';

export function useClickOutside (eleRefs, callback) {
  let flag = ref(false);
  let documentClickEvt = function (evt) {
    let target = evt.target;
    if (Array.isArray(eleRefs)) {
      flag.value = !eleRefs.some(function (refItem) {
        // 点击的元素与参照元素一样，则不算点击在了外面
        if (refItem.value === target) {
          return true;
        }
        return vueCountryTool.elementContains(refItem.value, target);
      });
    } else {
      if (eleRefs.value === target) {
        flag.value = false;
      } else {
        flag.value = !vueCountryTool.elementContains(eleRefs.value, target);
      }
    }
    // console.log('document click event', flag.value);
    if (typeof callback == 'function') {
      callback(flag.value);
    }
  };
  onMounted(() => {
    document.documentElement.addEventListener('click', documentClickEvt, false);
    // useGlobalEvent.addEvent('document', 'click', documentClickEvt);
  });
  onBeforeUnmount(() => {
    document.documentElement.removeEventListener('click', documentClickEvt, false);
    // useGlobalEvent.removeEvent('document', 'click', documentClickEvt);
  });
  return flag;
}
