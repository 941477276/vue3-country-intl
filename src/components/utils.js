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
