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
  elementContains(ele, childEle) {
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
  bindEvent(el, eventName, fn) {
    if (document.addEventListener) {
      el.addEventListener(eventName, fn, false);
      el.addEventListener(eventName, fn, false);
    } else if (window.attachEvent) {
      el.attachEvent('on' + eventName, fn);
      el.attachEvent('on' + eventName, fn);
    }
  },
  // 解绑事件
  unBindEvent(el, eventName, fn) {
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
  getElementRect(element) {
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
  getIndex(arr, fn) {
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
  eleIsIntoView(ele){
    let rect = vueCountryTool.getElementRect(ele);
    let wh = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight; // 浏览器高度兼容写法

    if (rect.top > 0 && rect.top < wh && rect.bottom > 0 && rect.bottom < wh) { // 完全出现在视口中
      return true;
    }else{
      return false;
    }
  }
};

export {vueCountryTool};
