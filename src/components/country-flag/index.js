import Vue3CountryFlag from './Vue3CountryFlag.vue';
/*Vue3CountryFlag.install = function (Vue, svgFlagFilePath) {
  if(Vue3CountryFlag._country_flag_installed){
    return;
  }
  if(!svgFlagFilePath || ({}).toString.call(svgFlagFilePath) != '[object Object]'){
    // throw new Error('Vue3CountryFlag组件初始化需要传递svg图标路径！您可以使用这段代码：require.context('vue3-country-flag/lib/country-flag-svgs', true, /\.svg$/);
    throw new Error('Vue3CountryFlag component initialization needs to pass the svg icon path! You can use this code: require.context(\'vue3-country-flag/lib/country-flag-svgs\', true, /\\.svg$/)');
  }

  // 获取svg文件名称正则
  let reg = /(\w+)(\.\w*)*\.svg$/;
  let svgPathObj = Object.keys(svgFlagFilePath).reduce((res, key) => {
    let svgPath = svgFlagFilePath[key].default;
    let matched = svgPath.match(reg);
    // console.log('svgPath', svgPath, matched[1]);
    if(matched){
      let countryIso2 = matched[1];
      /!*if(countryIso2 != 'empty' && countryIso2 != 'unknown'){
        res[countryIso2] = svgPath;
      }*!/
      res[countryIso2] = svgPath;
    }
    return res;
  }, {});
  console.log(svgPathObj);
  // console.log('svgPathList', svgPathList)
  (window || Object).__vue3_country_flag_files_path_obj = svgPathObj;
  Vue.component(Vue3CountryFlag.name, Vue3CountryFlag);
  Vue3CountryFlag._country_flag_installed = true;
}*/

export default {
  name: Vue3CountryFlag.name,
  install(Vue, svgFlagFilePath) {
    if(Vue3CountryFlag._country_flag_installed){
      return;
    }
    console.log('svgFlagFilePath', svgFlagFilePath);
    if(!svgFlagFilePath && (!Array.isArray(svgFlagFilePath) || typeof svgFlagFilePath !== 'function')){
      // throw new Error('Vue3CountryFlag组件初始化需要传递svg图标路径！您可以使用这段代码：require.context('vue3-country-intl/lib/country-flag-svgs', true, /\.svg$/);
      throw new Error('Vue3CountryFlag component initialization needs to pass the svg icon path! You can use this code: require .context(\'vue3-country-intl/lib/country-flag-svgs\', true, /\\.svg$/)');
    }

    // 获取svg文件名称正则
    let reg = /(\w+)(\.\w*)*\.svg$/;
    // 获取svg文件路径
    const svgPathList = typeof svgFlagFilePath === 'function' ? svgFlagFilePath.keys().map(item => svgFlagFilePath(item)) : svgFlagFilePath;
    // 将svg路径转换成对象
    const svgPathObj = svgPathList.reduce((res, svgPath) => {
      let pathIsString = typeof svgPath === 'string';
      let matched = pathIsString ? svgPath.match(reg) : svgPath.default.match(reg);
      // console.log('matched', matched, svgPath);
      if(matched){
        res[matched[1]] = pathIsString ? svgPath : svgPath.default;
      }
      return res;
    }, {});
    console.log(svgPathObj);
    // console.log('svgPathList', svgPathList)
    (window || Math).__vue3_country_flag_files_path_obj = svgPathObj;
    Vue.component(Vue3CountryFlag.name, Vue3CountryFlag);
    Vue3CountryFlag._country_flag_installed = true;
  }
};
