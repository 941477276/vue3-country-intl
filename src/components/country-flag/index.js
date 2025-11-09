import Vue3CountryFlag from './Vue3CountryFlag.vue';
import { version } from '../../../version';
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
  version,
  install(Vue, svgFlagFilePath) {
    if(Vue3CountryFlag._country_flag_installed){
      return;
    }
    console.log('svgFlagFilePath', svgFlagFilePath);

    // 获取svg文件名称正则
    const reg = /(\w+)\.svg/;
    let svgPathObj = {};
    if(Array.isArray(svgFlagFilePath) || typeof svgFlagFilePath == 'function'){ // 使用 require.context 导入
      // 获取svg文件名称正则
      // let reg = /(\w+)(\.\w*)*\.svg$/;
      // 获取svg文件路径
      const svgPathList = typeof svgFlagFilePath === 'function' ? svgFlagFilePath.keys().map(item => svgFlagFilePath(item)) : svgFlagFilePath;
      // 将svg路径转换成对象
      svgPathObj = svgPathList.reduce((res, svgPath) => {
        let pathIsString = typeof svgPath === 'string';
        let matched = pathIsString ? svgPath.match(reg) : svgPath.default.match(reg);
        // console.log('matched', matched, svgPath);
        if(matched){
          res[matched[1]] = pathIsString ? svgPath : svgPath.default;
        }
        return res;
      }, {});
    } else if (svgFlagFilePath && typeof svgFlagFilePath === 'object'){ // 使用 import.meta.glob 导入
      // 获取svg文件名称正则
      // const reg = /(\w+)(\.\w*)*\.svg$/;
      svgPathObj = Object.keys(svgFlagFilePath).reduce((res, key) => {
        let svgPath = svgFlagFilePath[key].default;
        let matched = key.match(reg);
        // console.log('svgPath', svgPath, matched[1]);
        if(matched){
          let countryIso2 = matched[1];
          if(countryIso2 != 'empty' && countryIso2 != 'unknown'){
            res[countryIso2] = svgPath;
          }
        }
        return res;
      }, {});
    } else {
      if(!svgFlagFilePath && (!Array.isArray(svgFlagFilePath) || typeof svgFlagFilePath !== 'function')){
        // throw new Error('Vue3CountryFlag组件初始化需要传递svg图标路径！您可以使用这段代码：require.context('vue3-country-intl/lib/country-flag-svgs', true, /\.svg$/);
        throw new Error(`Vue3CountryFlag component initialization needs to pass the svg icon path! You can use this code: 
      require .context('vue3-country-intl/lib/country-flag-svgs', true, /\\.svg$/);
      or
      import.meta.glob('vue3-country-intl/lib/country-flag-svgs/*.svg', { eager: true });
      `);
      }
    }

    console.log(svgPathObj);
    // console.log('svgPathList', svgPathList)
    (window || Math).__vue3_country_flag_files_path_obj = svgPathObj;
    Vue.component(Vue3CountryFlag.name, Vue3CountryFlag);
    Vue3CountryFlag._country_flag_installed = true;
  }
};
