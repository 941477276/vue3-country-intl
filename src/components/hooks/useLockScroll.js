import { vueCountryTool } from '../vueCountryTool';

/**
 * 锁定浏览器滚动条
 */
export function useLockScroll () {
  let body = document.body;
  // 锁定滚动条之前body的overflow属性
  let originBodyOverflow = body.style.overflow;
  let originBodyPaddingRight = body.style.paddingRight;
  let originBodyPaddingBottom = body.style.paddingBottom;
  let originBodyHasLockClass = vueCountryTool.hasClass(body, 'bs-lock-scroll');
  let hasScroll = vueCountryTool.hasScroll();
  let scrollWidth = vueCountryTool.scrollWidth();

  body.style.overflow = 'hidden';
  if (!originBodyHasLockClass) {
    vueCountryTool.addClass(body, 'lock-scroll');
  }
  if (hasScroll.vertical) {
    document.body.style.paddingRight = scrollWidth.vertical + 'px';
  }
  if (hasScroll.horizontal) {
    body.style.paddingBottom = scrollWidth.horizontal + 'px';
  }

  // 返回一个解除锁定滚动条的函数
  return function () {
    let body = document.body;
    if (!originBodyHasLockClass) {
      vueCountryTool.removeClass(body, 'lock-scroll');
    }
    if (!originBodyOverflow && originBodyOverflow !== 'hidden') {
      body.style.overflow = originBodyOverflow;
    } else {
      body.style.overflow = ''; // 移除body上的overflow属性
    }

    if (!originBodyPaddingRight && parseFloat(originBodyPaddingRight) !== scrollWidth.vertical) {
      body.style.paddingRight = originBodyPaddingRight;
    } else {
      body.style.paddingRight = ''; // 移除body上的paddingRight属性
    }

    if (!originBodyPaddingBottom && parseFloat(originBodyPaddingBottom) !== scrollWidth.horizontal) {
      body.style.paddingBottom = originBodyPaddingBottom;
    } else {
      body.style.paddingBottom = ''; // 移除body上的paddingBottom属性
    }
  };
};
