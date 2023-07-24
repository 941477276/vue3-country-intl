import { ref, onMounted, onBeforeUnmount } from 'vue';
import {
  elementContains,
  isObject
} from '../utils';

export function useClickOutside (eleRefs, callback) {
  let flag = ref(false);
  let documentClickEvt = function (evt) {
    let target = evt.target;
    if (Array.isArray(eleRefs)) {
      flag.value = !eleRefs.some(function (refItem) {
        let refValue = refItem.value;
        let el = refItem.value;
        if (isObject(refValue) && refValue.$el) {
          el = refValue.$el;
        }
        // 点击的元素与参照元素一样，则不算点击在了外面
        if (el === target) {
          return true;
        }
        return elementContains(el);
      });
    } else {
      let refValue = eleRefs.value;
      let el = eleRefs.value;
      if (isObject(refValue) && refValue.$el) {
        el = refValue.$el;
      }
      if (el === target) { // 点击的元素与参照元素一样，则不算点击在了外面
        flag.value = false;
      } else {
        flag.value = !elementContains(el, target);
      }
    }
    if (typeof callback == 'function') {
      callback(flag.value);
    }
  };
  onMounted(() => {
    document.documentElement.addEventListener('click', documentClickEvt, false);
  });
  onBeforeUnmount(() => {
    document.documentElement.removeEventListener('click', documentClickEvt, false);
  });
  return flag;
}
