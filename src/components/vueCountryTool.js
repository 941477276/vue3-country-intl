const vueCountryTool = {
  /**
   * 获取元素距浏览器最顶部及最左边的距离
   * @param ele dom元素
   */
  offset (ele) {
    let positon = {
      top: 0,
      left: 0,
    };
    let offsetParent = ele.offsetParent;
    positon.top = ele.offsetTop;
    positon.left = ele.offsetLeft;
    while (offsetParent != null) {
      positon.top += offsetParent.offsetTop;
      positon.left += offsetParent.offsetLeft;
      offsetParent = offsetParent.offsetParent;
    }
    offsetParent = null;
    return positon;
  },
  /**
   * 判断两个元素是否是包含关系
   * @param ele 父元素
   * @param childEle 子元素
   * @returns {Boolean}
   */
  elementContains (ele, childEle) {
    if (!ele || !childEle) {
      return false;
    }
    if (ele === childEle) {
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
  },
  // 绑定事件
  bindEvent (el, eventName, fn) {
    if (document.addEventListener) {
      el.addEventListener(eventName, fn, false);
      el.addEventListener(eventName, fn, false);
    } else if (window.attachEvent) {
      el.attachEvent('on' + eventName, fn);
      el.attachEvent('on' + eventName, fn);
    }
  },
  // 解绑事件
  unBindEvent (el, eventName, fn) {
    if (!el) {
      return;
    }
    if (document.removeEventListener) {
      el.removeEventListener(eventName, fn, false);
      el.removeEventListener(eventName, fn, false);
    } else if (window.detachEvent) {
      el.detachEvent('on' + eventName, fn);
      el.detachEvent('on' + eventName, fn);
    }
  },
  getElementRect (element) {
    var rect = element.getBoundingClientRect(); // 距离视窗的距离
    // html元素对象的上边框的宽度
    var top = document.documentElement.clientTop ? document.documentElement.clientTop : 0;
    var left = document.documentElement.clientLeft ? document.documentElement.clientLeft : 0;
    return {
      top: rect.top - top,
      bottom: rect.bottom - top,
      left: rect.left - left,
      right: rect.right - left,
    };
  },
  // 检测终端
  termianl () {
    let u = navigator.userAgent;
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; // g
    let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端

    return {
      android: isAndroid,
      ios: isIOS,
    };
  },
  /**
   * 获取元素的css属性值
   * @param ele dom元素
   * @param cssAttribute css属性名称
   */
  getStyle (ele, cssAttribute) {
    if (!ele || !ele.nodeName) {
      console.error('ele 必须是一个dom元素');
      return;
    }
    if (!cssAttribute) {
      console.error('cssAttribute 必须是一个字符串');
      return;
    }
    let val = '';
    if (window.getComputedStyle) {
      val = window.getComputedStyle(ele, null)[cssAttribute];
    } else if (ele.currentStyle) {
      val = ele.currentStyle[cssAttribute];
    }
    if (!isNaN(parseFloat(val))) {
      return parseFloat(val);
    } else {
      return val;
    }
  },
  /**
   * 获取数组中符合条件的元素的索引
   * @param arr 数组
   * @param fn 一个函数，如果函数返回true，则返回该项的下标，如果没有找到则返回-1
   */
  getIndex (arr, fn) {
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
  },
  /**
   * 给指定元素添加class
   * @param ele
   * @param classname
   */
  addClass (ele, classname) {
    if (!ele || !classname || ele.nodeType !== 1) {
      return;
    }
    let classArr = classname.split(' ');
    if (ele.classList) {
      for (var i = 0, len = classArr.length; i < len; i++) {
        let item = classArr[i];
        if (!ele.classList.contains(item)) {
          ele.classList.add(item);
        }
      }
      return ele;
    } else {
      let classNameArr = ele.className && ele.className.length > 0 ? ele.className.split(' ') : [];
      if (classNameArr.length === 0) {
        ele.className = classname;
        return;
      }
      // 合并两个数组
      Array.prototype.push.apply(classNameArr, classArr);
      classNameArr = tool.arrayNoReapeat(classNameArr);
      ele.className = classNameArr.join(' ');
      return ele;
    }
  },
  /**
   * 判断元素是否完全出现在视口中
   * @param ele dom元素
   * @returns {boolean}
   */
  eleIsIntoView (ele) {
    // 浏览器滚动条的高度
    let scrollTop = vueCountryTool.scrollTop();
    // 元素有滚动条的父级元素的滚动条高度
    let eleWrapperScrollTop = 0;
    let scrollParent = vueCountryTool.getScrollParent(ele);
    console.log('getScrollParent', vueCountryTool.getScrollParent(ele).nodeName);
    // 如果当前元素有滚动条的父级元素不是html，则获取有滚动条的父级元素的滚动条的位置
    if (scrollParent && scrollParent.nodeName != 'HTML') {
      eleWrapperScrollTop = vueCountryTool.scrollTop(ele);
    }
    // 获取元素距离浏览器最顶端的距离
    let offset = vueCountryTool.offset(ele);
    let wh = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight; // 浏览器高度兼容写法
    let top = offset.top - scrollTop - eleWrapperScrollTop;
    let bottom = (top + ele.offsetHeight);
    console.log('offset', offset);
    console.log('top,bottom,scrollTop, wh', top, bottom, scrollTop, wh);
    if (top > 0 && top < wh && bottom > 0 && bottom < wh) { // 完全出现在视口中
      return true;
    } else {
      return false;
    }
  },
  /**
   * 获取元素最近的有滚动条的父级元素的滚动条位置/浏览器滚动条的位置
   * @param ele dom元素
   * @returns {number}
   */
  scrollTop (ele) {
    if (ele) {
      var eleParent = ele.parentElement;
      var scrollTop = ele.scrollTop || 0;
      while (eleParent != null) {
        if (vueCountryTool.eleHasScroll(eleParent)) {
          return eleParent.scrollTop;
        }
        // scrollTop = eleParent.scrollTop;
        eleParent = eleParent.parentElement;
      }

      return scrollTop;
    }
    return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  },
  /**
   * 判断元素是否有滚动条
   * @param ele dom元素
   * @returns {boolean}
   */
  eleHasScroll (ele) {
    if (!(ele instanceof HTMLElement)) {
      return false;
    }
    if (ele.scrollTop > 0) {
      return true;
    } else {
      ele.scrollTop++;
      // 元素不能滚动的话，scrollTop 设置不会生效，还会置为 0
      const top = ele.scrollTop;
      // 重置滚动位置
      top && (ele.scrollTop = 0);
      return top > 0;
    }
  },
  /**
   * 获取元素有滚动条的父级元素
   * @param ele
   */
  getScrollParent (ele) {
    if (!ele) {
      return;
    }
    var eleParent = ele.parentElement;
    while (eleParent != null) {
      if (vueCountryTool.eleHasScroll(eleParent)) {
        return eleParent;
      }
      eleParent = eleParent.parentElement;
    }
  },
  calcSelectedOption (props, countryList) {
    // console.log('计算选中值');
    let value = props.modelValue;
    if ((value + '').length == 0) {
      return {};
    }
    let isPhone = props.type.toLowerCase() === 'phone';
    if ((value + '').charAt(0) === '+') {
      value = value.substr(1);
    }
    let item = countryList.filter((item) => {
      if (isPhone) {
        if (props.iso2) {
          // console.log('iso2', this.iso2, item.iso2);
          return item.iso2 == this.iso2;
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
};

export { vueCountryTool };
