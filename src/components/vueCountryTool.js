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
  },
  /**
   * 判断元素是否包含指定className
   * @param ele dom元素
   * @param className className
   * @returns {boolean}
   */
  hasClass (ele, className) {
    if (!ele || !ele.nodeName) {
      console.error('ele 必须是一个dom元素');
      return
    }
    if (!className) {
      console.error('className 必须是一个字符串');
      return
    }
    if (ele.classList) {
      return ele.classList.contains(className);
    } else {
      var flag = false
      var classNameArr = ele.className.split(' ');
      for (var i = 0, len = classNameArr.length; i < len; i++) {
        if (classNameArr[i] === className) {
          flag = true;
          break;
        }
      }
      return flag;
    }
  },
  /**
   * 判断浏览器是否有滚动条
   * @returns {{horizontal: boolean, vertical: boolean}}
   */
  hasScroll () {
    return {
      vertical: document.body.offsetWidth < window.innerWidth,
      horizontal: document.documentElement.clientHeight < window.innerHeight
    };
  },
  /**
   * 获取元素或浏览器滚动条的宽高
   * @param isGetElementScrollWidth 是否为获取元素的滚动条宽高
   * @returns {{horizontal: number, vertical: number}}
   */
  scrollWidth (isGetElementScrollWidth, ele) {
    var tempDiv;
    var tempInnerDiv = document.createElement('div');
    var result = {
      vertical: 0,
      horizontal: 0
    };
    tempInnerDiv.style.cssText = 'width: 200px;height: 200px';
    if (!isGetElementScrollWidth) { // 未传递dom元素则获取浏览器的滚动条
      /* tempDiv = document.createElement('div');
      tempDiv.style.cssText = 'width: 100px;height: 100px;opacity: 0;position:absolute;left: -100px;overflow:auto;'; */
      result.vertical = window.innerWidth - document.documentElement.offsetWidth;
      result.horizontal = window.innerHeight - document.documentElement.clientHeight;
      return result;
    } else if (ele) {
      tempDiv = ele.cloneNode(true);
    } else if (isGetElementScrollWidth && !ele) {
      tempDiv = document.createElement('div');
    }
    tempDiv.style.cssText = 'width: 100px;height: 100px;opacity: 0;position:absolute;left: -100px;overflow:auto;';
    tempDiv.appendChild(tempInnerDiv);
    document.body.appendChild(tempDiv);

    result.vertical = tempDiv.offsetWidth - tempDiv.clientWidth;
    result.horizontal = tempDiv.offsetHeight - tempDiv.clientHeight;

    document.body.removeChild(tempDiv);
    tempDiv = tempInnerDiv = null;
    return result;
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
    var classArr = classname.split(' ');
    if (ele.classList) {
      for (var i = 0, len = classArr.length; i < len; i++) {
        var item = classArr[i];
        if (!ele.classList.contains(item)) {
          ele.classList.add(item);
        }
      }
      return ele;
    } else {
      var classNameArr = ele.className && ele.className.length > 0 ? ele.className.split(' ') : [];
      if (classNameArr.length === 0) {
        ele.className = classname;
        return;
      }
      // 合并两个数组
      Array.prototype.push.apply(classNameArr, classArr);
      classNameArr = vueCountryTool.arrayNoReapeat(classNameArr);
      ele.className = classNameArr.join(' ');
      return ele;
    }
  },
  /**
   * 数组去重
   * @param arr 需要去重的数组
   * @param isObjectValue 数组的值是否是引用类型
   */
  arrayNoReapeat (arr, isObjectValue) {
    if (!arr || arr.length === 0) {
      return arr;
    }
    isObjectValue = typeof isObjectValue === 'undefined' ? false : !!isObjectValue;
    var arrLen = arr.length;
    let newArr = [];
    // 值类型的数组，使用对象属性唯一的特性来去重
    if (!isObjectValue) {
      var obj = {};
      for (var i = 0; i < arrLen; i++) {
        obj[arr[i]] = 1;
      }
      for (var attr in obj) {
        newArr.push(attr);
      }
      return newArr;
    }

    newArr.push(arr[0]);
    for (var i = 1; i < arrLen; i++) {
      let item = arr[i];
      let repeat = false;
      for (var j = 0; j < newArr.length; j++) {
        if (item === arr[j]) {
          repeat = true;
          break;
        }
      }
      if (!repeat) {
        newArr.push(item);
      }
    }
    return newArr;
  },
  /**
   * 给指定元素移除class
   * @param ele
   * @param classname
   */
  removeClass (ele, classname) {
    if (!ele || !classname || ele.nodeType !== 1) {
      return;
    }
    var classArr = classname.split(' ');
    if (ele.classList) {
      for (var i = 0, len = classArr.length; i < len; i++) {
        var item = classArr[i];
        if (ele.classList.contains(item)) {
          ele.classList.remove(item);
        }
      }
      return ele;
    } else {
      var classNameArr = ele.className && ele.className.length > 0 ? ele.className.split(' ') : [];
      if (classNameArr.length === 0) {
        return;
      }
      for (var i = classNameArr.length; i >= 0; i--) {
        for (var j = 0, len2 = classArr.length; j < len2; j++) {
          if (classNameArr[i] === classArr[j]) {
            classNameArr.splice(i, 1);
          }
        }
      }
      ele.className = classNameArr.join(' ');
      return ele;
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
    // console.log('getScrollParent', vueCountryTool.getScrollParent(ele).nodeName);
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
          // console.log('iso2', props.iso2, item.iso2);
          return item.iso2 == props.iso2;
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
