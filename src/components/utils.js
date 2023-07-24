/**
 * 判断两个元素是否是包含关系
 * @param ele 父元素
 * @param childEle 子元素
 * @returns {Boolean}
 */
export function elementContains (ele, childEle) {
  if (ele === childEle) {
    return false;
  }
  if (!ele) {
    return false;
  }
  if (typeof ele.contains === 'function') {
    return ele.contains(childEle);
  } else {
    while (true) {
      if (!childEle) {
        return false;
      }
      if (childEle === ele) {
        return true;
      } else {
        childEle = childEle.parentNode;
      }
    }
    return false;
  }
}

/**
 * 判断传入的参数是否为普通对象
 * @param val
 */
export function isObject (val) {
  return val !== null && typeof val === 'object';
}

export function findCountryInfo (modelValue, type, iso2, countryList) {
  let value = modelValue;
  if ((value + '').length == 0) {
    return {};
  }
  let isPhone = type.toLowerCase() === 'phone';
  if ((value + '').charAt(0) === '+') {
    value = value.substr(1);
  }
  let item = countryList.filter((item) => {
    if (isPhone) {
      if (iso2) {
        // console.log('iso2', props.iso2, item.iso2);
        return item.iso2 == iso2;
      }
      // 一个国家只有一个手机区号的情况
      if (item.dialCode == value) {
        return true;
      }

      // 一个国家有多个手机区号的情况
      if (item.dialCode == 1 && item.areaCodes) {
        return item.areaCodes.some(areaCode => areaCode == value);
      }
    } else {
      return item.iso2 == value;
    }
  });
  if (!item || item.length === 0) {
    item = {};
  } else {
    item = item[0] || {};
  }
  return item;
}

/**
 * 获取数组中符合条件的元素的索引
 * @param arr 数组
 * @param fn 一个函数，如果函数返回true，则返回该项的下标，如果没有找到则返回-1
 */
export function getIndex (arr, fn) {
  if (!arr || arr.length == 0 || !fn || (typeof fn != "function")) {
    return -1;
  }

  if (arr.findIndex) {
    return arr.findIndex(fn);
  }
  let len = arr.length,
    i = 0,
    index = -1;
  for (; i < len; i++) {
    let item = arr[i];
    if (fn(item, index, arr) === true) {
      index = i;
      break;
    }
  }
  return index;
}

// 检测终端
export function termianl () {
  let u = navigator.userAgent;
  let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; // g
  let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端

  return {
    android: isAndroid,
    ios: isIOS,
  };
}

/**
 * 获取元素的css属性值
 * @param ele dom元素
 * @param cssAttribute css属性名称
 */
export function getStyle (ele, cssAttribute) {
  if (!ele || !ele.nodeName) {
    console.error('ele 必须是一个dom元素');
    return;
  }
  if (!cssAttribute) {
    console.error('cssAttribute 必须是一个字符串');
    return;
  }
  var val = '';
  if (window.getComputedStyle) {
    val = window.getComputedStyle(ele, null)[cssAttribute];
  } else if (ele.currentStyle) {
    val = ele.currentStyle[cssAttribute];
  }
  let numberVal = parseFloat(val);
  if (!isNaN(numberVal)) {
    return numberVal;
  } else {
    return val;
  }
}

/**
 * 判断元素是否有滚动条
 * @param ele dom元素
 * @returns {{horizontal: boolean, vertical: boolean}}
 */
export function eleHasScroll (ele) {
  var result = {
    vertical: false,
    horizontal: false
  };
  if (!(ele instanceof HTMLElement)) {
    return result;
  }
  // 当元素的overflow=visible，position=relative，且元素有绝对定位的子元素，且绝对定位的子元素的高度超过父元素的高度时，
  // 父元素的scrollHeight会大于父元素的clientHeight，因此在判断元素是否有滚动条时必须排除调overflow=visible
  var noScrollOverflowValue = ['hidden', 'visible'];
  if (ele.scrollTop > 0) {
    result.vertical = true;
  } else {
    /* // 使用这种方式判断元素是否有滚动条，若是元素绑定了scroll事件偶尔会触发scroll事件
    ele.scrollTop++;
    // 元素不能滚动的话，scrollTop 设置不会生效，还会置为 0
    const top = ele.scrollTop;
    // 重置滚动位置
    top && (ele.scrollTop = 0);
    // return top > 0;
    result.vertical = top > 0; */
    var overflowY = getStyle(ele, 'overflow-y');
    result.vertical = !noScrollOverflowValue.includes(overflowY) && (ele.scrollHeight > ele.clientHeight);
  }
  if (ele.scrollLeft > 0) {
    result.horizontal = true;
  } else {
    /* // 使用这种方式判断元素是否有滚动条，若是元素绑定了scroll事件偶尔会触发scroll事件
    ele.scrollLeft++;
    // 元素不能滚动的话，scrollLeft 设置不会生效，还会置为 0
    const left = ele.scrollLeft;
    // 重置滚动位置
    left && (ele.scrollLeft = 0);
    // return top > 0;
    result.horizontal = left > 0; */
    var overflowX = getStyle(ele, 'overflow-x');
    result.horizontal = !noScrollOverflowValue.includes(overflowX) && (ele.scrollWidth > ele.clientWidth);
  }
  return result;
}

/**
 * 判断浏览器或dom元素是否有滚动条
 * @returns {{horizontal: boolean, vertical: boolean}}
 */
export function hasScroll (ele) {
  if (ele && ele.nodeType == 1) {
    return eleHasScroll(ele);
  }
  return {
    // vertical: document.body.offsetWidth < window.innerWidth,
    // horizontal: document.documentElement.clientHeight < window.innerHeight
    vertical: document.body.scrollHeight > window.innerHeight,
    horizontal: document.body.scrollWidth > window.innerWidth
  };
}

/**
 * 获取元素或浏览器滚动条的宽高
 * @param ele dom元素
 * @returns {{horizontal: number, vertical: number}}
 */
export function scrollWidth (ele) {
  var tempDiv;
  var tempInnerDiv = document.createElement('div');
  var result = {
    vertical: 0,
    horizontal: 0
  };
  tempInnerDiv.style.cssText = 'width: 200px;height: 200px';
  if (!ele || ele.nodeType != 1) { // 未传递dom元素则获取浏览器的滚动条
    result.vertical = window.innerWidth - document.documentElement.offsetWidth;
    result.horizontal = window.innerHeight - document.documentElement.clientHeight;
    return result;
  }
  /* if (!isGetElementScrollWidth) { // 未传递dom元素则获取浏览器的滚动条
    /!* tempDiv = document.createElement('div');
    tempDiv.style.cssText = 'width: 100px;height: 100px;opacity: 0;position:absolute;left: -100px;overflow:auto;'; *!/
    result.vertical = window.innerWidth - document.documentElement.offsetWidth;
    result.horizontal = window.innerHeight - document.documentElement.clientHeight;
    return result;
  } else if (ele) {
    tempDiv = ele.cloneNode(true);
  } else if (isGetElementScrollWidth && !ele) {
    tempDiv = document.createElement('div');
  } */
  tempDiv = ele.cloneNode(true);
  tempDiv.style.cssText = 'width: 100px;height: 100px;opacity: 0;position:absolute;left: -100px;overflow:auto;';
  tempDiv.appendChild(tempInnerDiv);
  document.body.appendChild(tempDiv);

  result.vertical = tempDiv.offsetWidth - tempDiv.clientWidth;
  result.horizontal = tempDiv.offsetHeight - tempDiv.clientHeight;

  document.body.removeChild(tempDiv);
  tempDiv = tempInnerDiv = null;
  return result;
}
