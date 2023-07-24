import {
  hasScroll,
  scrollWidth
} from '../utils';

/**
 * 锁定浏览器滚动条
 */
export function useLockScroll () {
  let body = document.body;
  // 锁定滚动条之前body的overflow属性
  let originBodyOverflow = body.style.overflow;
  let originBodyPaddingRight = body.style.paddingRight;
  let originBodyPaddingBottom = body.style.paddingBottom;
  let originBodyHasLockClass = body.classList.contains('lock-scroll');
  let bodyHasScroll = hasScroll();
  let bodyScrollWidth = scrollWidth();
  body.style.overflow = 'hidden';
  if (!originBodyHasLockClass) {
    body.classList.add('lock-scroll');
  }
  if (bodyHasScroll.vertical) {
    document.body.style.paddingRight = bodyScrollWidth.vertical + 'px';
  }
  if (bodyHasScroll.horizontal) {
    body.style.paddingBottom = bodyScrollWidth.horizontal + 'px';
  }

  // 返回一个解除锁定滚动条的函数
  return function () {
    let body = document.body;
    if (!originBodyHasLockClass) {
      body.classList.remove('lock-scroll');
    }
    if (!originBodyOverflow && originBodyOverflow !== 'hidden') {
      body.style.overflow = originBodyOverflow;
    } else {
      body.style.overflow = ''; // 移除body上的overflow属性
    }

    if (!originBodyPaddingRight && parseFloat(originBodyPaddingRight) !== bodyScrollWidth.vertical) {
      body.style.paddingRight = originBodyPaddingRight;
    } else {
      body.style.paddingRight = ''; // 移除body上的paddingRight属性
    }

    if (!originBodyPaddingBottom && parseFloat(originBodyPaddingBottom) !== bodyScrollWidth.horizontal) {
      body.style.paddingBottom = originBodyPaddingBottom;
    } else {
      body.style.paddingBottom = ''; // 移除body上的paddingBottom属性
    }
  };
};
