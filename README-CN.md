# 1、vue3-country-intl
基于vue3的手机区号、国籍组件，兼容pc、移动端。`vue3-country-intl`有3种模式（
input、popover、modal）

插件支持的国家/地区数据来自：
+ iso2 code: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
+ country code: https://en.wikipedia.org/wiki/List_of_country_calling_codes

## 1.1、效果预览
[https://941477276.github.io/vue3-country-intl/dist/](https://941477276.github.io/vue3-country-intl/dist/)


## 同门师兄弟
>vue2.0版的国籍/手机区号选择插件(`vue-country-intl`)
+ [vue-country-intl](https://github.com/941477276/vue-country-intl)
>react版的国籍/手机区号选择插件(`reaxt-country-intl`)
+ [react-country-intl](https://github.com/941477276/react-country-intl)
>微信小程序版的国籍/手机区号选择插件(`wx-country-intl`)
+ [wx-country-intl](https://github.com/941477276/wx-country-intl)
>最容易使用最基础的下拉菜单组件(`easyest-dropdown`)
+ [easyest-dropdown](https://github.com/941477276/easyest-dropdown)

## 1.2、安裝
`npm install vue3-country-intl --save`

## 1.3、使用——.vue单文件
```
/*****main.js****/
import Vue from 'vue';
import App from './App.vue';
import Vue3CountryIntl from 'vue3-country-intl';
// 引入css
import 'vue3-country-intl/lib/vue3-country-intl.css'


const app = Vue.createApp(App);
// 全局注册组件
app.component(Vue3CountryIntl.name, Vue3CountryIntl);

/*****组件中使用****/
<template>
    <vue3-country-intl v-model="countryCode"></vue3-country-intl>
</template>
```

## 1.4、使用——直接引入js文件
```
<link rel="stylesheet" href="./lib/vue3-country-intl.css">
<script src="./lib/vue3-country-intl.esm.min.js"></script>
<script>
  Vue.component('vue3-country-intl', vue3CountryIntl);
  new Vue({
    el: '#app',
    data: {}
  });  
```

## 1.5、schema=input(默认)
```
<template>
    <Vue3CountryIntl v-model="phoneCountry"></Vue3CountryIntl>
</template>    
```
效果:

![schema=input效果](./src/assets/schema_input.gif)


使用中文显示国籍名称
![使用中文显示国籍名称](./src/assets/use-chinese.gif)

## 1.6、schema=popover(popover弹窗式)
```
<template>
    <Vue3CountryIntl
        schema="popover"
        elId="my_reference"
        v-model="schemaPopoverData.default"
        v-model:visible="schemaPopoverData.visible">
    <button type="button" @click="schemaPopoverData.visible = true">选择手机区号</button>
    </Vue3CountryIntl>
</template>    
```
```
<template>
    <Vue3CountryIntl
        schema="popover"
        popover-class="popover-class1111"
        v-model="schemaPopoverData.default"
        v-model:visible="schemaPopoverData.visible">
        <button type="button" @click="schemaPopoverData.visible = true">选择手机区号</button>
        <template slot="vueCountryNoData"><h1>没有找到该国籍！</h1></template>
    </Vue3CountryIntl>
</template>    
```
效果:

![schema=popover效果](./src/assets/schema_popover.gif)

## 1.7、schema=modal(弹窗)
```
<template>
  <button type="button" @click="schemaModalVisible.default = true">选择手机区号</button>
  <Vue3CountryIntl schema="modal" modal-class="modal-class" :listZIndex="5000" v-model:visible="schemaModalVisible.default" v-model="schemaModal.default">
    <template slot="vueCountryNoData"><h1>没有找到该国籍！</h1></template>
  </Vue3CountryIntl>
</template>    
```
效果:

![schema=modal效果](./src/assets/schema_modal.gif)

## 1.8、props 属性
1.`schema`: 展示模式

+ input: 显示为一个input输入框（默认）
+ popover: popover弹窗形式
+ modal: 模态框弹窗形式

2.`type`: 值类型

+ phone: 表示选择手机区号
+ country: 表示选择国籍

3.`placeholder`: schema=input时输入框的placeholder

4.`searchAble`: 是否可以搜索（数据类型：Boolean）

5.`disabled`: 是否禁用（数据类型：Boolean）

6.`showAreaCode`: 输入框中是否显示区号（数据类型：Boolean）

![showAreaCode与showLabelImg](./src/assets/img1.png)

7.`showLabelImg`: 输入框中是否显示图片（数据类型：Boolean）

8.`onlyValue`: 是否只显示选中的值，而不显示国际名称（数据类型：Boolean）

9.`listZIndex`: 列表的层级（数据类型：Number）

10.`maxHeight`: 列表最大高度，pc默认350px，移动端默认240px（数据类型：Number）

11.`selectedText`: 列表中选中项右侧的文案，默认 Selected

12.`showSelectedText`: 列表项被选中时是否显示右侧 'Selected' 文案，默认 true （数据类型：Boolean）

13.`readonly`: 是否只读，默认`false`（数据类型：Boolean）

14.`offsetTop`: popover弹窗距离参照元素的距离。默认为10。只有在`schema=popover`时有效（数据类型：Number）

15.`popoverClass`: popover弹窗额外class。只有在`schema=popover`时有效（数据类型：String）

16.`searchInputPlaceholder`: 搜索输入框的placeholder文字，只有在schema=popover、schema=modal中有效（数据类型：String）

17.`modalClass`: model弹窗额外class。只有在`schema=modal`时有效（数据类型：String）

18: `visible`: 控制组件显示与隐藏，只在`schema=modal`、`schema=popover`模式下有效（数据类型：Boolean）

19: `cancelText`: 关闭弹窗的按钮的文字，默认: '取消'，只在schema=modal模式下有效（数据类型：String）

20: `disableCountry`: 禁用的国家(可以传递国家名称、国家代码、国家区号)，可以传递字符串也可以传递数组，传递字符串时禁用多个国家使用逗号分隔（数据类型：String|Array）

21: `onlyCountry`: 只显示指定的国家，可以传递字符串也可以传递数组，传递字符串时多个国家使用逗号分隔（数据类型：String|Array）

22: `noDataText`: 未搜索到国家数据时显示的文案，如有`vueCountryNoData`slot则优先显示slot内容（数据类型：String）

23: `iosMobileReadonly`: ios移动终端输入框是否只读(只在`schema=input`模式下有效)，默认为true，因为在ios手机终端中如不是只读模式会弹出选择下来框出来（数据类型：Boolean）

24: `useChinese`: 是否以中文显示国籍名称，默认为`true`（数据类型：Boolean）

25: `static`: 是否使用static布局（静态布局）(只在`schema=input`模式下有效)，默认为`false`（数据类型：Boolean）

26: `transitionName`：过渡名称，可以自定义实现组件显示/隐藏时的过渡效果。默认为`''`（数据类型：string）

26: `offset`：popover弹窗距离点击区域的距离(只在`schema=popover`模式下有效)。默认为：`[0, 10]`（数据类型：Array）

27： `rightOffset`：popover弹窗距离浏览器右侧距离，该值只有在小屏下有效(只在`schema=popover`模式下有效)。默认为：`20`（数据类型：Number）

28： `iso2`：在`type=phone`时最好传递该属性，已避免出现区号代码为212、358、1时出现回显不正确问题，因为这些区号都有多个国家在使用

29： `appendToBody`：是否将列表插入到body中。默认为`true`（数据类型：Boolean）

30： `filter`：排序函数，与`Array.filter`中的回调函数一致。默认为`null`（数据类型：Function）`2.0.2新增`

31： `sort`：排序函数，与`Array.sort`中的回调函数一致。默认为`null`（数据类型：Function）`2.0.2新增`

32： `transform`：数据处理函数，你可以通过该函数对数据列表进行深度定制，如排序、过滤、置顶等。默认为`null`（数据类型：Function）`2.0.3新增`


## 1.9、可用方法(method)
1. `show`: 显示列表

2. `hide`: 隐藏列表

3. `getSelected`: 获取选中的列表项

3. `getCountryInfo`: 根据国籍编码或国家区号查找国籍信息

| 参数名 | 说明 | 默认值 |
|:------|:-----|:------|
| countryCodeOrAreaCode | 国籍编码或国籍区号 | `''` |
| type | 值类型 | `phone` |
| iso2 | 国籍编码 | `''` |


## 1.10、slot
1. ~~`vueCountryNoData`：未搜索到国家数据时显示的slot（2.x版本后已移除）~~


1. `noData`: 空数据插槽
2. `countryItem`: 自定义列表项插槽
3. `selected`: 自定义选中文本插槽
4. `emptyData`: 空数据插槽

## 1.11、事件
1. ~~`onChange`: 用户手动选择列表项时触发，会传递selected、value给onChange使用（2.x版本后已移除）~~


1. `change`: 用户手动选择列表项时事件，回调参数：`function (country)`


# 2、vue3-country-flag
一个基于vue3的国家国旗标志组件

## 效果预览
![country-flag组件效果](./src/assets/country-flags-effect.png)

## 2.1、安装
`npm install vue-country-intl --save`

## 2.2、使用
> 第一步：安装支持在vite中使用 require.context() 导入文件的插件
> 
> `npm install @originjs/vite-plugin-require-context -D`

**vite.config.js**
```
import ViteRequireContext from '@originjs/vite-plugin-require-context';
export default {
    plugins: [
        ViteRequireContext(),
        ...
    ]
}
```

**main.js**
```
import { createApp } from 'vue'
import Vue3CountryFlag from 'vue3-country-intl/lib/vue3-country-flag.esm.min.js';
// 引入css
import 'vue3-country-intl/lib/vue3-country-flag.css'

const app = createApp(..);
// 引入svg图标
let flagFilePath = require.context('vue3-country-intl/lib/country-flag-svgs', true, /\.svg$/);
app.use(VueCountryFlag, flagFilePath);
```

**组件中使用**
```
<template>
    <Vue3CountryFlag value="cn"></Vue3CountryFlag>
    <Vue3CountryFlag value="+86">
      <template v-slot="{country}">
        <span class="slot-span">国家：<mark>{{country.name}}</mark></span>
      </template>
    </Vue3CountryFlag>
</template>
```

## 2.3、props 属性
1.`value`: 国籍的代码或手机区号值

2.`type`: 值类型

+ phone: 表示选择手机区号
+ country: 表示选择国籍

3.`iso2`: 国籍代码，当type=phone时必须传递iso2属性，否则当区号代码为212或358时会出问题！

4.`useTitle`: 是否给元素添加`title`属性，title的值为国籍的代码或手机区号（数据类型：Boolean）

## 2.4、可用方法(method)
1.`getCountry`: 获取详细的国籍信息

## 2.5、事件
1.`click`: click 事件
